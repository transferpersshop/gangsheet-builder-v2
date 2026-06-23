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
  const email = document.getElementById('regEmail').value.trim();
  const pw = document.getElementById('regPassword').value;
  if(!name || !email || !pw) return;
  btn.disabled = true; btn.textContent = 'Bezig...';
  const result = await gsAuth.signUp(email, pw, name);
  btn.disabled = false; btn.textContent = 'Account aanmaken';
  if(result.error) return showError(_translateError(result.error.message));
  if(result.needsConfirmation){
    showSuccess('Check je e-mail voor een bevestigingslink.');
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

async function saveCurrentProject(){
  if(!window.gsbGetProjectData){ alert('Builder niet geladen'); return; }
  const projectData = window.gsbGetProjectData();
  const { data, error } = await gsAuth.saveProject(projectData);
  if(error){ alert('Opslaan mislukt: ' + error.message); return; }
  // Store current project id for future saves
  if(data?.id && window.gsbSetProjectId) window.gsbSetProjectId(data.id);
  closeModal('projectsModal');
  if(window.toast) window.toast('Project opgeslagen', 'success');
}

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
}

function adminTab(tab){
  const tabs = document.querySelectorAll('.admin-tabs button');
  tabs.forEach(b => b.classList.remove('active'));
  const contents = document.querySelectorAll('.admin-tab-content');
  contents.forEach(c => c.classList.remove('active'));
  const tabMap = { users:0, projects:1, settings:2, stats:3 };
  const idx = tabMap[tab] ?? 0;
  tabs[idx]?.classList.add('active');
  document.getElementById('adminTab' + ['Users','Projects','Settings','Stats'][idx])?.classList.add('active');
  // Load content
  if(tab === 'users') _loadAdminUsers();
  if(tab === 'projects') _loadAdminProjects();
  if(tab === 'settings') _loadAdminSettings();
  if(tab === 'stats') _loadAdminStats();
}

async function _loadAdminUsers(){
  const container = document.getElementById('adminUsersTable');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';
  const { data } = await gsAuth.listUsers();
  if(!data || data.length === 0){ container.innerHTML = '<p>Geen gebruikers gevonden.</p>'; return; }
  container.innerHTML = `<table class="admin-table">
    <thead><tr><th>Naam</th><th>Bedrijf</th><th>Rol</th><th>Status</th><th>Aangemeld</th><th>Actie</th></tr></thead>
    <tbody>${data.map(u => {
      const date = new Date(u.created_at).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric' });
      const badge = u.blocked ? 'badge-blocked' : u.role === 'admin' ? 'badge-admin' : 'badge-user';
      const badgeText = u.blocked ? 'Geblokkeerd' : u.role === 'admin' ? 'Admin' : 'Gebruiker';
      return `<tr>
        <td>${_esc(u.display_name || '—')}</td>
        <td>${_esc(u.company_name || '—')}</td>
        <td><select onchange="gsLoginUI.changeRole('${u.id}',this.value)" ${u.id === gsAuth.user?.id ? 'disabled' : ''}>
          <option value="user" ${u.role==='user'?'selected':''}>Gebruiker</option>
          <option value="admin" ${u.role==='admin'?'selected':''}>Admin</option>
        </select></td>
        <td><span class="badge ${badge}">${badgeText}</span></td>
        <td>${date}</td>
        <td>${u.id !== gsAuth.user?.id ? `<button class="btn-sm btn ${u.blocked ? 'btn-primary' : 'btn-accent'}" onclick="gsLoginUI.toggleBlock('${u.id}',${!u.blocked})">${u.blocked ? 'Deblokkeren' : 'Blokkeren'}</button>` : ''}</td>
      </tr>`;
    }).join('')}</tbody></table>`;
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

async function _loadAdminProjects(){
  const container = document.getElementById('adminProjectsTable');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';
  const { data } = await gsAuth.listAllProjects();
  if(!data || data.length === 0){ container.innerHTML = '<p>Geen projecten gevonden.</p>'; return; }
  container.innerHTML = `<table class="admin-table">
    <thead><tr><th>Project</th><th>Formaat</th><th>Logo's</th><th>Laatst bewerkt</th></tr></thead>
    <tbody>${data.map(p => {
      const date = new Date(p.updated_at).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric' });
      return `<tr><td>${_esc(p.name)}</td><td>${p.sheet_format}</td><td>${p.logo_count || 0}</td><td>${date}</td></tr>`;
    }).join('')}</tbody></table>`;
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
  container.innerHTML = `<div class="stats-grid">${cards.map(c =>
    `<div class="stat-card"><div class="sc-val">${c.val}</div><div class="sc-label">${c.label}</div></div>`
  ).join('')}</div>`;
}

/* ── HTML escape ── */
function _esc(s){ return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── Expose ── */
window.gsLoginUI = {
  showTab, handleLogin, handleRegister, handleReset, handleResetConfirm,
  toggleUserMenu, logout,
  openModal, closeModal,
  openProjects, loadProject, saveCurrentProject, deleteProject,
  openProfile, handleProfileSave,
  openAdmin, adminTab, changeRole, toggleBlock,
  saveSetting,
};

})();
