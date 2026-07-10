/* ============================================================
   login-ui.js — UI event handlers for login, modals, admin panel
   Loaded AFTER auth.js, BEFORE app.js
   ============================================================ */
(function(){
'use strict';

/* ── Login form tab switching ── */
function showTab(tab){
  const forms = { login:'loginForm', register:'registerForm', reset:'resetForm', 'reset-confirm':'resetConfirmForm' };
  Object.values(forms).forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = 'none';
  });
  const target = forms[tab];
  if(target) document.getElementById(target).style.display = '';
  // Update tab buttons
  const tabs = document.querySelectorAll('.login-tabs button');
  tabs.forEach(b => b.classList.remove('active'));
  if(tab === 'login') tabs[0]?.classList.add('active');
  if(tab === 'register') tabs[1]?.classList.add('active');
  // Hide messages
  hideMsg();
}

function showError(msg){
  const el = document.getElementById('loginError');
  if(el){ el.textContent = msg; el.style.display = 'block'; }
  const suc = document.getElementById('loginSuccess');
  if(suc) suc.style.display = 'none';
}
function showSuccess(msg){
  const el = document.getElementById('loginSuccess');
  if(el){ el.textContent = msg; el.style.display = 'block'; }
  const err = document.getElementById('loginError');
  if(err) err.style.display = 'none';
}
function hideMsg(){
  const e = document.getElementById('loginError'); if(e) e.style.display = 'none';
  const s = document.getElementById('loginSuccess'); if(s) s.style.display = 'none';
}

/* ── Login handler ── */
async function handleLogin(e){
  e.preventDefault();
  hideMsg();
  const btn = document.getElementById('loginBtn');
  const email = document.getElementById('loginEmail').value.trim();
  const pw = document.getElementById('loginPassword').value;
  if(!email || !pw) return;
  btn.disabled = true; btn.textContent = 'Bezig...';
  const { error } = await gsAuth.signIn(email, pw);
  btn.disabled = false; btn.textContent = 'Inloggen';
  if(error) showError(_translateError(error.message));
}

/* ── Register handler ── */
async function handleRegister(e){
  e.preventDefault();
  hideMsg();
  const btn = document.getElementById('regBtn');
  const name = document.getElementById('regName').value.trim();
  const company = document.getElementById('regCompany').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pw = document.getElementById('regPassword').value;
  if(!name || !company || !email || !pw) return;
  btn.disabled = true; btn.textContent = 'Bezig...';
  const result = await gsAuth.signUp(email, pw, name, company);
  btn.disabled = false; btn.textContent = 'Account aanmaken';
  if(result.error) return showError(_translateError(result.error.message));
  if(result.needsConfirmation){
    showSuccess('Check je e-mail voor een bevestigingslink.');
  } else if(result.needsApproval){
    showSuccess('Je account is aangemaakt en wacht op goedkeuring door een beheerder. Je ontvangt bericht zodra het is goedgekeurd.');
  }
}

/* ── Reset password handler ── */
async function handleReset(e){
  e.preventDefault();
  hideMsg();
  const email = document.getElementById('resetEmail').value.trim();
  if(!email) return;
  const { error } = await gsAuth.resetPassword(email);
  if(error) return showError(_translateError(error.message));
  showSuccess('Als dit e-mailadres bekend is, ontvang je een herstelmail.');
}

/* ── Reset password confirm ── */
async function handleResetConfirm(e){
  e.preventDefault();
  hideMsg();
  const pw = document.getElementById('newPassword').value;
  if(!pw || pw.length < 6) return showError('Wachtwoord moet minimaal 6 tekens zijn.');
  const client = gsAuth.supabase;
  if(!client) return;
  const { error } = await client.auth.updateUser({ password: pw });
  if(error) return showError(_translateError(error.message));
  showSuccess('Wachtwoord gewijzigd. Je wordt ingelogd...');
  setTimeout(() => location.reload(), 1500);
}

