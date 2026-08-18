import "./style.css";

const icon = (name, size = 14) => {
  const paths = {
    settings: `<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.9 1.9 0 0 0-3.2 1.4v.2a2 2 0 0 1-4 0v-.2a1.9 1.9 0 0 0-3.2-1.4l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.9 1.9 0 0 0-1.4-3.2h-.2a2 2 0 0 1 0-4h.2a1.9 1.9 0 0 0 1.4-3.2l-.1-.1A2 2 0 0 1 6.2 1.7l.1.1A1.9 1.9 0 0 0 9.5.4V.2a2 2 0 0 1 4 0v.2a1.9 1.9 0 0 0 3.2 1.4l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.9 1.9 0 0 0 1.4 3.2h.2a2 2 0 0 1 0 4h-.2a1.9 1.9 0 0 0-1.5 3.2Z" transform="scale(.72) translate(4.7 4.7)"/>`,
    search: `<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/>`,
    plus: `<path d="M12 5v14M5 12h14"/>`,
    chevron: `<path d="m7 9 5 5 5-5"/>`,
    edit: `<path d="m4 20 4.2-1 9.9-9.9a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z"/><path d="m13.8 7.2 3 3"/>`,
    trash: `<path d="M4 7h16M9 11v5M15 11v5M6 7l1 13h10l1-13M9 7V4h6v3"/>`,
    x: `<path d="M6 6l12 12M18 6 6 18"/>`,
    arrow: `<path d="m9 18 6-6-6-6"/>`,
    check: `<path d="m5 12 4 4L19 6"/>`
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ""}</svg>`;
};

const LEGACY_REQUESTS_KEY = "nimbus-commerce-platform-v1";
const LEGACY_PROJECT_KEY = "nimbus-commerce-project-v1";
const PROJECTS_KEY = "nimbus-commerce-projects-v1";
const ACTIVE_PROJECT_KEY = "nimbus-commerce-active-project-v1";
const AUTH_KEY = "nimbus-commerce-auth-v1";
const ADMIN_ACCOUNT = { username: "admin", password: "Admin@123" };

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? structuredClone(fallback); }
  catch { return structuredClone(fallback); }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

const seedRequests = [
  {
    id: "CR-1024", title: "Enterprise checkout approval redesign",
    meta: "Large CR · 2 sub-requests · Customer approval", tasks: "2 tasks", owner: "Minh Anh", priority: "High", status: "Client review",
    children: [
      { id: "SR-1024.1", title: "Define new approval roles and permissions", meta: "Sub-request of CR-1024", tasks: "2 tasks", owner: "Minh Anh", priority: "High", status: "In progress" },
      { id: "SR-1024.2", title: "Update checkout exception handling", meta: "Sub-request of CR-1024", tasks: "1 task", owner: "Thanh Trúc", priority: "Medium", status: "Done" }
    ]
  },
  { id: "CR-1023", title: "Add audit trail for policy changes", meta: "Submitted Aug 15 · Security workspace", tasks: "3 tasks", owner: "Thanh Trúc", priority: "Medium", status: "Planning" },
  { id: "CR-1022", title: "Extend invoice export with tax breakdown", meta: "Submitted Aug 13 · Finance tools", tasks: "5 tasks", owner: "Quang Huy", priority: "High", status: "In review" },
  { id: "CR-1021", title: "Support custom roles for external partners", meta: "Submitted Aug 12 · Access controls", tasks: "0 tasks", owner: "Ngọc Linh", priority: "Low", status: "Approved" }
];

function migrateProjects() {
  const existing = localStorage.getItem(PROJECTS_KEY);
  if (existing) {
    try { return JSON.parse(existing); } catch { /* fall through to rebuild from legacy keys */ }
  }
  const legacyProject = load(LEGACY_PROJECT_KEY, {
    name: "Commerce Platform", client: "Atlas Retail", owner: "Bảo Phan", description: "Project workspace"
  });
  const legacyRequests = load(LEGACY_REQUESTS_KEY, seedRequests);
  const initial = [{ id: "p1", ...legacyProject, requests: legacyRequests }];
  save(PROJECTS_KEY, initial);
  return initial;
}

let projects = migrateProjects();
let activeProjectId = localStorage.getItem(ACTIVE_PROJECT_KEY) || projects[0].id;
if (!projects.some(p => p.id === activeProjectId)) activeProjectId = projects[0].id;
let activeStatus = "All statuses";
function saveProjects() { save(PROJECTS_KEY, projects); }
function setActiveProjectId(id) { activeProjectId = id; localStorage.setItem(ACTIVE_PROJECT_KEY, id); }
function projectStats(p) {
  const items = p.requests.flatMap(r => [r, ...(r.children || [])]);
  return { active: p.requests.length, completed: items.filter(r => r.status === "Done" || r.status === "Approved").length };
}

function initApp() {
const app = document.querySelector("#app");
let project = projects.find(p => p.id === activeProjectId);

app.innerHTML = `
  <div class="app-shell">
    <aside class="sidebar">
      <div class="sidebar-brand">NIMBUS</div>
      <nav class="side-nav" aria-label="Main navigation">
        <button class="nav-link active">Change Requests</button>
        <button class="nav-link" id="projectsNavBtn">Projects</button>
        <button class="nav-link">Team</button>
        <button class="nav-link">Settings</button>
      </nav>
      <div class="account">
        <div class="account-rule"></div>
        <div class="account-name">Bảo Phan</div>
        <div class="account-role">Product Operations</div>
        <button class="logout-btn" id="logoutBtn">Đăng xuất</button>
      </div>
    </aside>

    <main class="main">
      <header class="hero">
        <div>
          <h1 id="projectName">${escapeHtml(project.name)}</h1>
          <p id="heroMeta">${escapeHtml(project.description)} · ${escapeHtml(project.client)} · <span id="heroCount"></span> active change requests</p>
        </div>
        <button class="outline-btn" id="editBtn">${icon("settings", 13)}<span>Edit project</span></button>
      </header>

      <section class="project-summary">
        <div class="summary-copy">
          <a href="#" class="crumb" id="crumb">Projects / ${escapeHtml(project.name)}</a>
          <p id="summaryMeta">${escapeHtml(project.client)} · Owner: ${escapeHtml(project.owner)} · Updated today</p>
        </div>
        <div class="summary-metrics">
          <div><strong id="activeCount">04</strong><span>Active CRs</span></div>
          <div><strong id="completedCount">12</strong><span>Completed</span></div>
        </div>
      </section>

      <section class="workflow-card">
        <div class="workflow-intro"><strong>CR workflow</strong><span>From request to delivery</span></div>
        ${[["01","Nhập CR"],["02","Phân loại"],["03","Duyệt nội bộ"],["04","Duyệt khách hàng"],["05","Processing"],["06","Done"]].map(([n,t]) => `<div class="workflow-step"><strong>${n}</strong><span>${t}</span></div>`).join("")}
      </section>

      <section class="list-toolbar">
        <h2 id="listCount"></h2>
        <div class="toolbar-actions">
          <button class="outline-btn small" id="manageBtn">${icon("settings", 12)}<span>Manage types</span></button>
          <div class="status-filter-wrap">
            <button class="outline-btn small" id="statusBtn"><span id="statusLabel">All statuses</span>${icon("chevron", 12)}</button>
            <div class="status-menu hidden" id="statusMenu"></div>
          </div>
          <label class="search-box">${icon("search", 14)}<input id="search" type="search" placeholder="Search requests" autocomplete="off" /></label>
          <button class="new-btn" id="newBtn">New CR</button>
        </div>
      </section>

      <section class="requests-card">
        <div class="table header-row"><div>ID</div><div>REQUEST</div><div>TASK</div><div>ACTION</div><div>OWNER</div><div>PRIORITY</div><div>STATUS</div></div>
        <div id="rows"></div>
      </section>
    </main>
  </div>

  <div class="modal hidden" id="modal" role="dialog" aria-modal="true">
    <div class="modal-card" id="modalCard">
      <button class="modal-close" id="closeModal" aria-label="Close">×</button>
      <div id="infoModal">
        <h3 id="modalTitle">Edit project</h3><p id="modalText"></p><button class="primary-btn" id="modalOk">Done</button>
      </div>

      <form id="projectForm" class="hidden">
        <div class="modal-heading"><span class="modal-kicker">PROJECT SETTINGS</span><h3>Edit project</h3><p>Update the project information shown on this workspace.</p></div>
        <label><span>Project name <em>*</em></span><input id="projectNameInput" required maxlength="80" /></label>
        <label><span>Client <em>*</em></span><input id="projectClientInput" required maxlength="80" /></label>
        <label><span>Owner <em>*</em></span><input id="projectOwnerInput" required maxlength="60" /></label>
        <label><span>Description</span><input id="projectDescriptionInput" maxlength="120" /></label>
        <div class="form-footer"><button type="button" class="outline-btn" id="cancelProject">Cancel</button><button type="submit" class="primary-btn">Save project</button></div>
      </form>

      <div id="projectsListModal" class="hidden">
        <div class="modal-heading"><span class="modal-kicker">PROJECTS</span><h3>Projects</h3><p>Switch workspace or create a new project.</p></div>
        <div id="projectsList" class="projects-list"></div>
        <div class="form-footer" style="justify-content:space-between">
          <button type="button" class="outline-btn" id="cancelProjectsList">Close</button>
          <button type="button" class="primary-btn" id="openNewProjectBtn">${icon("plus", 12)}<span>New project</span></button>
        </div>
      </div>

      <form id="newProjectForm" class="hidden">
        <div class="modal-heading"><span class="modal-kicker">NEW PROJECT</span><h3>Create project</h3><p>Start a new workspace with its own change requests.</p></div>
        <label><span>Project name <em>*</em></span><input id="newProjectNameInput" required maxlength="80" placeholder="e.g. Loyalty Program" /></label>
        <label><span>Client <em>*</em></span><input id="newProjectClientInput" required maxlength="80" /></label>
        <label><span>Owner <em>*</em></span><input id="newProjectOwnerInput" required maxlength="60" /></label>
        <label><span>Description</span><input id="newProjectDescriptionInput" maxlength="120" /></label>
        <div class="form-error hidden" id="newProjectFormError"></div>
        <div class="form-footer"><button type="button" class="outline-btn" id="cancelNewProject">Cancel</button><button type="submit" class="primary-btn">Create project</button></div>
      </form>

      <form id="newCrForm" class="hidden">
        <div class="modal-heading"><span class="modal-kicker">CHANGE REQUEST</span><h3>New CR</h3><p>Create a new change request. New requests start with status <strong>New</strong>.</p></div>
        <label><span>Request title <em>*</em></span><input id="crTitle" required maxlength="100" placeholder="e.g. Add customer approval step" /></label>
        <label><span>Description</span><textarea id="crDescription" rows="3" maxlength="220" placeholder="Short description of the change request"></textarea></label>
        <div class="form-grid">
          <label><span>Owner <em>*</em></span><input id="crOwner" required maxlength="50" placeholder="Owner name" /></label>
          <label><span>Priority</span><select id="crPriority"><option>Low</option><option selected>Medium</option><option>High</option></select></label>
        </div>
        <div class="form-error hidden" id="formError"></div>
        <div class="form-footer"><button type="button" class="outline-btn" id="cancelNewCr">Cancel</button><button type="submit" class="primary-btn">Create CR</button></div>
      </form>

      <form id="editCrForm" class="hidden">
        <div class="modal-heading"><span class="modal-kicker">CHANGE REQUEST</span><h3>Edit CR</h3><p>Update the request and save it locally.</p></div>
        <input id="editCrId" type="hidden" />
        <label><span>Request title <em>*</em></span><input id="editCrTitle" required maxlength="100" /></label>
        <label><span>Description</span><textarea id="editCrDescription" rows="3" maxlength="220"></textarea></label>
        <div class="form-grid">
          <label><span>Owner <em>*</em></span><input id="editCrOwner" required maxlength="50" /></label>
          <label><span>Priority</span><select id="editCrPriority"><option>Low</option><option>Medium</option><option>High</option></select></label>
        </div>
        <label><span>Status</span><select id="editCrStatus"></select></label>
        <p class="field-hint">Cập nhật tuần tự theo quy trình · có thể bỏ qua bước Duyệt khách hàng · Processing cần có task link</p>
        <div class="task-links">
          <span>Task links · <strong id="editCrTaskCount">0 tasks</strong></span>
          <div class="task-links-add">
            <input id="editCrLinkInput" type="url" placeholder="Dán link task (Jira, Notion, Google Doc...)" />
            <button type="button" class="outline-btn small" id="editCrLinkAdd">${icon("plus", 12)}<span>Add</span></button>
          </div>
          <div id="editCrLinksList" class="task-links-list"></div>
        </div>
        <div class="form-error hidden" id="editFormError"></div>
        <div class="form-footer"><button type="button" class="outline-btn" id="cancelEditCr">Cancel</button><button type="submit" class="primary-btn">Save changes</button></div>
      </form>

      <div id="confirmModal" class="hidden">
        <div class="modal-heading"><span class="modal-kicker">DELETE</span><h3 id="confirmTitle">Delete CR?</h3><p id="confirmText"></p></div>
        <div class="form-footer"><button class="outline-btn" id="cancelDelete">Cancel</button><button class="danger-btn" id="confirmDelete">Delete</button></div>
      </div>
    </div>
  </div>
`;

const rows = document.querySelector("#rows");
const modal = document.querySelector("#modal");
const infoModal = document.querySelector("#infoModal");
const projectForm = document.querySelector("#projectForm");
const projectsListModal = document.querySelector("#projectsListModal");
const newProjectForm = document.querySelector("#newProjectForm");
const newProjectFormError = document.querySelector("#newProjectFormError");
const newCrForm = document.querySelector("#newCrForm");
const editCrForm = document.querySelector("#editCrForm");
const confirmModal = document.querySelector("#confirmModal");
const formError = document.querySelector("#formError");
const editFormError = document.querySelector("#editFormError");
const searchInput = document.querySelector("#search");
const statusMenu = document.querySelector("#statusMenu");
let pendingDelete = null;

function escapeHtml(value = "") { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c])); }
function allItems() { return project.requests.flatMap(r => [r, ...(r.children || [])]); }
function activeCount() { return project.requests.length; }
function completedCount() { return allItems().filter(r => r.status === "Done" || r.status === "Approved").length; }
function nextId(prefix = "CR") {
  const max = project.requests.reduce((m, r) => Math.max(m, Number(String(r.id).replace(/^\D+/, "")) || 0), 1024);
  return `${prefix}-${max + 1}`;
}
function todayMeta() { return `Submitted Aug 18 · ${project.name}`; }
function taskCount(r) { return Array.isArray(r.links) ? r.links.length : (parseInt(r.tasks, 10) || 0); }
function taskLabel(r) { const n = taskCount(r); return `${n} ${n === 1 ? "task" : "tasks"}`; }
function addTaskLink(id, url) {
  const found = findRequest(id); if (!found) return;
  const r = found.item;
  if (!r.links) r.links = [];
  r.links.push({ id: `L${r.links.length + 1}-${Date.now()}`, url });
  r.tasks = taskLabel(r);
  saveProjects();
}
function removeTaskLink(id, linkId) {
  const found = findRequest(id); if (!found) return;
  const r = found.item;
  r.links = (r.links || []).filter(l => l.id !== linkId);
  r.tasks = taskLabel(r);
  saveProjects();
}
function renderEditLinks(r) {
  const links = r.links || [];
  document.querySelector("#editCrLinksList").innerHTML = links.length
    ? links.map(l => `<div class="link-row"><a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.url)}</a><button type="button" class="icon-btn" title="Remove" data-remove-link="${l.id}">${icon("x", 11)}</button></div>`).join("")
    : `<p class="links-empty">Chưa có task link nào.</p>`;
  document.querySelector("#editCrTaskCount").textContent = taskLabel(r);
}

const statuses = ["All statuses", "New", "Planning", "In review", "Client review", "Approved", "In progress", "Done"];
const STATUS_FLOW = statuses.slice(1);
function statusIndex(s) { const i = STATUS_FLOW.indexOf(s); return i === -1 ? 0 : i; }
function allowedStatusesFor(current) {
  const i = statusIndex(current);
  const allowed = new Set(STATUS_FLOW.slice(0, i + 1));
  const next = STATUS_FLOW[i + 1];
  if (next) allowed.add(next);
  if (next === "Client review" && STATUS_FLOW[i + 2]) allowed.add(STATUS_FLOW[i + 2]);
  return STATUS_FLOW.filter(s => allowed.has(s));
}
function rowTemplate(r, child = false) {
  const description = r.description ? ` · ${escapeHtml(r.description)}` : "";
  return `<div class="table data-row ${child ? "child-row" : ""}" data-row-id="${r.id}">
    <div><a href="#" class="request-id" data-open-id="${r.id}">${escapeHtml(r.id)}</a></div>
    <div class="request-copy"><strong>${escapeHtml(r.title)}</strong><span>${escapeHtml(r.meta || "")}${description}</span></div>
    <div class="tasks">${escapeHtml(taskLabel(r))}</div>
    <div class="row-actions"><button class="add-sr" data-add-sr="${r.id}">${icon("plus", 12)}<span>Add SR</span></button><button class="icon-btn" title="Edit" data-edit="${r.id}">${icon("edit", 12)}</button><button class="icon-btn danger-icon" title="Delete" data-delete="${r.id}">${icon("trash", 12)}</button></div>
    <div class="owner">${escapeHtml(r.owner)}</div>
    <div><span class="priority ${String(r.priority).toLowerCase()}">${escapeHtml(r.priority)}</span></div>
    <div><span class="status ${String(r.status).toLowerCase().replaceAll(" ", "-")}">${escapeHtml(r.status)}</span></div>
  </div>`;
}

function matches(r, q) {
  return !q || [r.id, r.title, r.owner, r.priority, r.status, r.description].join(" ").toLowerCase().includes(q);
}
function render() {
  const q = searchInput.value.trim().toLowerCase();
  let html = "";
  project.requests.forEach(r => {
    const statusMatch = activeStatus === "All statuses" || r.status === activeStatus;
    const childStatusMatch = (r.children || []).some(c => activeStatus === "All statuses" || c.status === activeStatus);
    const parentMatch = statusMatch && matches(r, q);
    const childMatch = (r.children || []).some(c => childStatusMatch && matches(c, q));
    if (!parentMatch && !childMatch) return;
    if (parentMatch) html += rowTemplate(r);
    (r.children || []).forEach(c => {
      if ((activeStatus === "All statuses" || c.status === activeStatus) && matches(c, q)) html += rowTemplate(c, true);
    });
  });
  rows.innerHTML = html || `<div class="empty">No change requests found.</div>`;
  updateStats();
}
function updateStats() {
  const count = activeCount();
  document.querySelector("#heroCount").textContent = count;
  document.querySelector("#listCount").textContent = `${count} active CRs`;
  document.querySelector("#activeCount").textContent = String(count).padStart(2, "0");
  document.querySelector("#completedCount").textContent = String(completedCount()).padStart(2, "0");
}
function refreshProject() {
  document.querySelector("#projectName").textContent = project.name;
  document.querySelector("#heroMeta").innerHTML = `${escapeHtml(project.description)} · ${escapeHtml(project.client)} · <span id="heroCount"></span> active change requests`;
  document.querySelector("#crumb").textContent = `Projects / ${project.name}`;
  document.querySelector("#summaryMeta").textContent = `${project.client} · Owner: ${project.owner} · Updated today`;
  updateStats();
}
function openForm(form) {
  [infoModal, projectForm, newCrForm, editCrForm, confirmModal, projectsListModal, newProjectForm].forEach(x => x.classList.add("hidden"));
  form.classList.remove("hidden"); modal.classList.remove("hidden");
}
function closeModal() { modal.classList.add("hidden"); }
function showInfo(title, text) {
  [projectForm, newCrForm, editCrForm, confirmModal, projectsListModal, newProjectForm].forEach(x => x.classList.add("hidden"));
  document.querySelector("#modalTitle").textContent = title;
  document.querySelector("#modalText").textContent = text;
  infoModal.classList.remove("hidden"); modal.classList.remove("hidden");
}
function findRequest(id) {
  for (const r of project.requests) { if (r.id === id) return { item: r, parent: null }; for (const c of (r.children || [])) if (c.id === id) return { item: c, parent: r }; }
  return null;
}
function renderProjectsList() {
  document.querySelector("#projectsList").innerHTML = projects.map(p => {
    const stats = projectStats(p);
    const isActive = p.id === activeProjectId;
    return `<button type="button" class="project-row ${isActive ? "active" : ""}" data-select-project="${p.id}">
      <span class="project-row-name">${escapeHtml(p.name)}${isActive ? ' <em>· Current</em>' : ""}</span>
      <span class="project-row-meta">${escapeHtml(p.client)} · Owner: ${escapeHtml(p.owner)}</span>
      <span class="project-row-count">${stats.active} active CRs</span>
    </button>`;
  }).join("");
}
function switchProject(id) {
  const found = projects.find(p => p.id === id); if (!found) return;
  project = found;
  setActiveProjectId(id);
  activeStatus = "All statuses";
  document.querySelector("#statusLabel").textContent = activeStatus;
  searchInput.value = "";
  refreshProject();
  render();
  closeModal();
}
function openNewCr() {
  newCrForm.reset(); document.querySelector("#crPriority").value = "Medium";
  formError.classList.add("hidden"); openForm(newCrForm); requestAnimationFrame(() => document.querySelector("#crTitle").focus());
}
function openEditCr(id) {
  const found = findRequest(id); if (!found) return;
  const r = found.item;
  document.querySelector("#editCrId").value = r.id;
  document.querySelector("#editCrTitle").value = r.title;
  document.querySelector("#editCrDescription").value = r.description || "";
  document.querySelector("#editCrOwner").value = r.owner;
  document.querySelector("#editCrPriority").value = r.priority;
  document.querySelector("#editCrStatus").innerHTML = allowedStatusesFor(r.status).map(s => `<option>${s}</option>`).join("");
  document.querySelector("#editCrStatus").value = r.status;
  document.querySelector("#editCrLinkInput").value = "";
  renderEditLinks(r);
  editFormError.classList.add("hidden"); openForm(editCrForm);
}
function requestDelete(id) {
  const found = findRequest(id); if (!found) return;
  pendingDelete = { id, parent: found.parent };
  document.querySelector("#confirmTitle").textContent = `Delete ${id}?`;
  document.querySelector("#confirmText").textContent = `This will permanently remove ${found.item.title}.`;
  openForm(confirmModal);
}
function addSubRequest(parentId) {
  const found = findRequest(parentId); if (!found) return;
  const parent = found.parent || found.item;
  if (!parent.children) parent.children = [];
  const parentNumber = String(parent.id).replace(/^\D+/, "");
  const next = `SR-${parentNumber}.${parent.children.length + 1}`;
  parent.children.push({ id: next, title: "New sub-request", meta: `Sub-request of ${parent.id}`, tasks: "0 tasks", links: [], owner: project.owner, priority: "Medium", status: "New" });
  saveProjects(); render(); openEditCr(next);
}

searchInput.addEventListener("input", render);
document.querySelector("#newBtn").onclick = openNewCr;
document.querySelector("#closeModal").onclick = closeModal;
document.querySelector("#modalOk").onclick = closeModal;
document.querySelector("#cancelNewCr").onclick = closeModal;
document.querySelector("#cancelProject").onclick = closeModal;
document.querySelector("#cancelEditCr").onclick = closeModal;
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

function syncEditLinksUI(id) {
  const found = findRequest(id); if (!found) return;
  renderEditLinks(found.item);
  document.querySelector("#editCrStatus").value = found.item.status;
  render();
}
document.querySelector("#editCrLinkAdd").onclick = () => {
  const id = document.querySelector("#editCrId").value;
  const input = document.querySelector("#editCrLinkInput");
  let url = input.value.trim();
  if (!url) return;
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  addTaskLink(id, url);
  input.value = "";
  syncEditLinksUI(id);
};
editCrForm.addEventListener("click", e => {
  const removeBtn = e.target.closest("[data-remove-link]"); if (!removeBtn) return;
  removeTaskLink(document.querySelector("#editCrId").value, removeBtn.dataset.removeLink);
  syncEditLinksUI(document.querySelector("#editCrId").value);
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

document.querySelector("#projectsNavBtn").onclick = () => { renderProjectsList(); openForm(projectsListModal); };
document.querySelector("#cancelProjectsList").onclick = closeModal;
projectsListModal.addEventListener("click", e => {
  const btn = e.target.closest("[data-select-project]"); if (!btn) return;
  switchProject(btn.dataset.selectProject);
});
document.querySelector("#openNewProjectBtn").onclick = () => {
  newProjectForm.reset();
  newProjectFormError.classList.add("hidden");
  openForm(newProjectForm);
  requestAnimationFrame(() => document.querySelector("#newProjectNameInput").focus());
};
document.querySelector("#cancelNewProject").onclick = () => { renderProjectsList(); openForm(projectsListModal); };
newProjectForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.querySelector("#newProjectNameInput").value.trim();
  const client = document.querySelector("#newProjectClientInput").value.trim();
  const owner = document.querySelector("#newProjectOwnerInput").value.trim();
  if (!name || !client || !owner) {
    newProjectFormError.textContent = "Vui lòng nhập Project name, Client và Owner.";
    newProjectFormError.classList.remove("hidden");
    return;
  }
  const newProject = {
    id: `p${Date.now()}`,
    name, client, owner,
    description: document.querySelector("#newProjectDescriptionInput").value.trim() || "Project workspace",
    requests: []
  };
  projects.push(newProject);
  saveProjects();
  switchProject(newProject.id);
});

document.querySelector("#editBtn").onclick = () => {
  document.querySelector("#projectNameInput").value = project.name;
  document.querySelector("#projectClientInput").value = project.client;
  document.querySelector("#projectOwnerInput").value = project.owner;
  document.querySelector("#projectDescriptionInput").value = project.description;
  openForm(projectForm);
};

document.querySelector("#manageBtn").onclick = () => showInfo("Manage types", "Request types are currently represented by the workflow above. This screen is ready to connect to a backend type manager.");

document.querySelector("#statusBtn").onclick = () => statusMenu.classList.toggle("hidden");
statusMenu.innerHTML = statuses.map(s => `<button class="status-option" data-status="${s}">${s}${s === "All statuses" ? "" : ""}</button>`).join("");
statusMenu.addEventListener("click", e => {
  const btn = e.target.closest("[data-status]"); if (!btn) return;
  activeStatus = btn.dataset.status; document.querySelector("#statusLabel").textContent = activeStatus; statusMenu.classList.add("hidden"); render();
});

document.addEventListener("click", e => {
  const edit = e.target.closest("[data-edit]"); if (edit) return openEditCr(edit.dataset.edit);
  const del = e.target.closest("[data-delete]"); if (del) return requestDelete(del.dataset.delete);
  const add = e.target.closest("[data-add-sr]"); if (add) return addSubRequest(add.dataset.addSr);
  const open = e.target.closest("[data-open-id]"); if (open) { e.preventDefault(); return openEditCr(open.dataset.openId); }
  if (!e.target.closest(".status-filter-wrap")) statusMenu.classList.add("hidden");
});

projectForm.addEventListener("submit", e => {
  e.preventDefault();
  project.name = document.querySelector("#projectNameInput").value.trim();
  project.client = document.querySelector("#projectClientInput").value.trim();
  project.owner = document.querySelector("#projectOwnerInput").value.trim();
  project.description = document.querySelector("#projectDescriptionInput").value.trim() || "Project workspace";
  saveProjects(); refreshProject(); closeModal();
});

newCrForm.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.querySelector("#crTitle").value.trim();
  const owner = document.querySelector("#crOwner").value.trim();
  if (!title || !owner) { formError.textContent = "Vui lòng nhập Request title và Owner."; formError.classList.remove("hidden"); return; }
  project.requests.unshift({
    id: nextId(), title, description: document.querySelector("#crDescription").value.trim(), meta: todayMeta(),
    tasks: "0 tasks", links: [], owner, priority: document.querySelector("#crPriority").value, status: "New", children: []
  });
  saveProjects(); searchInput.value = ""; activeStatus = "All statuses"; document.querySelector("#statusLabel").textContent = activeStatus; render(); closeModal();
});

editCrForm.addEventListener("submit", e => {
  e.preventDefault();
  const id = document.querySelector("#editCrId").value; const found = findRequest(id); if (!found) return;
  const r = found.item; const title = document.querySelector("#editCrTitle").value.trim(); const owner = document.querySelector("#editCrOwner").value.trim();
  if (!title || !owner) { editFormError.textContent = "Vui lòng nhập Request title và Owner."; editFormError.classList.remove("hidden"); return; }
  const newStatus = document.querySelector("#editCrStatus").value;
  if (newStatus !== r.status) {
    if (!allowedStatusesFor(r.status).includes(newStatus)) {
      editFormError.textContent = "Vui lòng cập nhật trạng thái theo đúng thứ tự quy trình (có thể bỏ qua bước Duyệt khách hàng).";
      editFormError.classList.remove("hidden");
      return;
    }
    if (newStatus === "In progress" && !(r.links || []).length) {
      editFormError.textContent = "Cần thêm ít nhất 1 task link trước khi chuyển sang Processing.";
      editFormError.classList.remove("hidden");
      return;
    }
  }
  Object.assign(r, { title, description: document.querySelector("#editCrDescription").value.trim(), owner, priority: document.querySelector("#editCrPriority").value, status: newStatus });
  r.tasks = taskLabel(r);
  saveProjects(); render(); closeModal();
});

document.querySelector("#cancelDelete").onclick = closeModal;
document.querySelector("#confirmDelete").onclick = () => {
  if (!pendingDelete) return;
  if (pendingDelete.parent) pendingDelete.parent.children = (pendingDelete.parent.children || []).filter(c => c.id !== pendingDelete.id);
  else project.requests = project.requests.filter(r => r.id !== pendingDelete.id);
  saveProjects(); pendingDelete = null; render(); closeModal();
};

document.querySelector("#logoutBtn").onclick = () => {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
  location.reload();
};

refreshProject();
render();
}

function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === "1" || sessionStorage.getItem(AUTH_KEY) === "1";
}

function renderLogin() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <div class="login-shell">
      <form class="login-card" id="loginForm">
        <div class="login-brand">NIMBUS</div>
        <h1>Đăng nhập</h1>
        <p>Đăng nhập để quản lý Commerce Platform.</p>
        <label><span>Tên đăng nhập</span><input id="loginUsername" type="text" required autocomplete="username" /></label>
        <label><span>Mật khẩu</span><input id="loginPassword" type="password" required autocomplete="current-password" /></label>
        <label class="login-remember"><input id="loginRemember" type="checkbox" /><span>Ghi nhớ đăng nhập</span></label>
        <div class="form-error hidden" id="loginError">Sai tên đăng nhập hoặc mật khẩu.</div>
        <button type="submit" class="primary-btn login-submit">Login</button>
      </form>
    </div>
  `;
  const form = document.querySelector("#loginForm");
  const error = document.querySelector("#loginError");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.querySelector("#loginUsername").value.trim();
    const password = document.querySelector("#loginPassword").value;
    const remember = document.querySelector("#loginRemember").checked;
    if (username === ADMIN_ACCOUNT.username && password === ADMIN_ACCOUNT.password) {
      (remember ? localStorage : sessionStorage).setItem(AUTH_KEY, "1");
      location.reload();
    } else {
      error.classList.remove("hidden");
    }
  });
}

if (isLoggedIn()) {
  initApp();
} else {
  renderLogin();
}
