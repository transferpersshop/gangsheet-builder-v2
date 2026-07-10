/* ============================================================
   auth.js — Supabase auth + data layer for Gang Sheet Builder v2
   Loaded BEFORE app.js. Exposes window.gsAuth for app integration.
   ============================================================ */
(function(){
'use strict';

const SUPABASE_URL = 'https://nzkwkydafrnvmmqiuabt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56a3dreWRhZnJudm1tcWl1YWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDQ2NDEsImV4cCI6MjA5Nzc4MDY0MX0.Lb9yDQGeA64FQaurQAIvfd3wNLCGbMEyVK0gyqtbSyM';

let sb = null; // Supabase client
let _user = null;
let _profile = null;
let _isAdmin = false;
let _onReady = []; // callbacks once auth resolves

/* ── Supabase client ── */
function getClient(){
  if(!sb){
    if(!window.supabase?.createClient){
      console.error('[GSB Auth] Supabase JS SDK not loaded');
      return null;
    }
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return sb;
}

/* ── UI helpers ── */
function showEl(id){ const el = document.getElementById(id); if(el) el.style.display = ''; }
function hideEl(id){ const el = document.getElementById(id); if(el) el.style.display = 'none'; }
function setText(id, txt){ const el = document.getElementById(id); if(el) el.textContent = txt; }

function showLogin(){
  showEl('loginScreen');
  hideEl('appContainer');
  hideEl('loginError');
  const f = document.getElementById('loginEmail');
  if(f) f.focus();
}

function showApp(){
  hideEl('loginScreen');
  showEl('appContainer');
  updateUserMenu();
  // Canvas was initialised while appContainer had display:none —
  // trigger resize so it picks up the correct container dimensions.
  setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
}

function updateUserMenu(){
  if(!_profile) return;
  const name = _profile.display_name || _user?.email?.split('@')[0] || '';
  const initials = name ? name.charAt(0).toUpperCase() : '?';
  setText('userInitial', initials);
  setText('userMenuName', name || 'Gebruiker');
  setText('userMenuEmail', _user?.email || '');
  // Admin link
  const adminLink = document.getElementById('adminPanelLink');
  if(adminLink) adminLink.style.display = _isAdmin ? '' : 'none';
}

/* ── Auth: sign in ── */
async function signIn(email, password){
  const client = getClient();
  if(!client) return { error: { message: 'Supabase niet geladen' } };
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if(error) return { error };
  _user = data.user;
  await _loadProfile();
  // Check blocked
  if(_profile?.blocked){
    await client.auth.signOut();
    _user = null; _profile = null; _isAdmin = false;
    return { error: { message: 'Je account is geblokkeerd. Neem contact op met de beheerder.' } };
  }
  // Check approval
  if(_profile && _profile.approved === false){
    await client.auth.signOut();
    _user = null; _profile = null; _isAdmin = false;
    return { error: { message: 'Je account wacht op goedkeuring door een beheerder. Je ontvangt bericht zodra het is goedgekeurd.' } };
  }
  await _logUsage('login');
  showApp();
  _fireReady();
  return { data };
}

/* ── Auth: sign up ── */
async function signUp(email, password, displayName, companyName){
  const client = getClient();
  if(!client) return { error: { message: 'Supabase niet geladen' } };
  const { data, error } = await client.auth.signUp({
    email, password,
    options: { data: { display_name: displayName || '', company_name: companyName || '' } }
  });
  if(error) return { error };
  // Supabase may auto-confirm or require email confirmation
  if(data.user && !data.user.email_confirmed_at && !data.session){
    return { data, needsConfirmation: true };
  }
  _user = data.user;
  await _loadProfile();
  // Update profile fields if trigger didn't catch them
  const profileUpdates = {};
  if(displayName && _profile && !_profile.display_name) profileUpdates.display_name = displayName;
  if(companyName && _profile && !_profile.company_name) profileUpdates.company_name = companyName;
  if(Object.keys(profileUpdates).length > 0) await updateProfile(profileUpdates);
  await _logUsage('signup');
  // Check if approval is needed (self-registered accounts default to approved=false)
  if(_profile && _profile.approved === false){
    await client.auth.signOut();
    _user = null; _profile = null; _isAdmin = false;
    return { data, needsApproval: true };
  }
  showApp();
  _fireReady();
  return { data };
}

/* ── Auth: sign out ── */
async function signOut(){
  const client = getClient();
  if(!client) return;
  await client.auth.signOut();
  _user = null; _profile = null; _isAdmin = false;
  showLogin();
}

/* ── Auth: reset password ── */
async function resetPassword(email){
  const client = getClient();
  if(!client) return { error: { message: 'Supabase niet geladen' } };
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });
  return { error };
}

/* ── Profile ── */
async function _loadProfile(){
  if(!_user) return;
  const client = getClient();
  const { data } = await client.from('profiles').select('*').eq('id', _user.id).single();
  _profile = data;
  _isAdmin = data?.role === 'admin' && !data?.blocked;
}

async function getProfile(){ return _profile; }

async function updateProfile(updates){
  if(!_user) return { error: { message: 'Niet ingelogd' } };
  const client = getClient();
  const { data, error } = await client.from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', _user.id)
    .select()
    .single();
  if(!error && data) _profile = data;
  return { data, error };
}

/* ── Projects CRUD ── */
async function saveProject(projectData){
  if(!_user) return { error: { message: 'Niet ingelogd' } };
  const client = getClient();
  const payload = {
    user_id: _user.id,
    name: projectData.name || 'Naamloos project',
    sheet_format: projectData.sheetFormat || 'dtf55',
    canvas_json: projectData.canvasJson || {},
    logo_count: projectData.logoCount || 0,
    sheet_count: projectData.sheetCount || 1,
    updated_at: new Date().toISOString(),
  };
  let result;
  if(projectData.id){
    // Update existing
    result = await client.from('projects')
      .update(payload)
      .eq('id', projectData.id)
      .eq('user_id', _user.id)
      .select()
      .single();
  } else {
    // Insert new
    result = await client.from('projects')
      .insert(payload)
      .select()
      .single();
  }
  if(!result.error) await _logUsage('save_project', { project_id: result.data?.id });
  return result;
}

async function listProjects(){
  if(!_user) return { data: [] };
  const client = getClient();
  const { data, error } = await client.from('projects')
    .select('id, name, sheet_format, logo_count, sheet_count, thumbnail_path, created_at, updated_at')
    .eq('user_id', _user.id)
    .order('updated_at', { ascending: false });
  return { data: data || [], error };
}

async function loadProject(id){
  if(!_user) return { error: { message: 'Niet ingelogd' } };
  const client = getClient();
  const { data, error } = await client.from('projects')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

async function deleteProject(id){
  if(!_user) return { error: { message: 'Niet ingelogd' } };
  const client = getClient();
  const { error } = await client.from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', _user.id);
  if(!error) await _logUsage('delete_project', { project_id: id });
  return { error };
}

/* ── Admin: users ── */
async function listUsers(){
  if(!_isAdmin) return { data: [], error: { message: 'Geen admin' } };
  const client = getClient();
  const { data, error } = await client.from('profiles')
    .select('id, display_name, company_name, role, blocked, created_at, updated_at')
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

async function updateUserRole(userId, role){
  if(!_isAdmin) return { error: { message: 'Geen admin' } };
  const client = getClient();
  return client.from('profiles').update({ role }).eq('id', userId);
}

async function toggleBlockUser(userId, blocked){
  if(!_isAdmin) return { error: { message: 'Geen admin' } };
  const client = getClient();
  return client.from('profiles').update({ blocked }).eq('id', userId);
}

/* ── Admin: all projects ── */
async function listAllProjects(){
  if(!_isAdmin) return { data: [] };
  const client = getClient();
  const { data, error } = await client.from('projects')
    .select('id, user_id, name, sheet_format, logo_count, sheet_count, created_at, updated_at')
    .order('updated_at', { ascending: false })
    .limit(200);
  return { data: data || [], error };
}

/* ── Admin: settings ── */
async function getSettings(){
  const client = getClient();
  if(!client) return {};
  const { data } = await client.from('app_settings').select('key, value');
  const settings = {};
  (data || []).forEach(r => { settings[r.key] = r.value; });
  return settings;
}

async function updateSetting(key, value){
  if(!_isAdmin) return { error: { message: 'Geen admin' } };
  const client = getClient();
  return client.from('app_settings').upsert({ key, value }, { onConflict: 'key' });
}

/* ── Admin: usage stats ── */
async function getUsageStats(days){
  if(!_isAdmin) return { data: [] };
  days = days || 30;
  const client = getClient();
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const { data, error } = await client.from('usage_logs')
    .select('action, created_at')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(1000);
  // Aggregate
  const counts = {};
  const dailyActive = new Set();
  (data || []).forEach(r => {
    counts[r.action] = (counts[r.action] || 0) + 1;
    dailyActive.add(r.created_at?.substring(0, 10));
  });
  return { counts, activeDays: dailyActive.size, totalEvents: (data || []).length, error };
}

/* ── Admin: per-company usage stats ── */
async function getCompanyStats(){
  if(!_isAdmin) return { data: [] };
  const client = getClient();
  // Fetch profiles for company names
  const { data: profiles } = await client.from('profiles')
    .select('id, display_name, company_name, created_at');
  // Fetch usage logs (export_pdf = gangsheet created)
  const { data: logs } = await client.from('usage_logs')
    .select('user_id, action, created_at')
    .in('action', ['export_pdf','save_project','login'])
    .order('created_at', { ascending: false })
    .limit(5000);
  // Build per-company map
  const userCompany = {};
  (profiles || []).forEach(p => {
    userCompany[p.id] = p.company_name || p.display_name || 'Onbekend';
  });
  const companies = {};
  (logs || []).forEach(l => {
    const name = userCompany[l.user_id] || 'Onbekend';
    if(!companies[name]) companies[name] = { gangsheets: 0, logins: 0, lastActivity: null };
    if(l.action === 'export_pdf') companies[name].gangsheets++;
    if(l.action === 'login') companies[name].logins++;
    if(!companies[name].lastActivity || l.created_at > companies[name].lastActivity)
      companies[name].lastActivity = l.created_at;
  });
  // Convert to sorted array
  const result = Object.entries(companies).map(([name, d]) => ({
    company: name, gangsheets: d.gangsheets, logins: d.logins, lastActivity: d.lastActivity
  })).sort((a, b) => b.gangsheets - a.gangsheets);
  return { data: result };
}

/* ── Usage logging (fire-and-forget) ── */
async function _logUsage(action, metadata){
  if(!_user) return;
  const client = getClient();
  if(!client) return;
  client.from('usage_logs')
    .insert({ user_id: _user.id, action, metadata: metadata || {} })
    .then(() => {})
    .catch(() => {});
}

/* ── Auth state listener ── */
function _setupListener(){
  const client = getClient();
  if(!client) return;
  client.auth.onAuthStateChange((event, session) => {
    if(event === 'SIGNED_OUT'){
      _user = null; _profile = null; _isAdmin = false;
      showLogin();
    }
    if(event === 'TOKEN_REFRESHED' && session){
      _user = session.user;
    }
    if(event === 'PASSWORD_RECOVERY'){
      // Show password reset form
      const el = document.getElementById('loginScreen');
      if(el) el.dataset.mode = 'reset-confirm';
      showEl('loginScreen');
      showEl('resetConfirmForm');
      hideEl('loginForm');
      hideEl('registerForm');
      hideEl('resetForm');
    }
  });
}

/* ── Ready callbacks ── */
function onReady(fn){ if(_user && _profile) fn(); else _onReady.push(fn); }
function _fireReady(){ _onReady.forEach(fn => { try{ fn(); } catch(e){ console.error(e); } }); _onReady = []; }

/* ── Init: check existing session ── */
async function init(){
  const client = getClient();
  if(!client){ showLogin(); return; }
  _setupListener();
  try {
    const { data: { session } } = await client.auth.getSession();
    if(session && session.user){
      _user = session.user;
      await _loadProfile();
      if(_profile?.blocked){
        await client.auth.signOut();
        _user = null; _profile = null; _isAdmin = false;
        showLogin();
        return;
      }
      showApp();
      _fireReady();
    } else {
      showLogin();
    }
  } catch(e){
    console.error('[GSB Auth] Init error:', e);
    showLogin();
  }
}

/* ── Get user email for admin enrichment ── */
async function getUserEmail(userId){
  // Cannot get emails directly from auth.users via client.
  // Instead use profiles table which we populate.
  // Admin can see profiles via RLS policy.
  return null; // email is available via auth only on server side
}

/* ── Admin: create user ── */
async function adminCreateUser(email, password, displayName, companyName, role, autoApprove){
  const client = getClient();
  if(!client) return { error: { message: 'Supabase niet geladen' } };
  if(!_isAdmin) return { error: { message: 'Alleen admins kunnen accounts aanmaken' } };
  const adminSession = (await client.auth.getSession()).data?.session;
  const { data, error } = await client.auth.signUp({
    email, password,
    options: { data: { display_name: displayName || '', company_name: companyName || '' } }
  });
  if(error) return { error };
  if(adminSession) await client.auth.setSession(adminSession);
  // Set role and auto-approve if created by admin
  if(data?.user){
    const updates = {};
    if(role && role !== 'user') updates.role = role;
    if(autoApprove) updates.approved = true;
    if(Object.keys(updates).length > 0){
      try{
        const { error: upErr } = await client.from('profiles').update(updates).eq('id', data.user.id);
        if(upErr) console.warn('Could not update profile:', upErr.message);
      }catch(_){}
    }
  }
  return { data };
}

/* ── Admin: send password reset email ── */
async function sendPasswordReset(email){
  const client = getClient();
  if(!client) return { error: { message: 'Supabase niet geladen' } };
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });
  return { error };
}

/* ── Admin: approve user account ── */
async function approveUser(userId){
  const client = getClient();
  if(!client) return { error: { message: 'Supabase niet geladen' } };
  if(!_isAdmin) return { error: { message: 'Alleen admins' } };
  const { error } = await client.from('profiles').update({ approved: true }).eq('id', userId);
  return { error };
}

/* ── Expose API ── */
window.gsAuth = {
  init,
  signIn, signUp, signOut, resetPassword, sendPasswordReset,
  getProfile, updateProfile,
  saveProject, loadProject, listProjects, deleteProject,
  listUsers, updateUserRole, toggleBlockUser, approveUser,
  listAllProjects,
  adminCreateUser,
  getSettings, updateSetting,
  getUsageStats, getCompanyStats,
  logUsage: _logUsage,
  onReady,
  get user(){ return _user; },
  get profile(){ return _profile; },
  get isAdmin(){ return _isAdmin; },
  get supabase(){ return getClient(); },
};

})();