/* ── Translate common Supabase errors ── */
function _translateError(msg){
  if(!msg) return 'Onbekende fout';
  const m = msg.toLowerCase();
  if(m.includes('invalid login')) return 'Onjuist e-mailadres of wachtwoord.';
  if(m.includes('email not confirmed')) return 'Bevestig eerst je e-mailadres via de link in je inbox.';
  if(m.includes('user already registered')) return 'Dit e-mailadres is al geregistreerd. Probeer in te loggen.';
  if(m.includes('password') && m.includes('6')) return 'Wachtwoord moet minimaal 6 tekens zijn.';
  if(m.includes('rate limit')) return 'Te veel pogingen. Wacht even en probeer opnieuw.';
  if(m.includes('network')) return 'Geen verbinding. Controleer je internet.';
  return msg;
}

/* ── User menu ── */
function toggleUserMenu(){
  const dd = document.getElementById('userDropdown');
  if(!dd) return;
  dd.classList.toggle('open');
  if(dd.classList.contains('open')){
    // Close on outside click
    setTimeout(() => {
      const handler = (e) => {
        if(!dd.contains(e.target) && e.target.id !== 'userAvatarBtn' && !e.target.closest('#userAvatarBtn')){
          dd.classList.remove('open');
          document.removeEventListener('click', handler);
        }
      };
      document.addEventListener('click', handler);
    }, 10);
  }
}

async function logout(){
  document.getElementById('userDropdown')?.classList.remove('open');
  await gsAuth.signOut();
}

/* ── Modal helpers ── */
function openModal(id){
  const el = document.getElementById(id);
  if(el) el.classList.add('open');
  document.getElementById('userDropdown')?.classList.remove('open');
}
function closeModal(id){
  const el = document.getElementById(id);
  if(el) el.classList.remove('open');
}

/* ── Projects modal ── */
async function openProjects(){
  openModal('projectsModal');
  const grid = document.getElementById('projectsGrid');
  const empty = document.getElementById('projectsEmpty');
  if(!grid) return;
  grid.innerHTML = '<p style="color:var(--muted);text-align:center;grid-column:1/-1">Laden...</p>';
  const { data } = await gsAuth.listProjects();
  if(!data || data.length === 0){
    grid.innerHTML = '';
    if(empty) empty.style.display = '';
    return;
  }
  if(empty) empty.style.display = 'none';
  grid.innerHTML = data.map(p => {
    const date = new Date(p.updated_at).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric' });
    return `<div class="project-card" onclick="gsLoginUI.loadProject('${p.id}')">
      <div class="pc-thumb">${p.thumbnail_path ? `<img src="${p.thumbnail_path}" alt="">` : 'Geen preview'}</div>
      <div class="pc-info">
        <div class="pc-name">${_esc(p.name)}</div>
        <div class="pc-meta">${p.logo_count || 0} logo's · ${p.sheet_format} · ${date}</div>
      </div>
      <div class="pc-actions">
        <button onclick="event.stopPropagation();gsLoginUI.deleteProject('${p.id}','${_esc(p.name)}')" class="danger">Verwijderen</button>
      </div>
    </div>`;
  }).join('');
}

async function loadProject(id){
  const { data, error } = await gsAuth.loadProject(id);
  if(error || !data){ alert('Kon project niet laden: ' + (error?.message || 'onbekend')); return; }
  closeModal('projectsModal');
  // Tell app.js to load the canvas
  if(window.gsbLoadProject) window.gsbLoadProject(data);
}

/* ── Save dialog flow ── */
function openSaveDialog(){
  if(!window.gsbGetProjectData){ alert('Builder niet geladen'); return; }
  const nameInput = document.getElementById('saveProjectName');
  // Pre-fill with current project name
  const current = window.gsbGetProjectData();
  if(nameInput){
    nameInput.value = current.name || 'Naamloos project';
  }
  openModal('saveNameModal');
  setTimeout(() => { if(nameInput){ nameInput.focus(); nameInput.select(); } }, 80);
}

function closeSaveDialog(){
  closeModal('saveNameModal');
}

async function confirmSave(){
  const nameInput = document.getElementById('saveProjectName');
  const name = (nameInput?.value || '').trim() || 'Naamloos project';
  closeSaveDialog();

  const projectData = window.gsbGetProjectData();
  projectData.name = name;

  const { data, error } = await gsAuth.saveProject(projectData);
  if(error){ alert('Opslaan mislukt: ' + error.message); return; }
  if(data?.id && window.gsbSetProjectId) window.gsbSetProjectId(data.id);

  // Pulse the user avatar so user knows where to find saved projects
  const avatar = document.getElementById('userAvatarBtn');
  if(avatar){
    avatar.classList.remove('save-pulse');
    void avatar.offsetWidth; // force reflow for re-trigger
    avatar.classList.add('save-pulse');
    avatar.addEventListener('animationend', () => avatar.classList.remove('save-pulse'), { once: true });
  }

  if(window.toast) window.toast('Project opgeslagen', 'success');
}

// Backward-compatible alias
async function saveCurrentProject(){ openSaveDialog(); }

async function deleteProject(id, name){
  if(!confirm(`"${name}" verwijderen? Dit kan niet ongedaan worden.`)) return;
  const { error } = await gsAuth.deleteProject(id);
  if(error){ alert('Verwijderen mislukt: ' + error.message); return; }
  openProjects(); // Refresh list
}

/* ── Profile modal ── */
function openProfile(){
  openModal('profileModal');
  const p = gsAuth.profile;
  if(!p) return;
  document.getElementById('profName').value = p.display_name || '';
  document.getElementById('profCompany').value = p.company_name || '';
  document.getElementById('profFormat').value = p.preferred_format || 'dtf55';
  document.getElementById('profUnit').value = p.preferred_unit || 'cm';
  document.getElementById('profLang').value = p.preferred_lang || 'nl';
}

async function handleProfileSave(e){
  e.preventDefault();
  const updates = {
    display_name: document.getElementById('profName').value.trim(),
    company_name: document.getElementById('profCompany').value.trim(),
    preferred_format: document.getElementById('profFormat').value,
    preferred_unit: document.getElementById('profUnit').value,
    preferred_lang: document.getElementById('profLang').value,
  };
  const { error } = await gsAuth.updateProfile(updates);
  if(error){ alert('Opslaan mislukt: ' + error.message); return; }
  closeModal('profileModal');
  // Update user menu display
  const name = updates.display_name || gsAuth.user?.email?.split('@')[0] || '';
  const el = document.getElementById('userInitial');
  if(el) el.textContent = name ? name.charAt(0).toUpperCase() : '?';
  const nameEl = document.getElementById('userMenuName');
  if(nameEl) nameEl.textContent = name;
  if(window.toast) window.toast('Profiel opgeslagen', 'success');
}

/* ── Admin panel ── */
function openAdmin(){
  if(!gsAuth.isAdmin) return;
  openModal('adminModal');
  adminTab('users');
  // Pre-load approval count for badge
  _updateApprovalBadge();
}

async function _updateApprovalBadge(){
  try{
    const { data } = await gsAuth.listUsers();
    const pending = (data || []).filter(u => u.approved === false && !u.blocked);
    const badge = document.getElementById('approvalBadge');
    if(badge){
      if(pending.length > 0){ badge.textContent = pending.length; badge.style.display = ''; }
      else { badge.style.display = 'none'; }
    }
  }catch(_){}
}

function adminTab(tab){
  const navItems = document.querySelectorAll('.admin-nav-item');
  navItems.forEach(b => b.classList.remove('active'));
  const contents = document.querySelectorAll('.admin-tab-content');
  contents.forEach(c => c.classList.remove('active'));
  const tabMap = { users:0, approval:1, settings:2, stats:3 };
  const idx = tabMap[tab] ?? 0;
  navItems[idx]?.classList.add('active');
  document.getElementById('adminTab' + ['Users','Approval','Settings','Stats'][idx])?.classList.add('active');
  if(tab === 'users') _loadAdminUsers();
  if(tab === 'approval') _loadAdminApprovals();
  if(tab === 'settings') _loadAdminSettings();
  if(tab === 'stats') _loadAdminStats();
}

async function _loadAdminUsers(){
  const container = document.getElementById('adminUsersTable');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';
  const { data } = await gsAuth.listUsers();

  // Build "create account" form + user table
  let html = `<div class="admin-create-form" id="adminCreateForm">
    <h4 style="margin:0 0 10px;font-size:.82rem;text-transform:uppercase;letter-spacing:.5px;color:var(--muted)">Account aanmaken</h4>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
      <div style="flex:1;min-width:140px"><label class="admin-lbl">Naam</label><input type="text" id="adminNewName" class="admin-inp" placeholder="Volledige naam"></div>
      <div style="flex:1;min-width:140px"><label class="admin-lbl">Bedrijf</label><input type="text" id="adminNewCompany" class="admin-inp" placeholder="Bedrijfsnaam"></div>
      <div style="flex:1.5;min-width:180px"><label class="admin-lbl">E-mail</label><input type="email" id="adminNewEmail" class="admin-inp" placeholder="naam@bedrijf.nl"></div>
      <div style="flex:0 0 auto"><label class="admin-lbl">Rol</label><select id="adminNewRole" class="admin-inp"><option value="user">Gebruiker</option><option value="printer">Printer</option><option value="admin">Admin</option></select></div>
      <button class="btn btn-primary btn-sm" style="height:34px;white-space:nowrap" onclick="gsLoginUI.adminCreateUser()">+ Aanmaken & mail versturen</button>
    </div>
    <p style="font-size:.72rem;color:var(--muted);margin:6px 0 0">De gebruiker ontvangt een e-mail om een eigen wachtwoord in te stellen.</p>
    <p id="adminCreateMsg" style="font-size:.78rem;margin:4px 0 0;min-height:16px"></p>
  </div>
  <div style="height:1px;background:var(--border);margin:14px 0"></div>`;

  if(!data || data.length === 0){ html += '<p>Geen gebruikers gevonden.</p>'; }
  else {
    html += `<table class="admin-table">
    <thead><tr><th>Naam</th><th>Bedrijf</th><th>Rol</th><th>Status</th><th>Aangemeld</th><th>Actie</th></tr></thead>
    <tbody>${data.map(u => {
      const date = new Date(u.created_at).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric' });
      const badge = u.blocked ? 'badge-blocked' : u.approved === false ? 'badge-pending' : u.role === 'admin' ? 'badge-admin' : u.role === 'printer' ? 'badge-printer' : 'badge-user';
      const badgeText = u.blocked ? 'Geblokkeerd' : u.approved === false ? 'Wacht op goedkeuring' : u.role === 'admin' ? 'Admin' : u.role === 'printer' ? 'Printer' : 'Gebruiker';
      return `<tr>
        <td>${_esc(u.display_name || '—')}</td>
        <td>${_esc(u.company_name || '—')}</td>
        <td><select onchange="gsLoginUI.changeRole('${u.id}',this.value)" ${u.id === gsAuth.user?.id ? 'disabled' : ''}>
          <option value="user" ${u.role==='user'?'selected':''}>Gebruiker</option>
          <option value="printer" ${u.role==='printer'?'selected':''}>Printer</option>
          <option value="admin" ${u.role==='admin'?'selected':''}>Admin</option>
        </select></td>
        <td><span class="badge ${badge}">${badgeText}</span></td>
        <td>${date}</td>
        <td>${u.id !== gsAuth.user?.id ? `<button class="btn-sm btn ${u.blocked ? 'btn-primary' : 'btn-accent'}" onclick="gsLoginUI.toggleBlock('${u.id}',${!u.blocked})">${u.blocked ? 'Deblokkeren' : 'Blokkeren'}</button>` : ''}</td>
      </tr>`;
    }).join('')}</tbody></table>`;
  }
  container.innerHTML = html;
}

function _generatePassword(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let pw = '';
  for(let i = 0; i < 16; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw;
}

async function adminCreateUser(){
  const name = document.getElementById('adminNewName')?.value?.trim() || '';
  const company = document.getElementById('adminNewCompany')?.value?.trim() || '';
  const email = document.getElementById('adminNewEmail')?.value?.trim() || '';
  const role = document.getElementById('adminNewRole')?.value || 'user';
  const msg = document.getElementById('adminCreateMsg');
  if(!email){ if(msg) msg.innerHTML='<span style="color:#ef4444">E-mail is verplicht</span>'; return; }
  if(msg) msg.innerHTML='<span style="color:var(--muted)">Account aanmaken...</span>';
  // Auto-generate temp password — user will set their own via reset email
  const tempPw = _generatePassword();
  const result = await gsAuth.adminCreateUser(email, tempPw, name, company, role, true);
  if(result.error){
    if(msg) msg.innerHTML='<span style="color:#ef4444">Fout: '+_esc(result.error.message||result.error)+'</span>';
  } else {
    // Send password reset email so user can set their own password
    try { await gsAuth.sendPasswordReset(email); } catch(_){}
    if(msg) msg.innerHTML='<span style="color:#22c55e">Account aangemaakt — wachtwoord reset e-mail verstuurd naar '+_esc(email)+'</span>';
    ['adminNewName','adminNewCompany','adminNewEmail'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
    _loadAdminUsers();
  }
}

async function changeRole(userId, role){
  await gsAuth.updateUserRole(userId, role);
  _loadAdminUsers();
}

async function toggleBlock(userId, blocked){
  const action = blocked ? 'blokkeren' : 'deblokkeren';
  if(!confirm(`Weet je zeker dat je deze gebruiker wilt ${action}?`)) {
    _loadAdminUsers(); // Reset select
    return;
  }
  await gsAuth.toggleBlockUser(userId, blocked);
  _loadAdminUsers();
}

async function _loadAdminApprovals(){
  const container = document.getElementById('adminApprovalTable');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';
  const { data } = await gsAuth.listUsers();
  // Filter pending (not approved and not blocked)
  const pending = (data || []).filter(u => u.approved === false && !u.blocked);
  const badge = document.getElementById('approvalBadge');
  if(badge){
    if(pending.length > 0){ badge.textContent = pending.length; badge.style.display = ''; }
    else { badge.style.display = 'none'; }
  }
  if(pending.length === 0){
    container.innerHTML = '<div style="text-align:center;padding:40px 0;color:var(--muted)"><p style="font-size:1.5rem;margin:0 0 8px">✓</p><p>Geen openstaande aanvragen</p></div>';
    return;
  }
  container.innerHTML = `<table class="admin-table">
    <thead><tr><th>Naam</th><th>Bedrijf</th><th>E-mail</th><th>Aangemeld</th><th>Actie</th></tr></thead>
    <tbody>${pending.map(u => {
      const date = new Date(u.created_at).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric' });
      return `<tr>
        <td>${_esc(u.display_name || '—')}</td>
        <td>${_esc(u.company_name || '—')}</td>
        <td>${_esc(u.email || '—')}</td>
        <td>${date}</td>
        <td style="display:flex;gap:6px">
          <button class="btn btn-primary btn-sm" onclick="gsLoginUI.approveUser('${u.id}')">Goedkeuren</button>
          <button class="btn btn-accent btn-sm" onclick="gsLoginUI.rejectUser('${u.id}')">Afwijzen</button>
        </td>
      </tr>`;
    }).join('')}</tbody></table>`;
}

async function approveUser(userId){
  await gsAuth.approveUser(userId);
  if(window.toast) window.toast('Account goedgekeurd', 'success');
  _loadAdminApprovals();
  _loadAdminUsers();
}

async function rejectUser(userId){
  if(!confirm('Weet je zeker dat je dit account wilt afwijzen? Het account wordt geblokkeerd.')) return;
  await gsAuth.toggleBlockUser(userId, true);
  if(window.toast) window.toast('Account afgewezen', 'success');
  _loadAdminApprovals();
}

async function _loadAdminSettings(){
  const container = document.getElementById('adminSettingsForm');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';
  const settings = await gsAuth.getSettings();
  const rows = [
    { key:'default_gap_mm', label:'Standaard gap (mm)', type:'number', val: settings.default_gap_mm ?? 5 },
    { key:'default_format', label:'Standaard formaat', type:'select', val: settings.default_format ?? 'dtf55',
      options:[{v:'dtf55',l:'DTF 55cm'},{v:'dtf60',l:'DTF 60cm'},{v:'a3',l:'A3'},{v:'a4',l:'A4'},{v:'a5',l:'A5'}] },
    { key:'max_file_size_mb', label:'Max bestandsgrootte (MB)', type:'number', val: settings.max_file_size_mb ?? 50 },
  ];
  container.innerHTML = rows.map(r => {
    let input = '';
    if(r.type === 'select'){
      input = `<select id="setting_${r.key}" onchange="gsLoginUI.saveSetting('${r.key}',this.value)">${r.options.map(o => `<option value="${o.v}" ${o.v === r.val ? 'selected' : ''}>${o.l}</option>`).join('')}</select>`;
    } else {
      input = `<input type="${r.type}" id="setting_${r.key}" value="${r.val}" onchange="gsLoginUI.saveSetting('${r.key}',this.value)">`;
    }
    return `<div class="sf-row"><span class="sf-label">${r.label}</span><div class="sf-input">${input}</div></div>`;
  }).join('');
}

async function saveSetting(key, value){
  // Parse numbers
  if(key === 'default_gap_mm' || key === 'max_file_size_mb') value = Number(value);
  await gsAuth.updateSetting(key, JSON.stringify(value));
  if(window.toast) window.toast('Instelling opgeslagen', 'success', 1500);
}

async function _loadAdminStats(){
  const container = document.getElementById('adminStatsContent');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';

  // Overall stats
  const stats = await gsAuth.getUsageStats(30);
  const counts = stats.counts || {};
  const cards = [
    { label:'Totaal events (30d)', val: stats.totalEvents || 0 },
    { label:'Actieve dagen', val: stats.activeDays || 0 },
    { label:'Logins', val: counts.login || 0 },
    { label:'Exports', val: counts.export_pdf || 0 },
    { label:'Projecten opgeslagen', val: counts.save_project || 0 },
    { label:'Registraties', val: counts.signup || 0 },
  ];

  // Per-company stats
  const companyData = await gsAuth.getCompanyStats();
  const companies = companyData.data || [];

  let html = `<div class="stats-grid">${cards.map(c =>
    `<div class="stat-card"><div class="sc-val">${c.val}</div><div class="sc-label">${c.label}</div></div>`
  ).join('')}</div>`;

  // Company table
  html += `<div style="height:1px;background:var(--border);margin:18px 0 14px"></div>`;
  html += `<h4 style="margin:0 0 10px;font-size:.82rem;text-transform:uppercase;letter-spacing:.5px;color:var(--muted)">Per bedrijf</h4>`;
  if(companies.length === 0){
    html += `<p style="color:var(--muted);font-size:.85rem">Nog geen activiteit geregistreerd.</p>`;
  } else {
    html += `<table class="admin-table"><thead><tr><th>Bedrijf</th><th>Gangsheets</th><th>Logins</th><th>Laatste activiteit</th></tr></thead><tbody>`;
    companies.forEach(c => {
      const lastDate = c.lastActivity ? new Date(c.lastActivity).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '—';
      html += `<tr><td>${_esc(c.company)}</td><td><strong>${c.gangsheets}</strong></td><td>${c.logins}</td><td>${lastDate}</td></tr>`;
    });
    html += `</tbody></table>`;
  }

  container.innerHTML = html;
}

/* ── HTML escape ── */
function _esc(s){ return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── Expose ── */
window.gsLoginUI = {
  showTab, handleLogin, handleRegister, handleReset, handleResetConfirm,
  toggleUserMenu, logout,
  openModal, closeModal,
  openProjects, loadProject, saveCurrentProject, deleteProject,
  openSaveDialog, closeSaveDialog, confirmSave,
  openProfile, handleProfileSave,
  openAdmin, adminTab, changeRole, toggleBlock,
  adminCreateUser, approveUser, rejectUser,
  saveSetting,
};

})();
