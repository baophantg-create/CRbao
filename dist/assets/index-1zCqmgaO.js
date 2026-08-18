(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))p(a);new MutationObserver(a=>{for(const c of a)if(c.type==="childList")for(const v of c.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&p(v)}).observe(document,{childList:!0,subtree:!0});function d(a){const c={};return a.integrity&&(c.integrity=a.integrity),a.referrerPolicy&&(c.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?c.credentials="include":a.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function p(a){if(a.ep)return;a.ep=!0;const c=d(a);fetch(a.href,c)}})();const h=(s,r=14)=>`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.9 1.9 0 0 0-3.2 1.4v.2a2 2 0 0 1-4 0v-.2a1.9 1.9 0 0 0-3.2-1.4l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.9 1.9 0 0 0-1.4-3.2h-.2a2 2 0 0 1 0-4h.2a1.9 1.9 0 0 0 1.4-3.2l-.1-.1A2 2 0 0 1 6.2 1.7l.1.1A1.9 1.9 0 0 0 9.5.4V.2a2 2 0 0 1 4 0v.2a1.9 1.9 0 0 0 3.2 1.4l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.9 1.9 0 0 0 1.4 3.2h.2a2 2 0 0 1 0 4h-.2a1.9 1.9 0 0 0-1.5 3.2Z" transform="scale(.72) translate(4.7 4.7)"/>',search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/>',plus:'<path d="M12 5v14M5 12h14"/>',chevron:'<path d="m7 9 5 5 5-5"/>',edit:'<path d="m4 20 4.2-1 9.9-9.9a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z"/><path d="m13.8 7.2 3 3"/>',trash:'<path d="M4 7h16M9 11v5M15 11v5M6 7l1 13h10l1-13M9 7V4h6v3"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',arrow:'<path d="m9 18 6-6-6-6"/>',check:'<path d="m5 12 4 4L19 6"/>'}[s]||""}</svg>`,me="nimbus-commerce-platform-v1",ve="nimbus-commerce-project-v1",H="nimbus-commerce-projects-v1",X="nimbus-commerce-active-project-v1",M="nimbus-commerce-auth-v1",W={username:"admin",password:"Admin@123"};function Z(s,r){try{return JSON.parse(localStorage.getItem(s))??structuredClone(r)}catch{return structuredClone(r)}}function z(s,r){localStorage.setItem(s,JSON.stringify(r))}const he=[{id:"CR-1024",title:"Enterprise checkout approval redesign",meta:"Large CR · 2 sub-requests · Customer approval",tasks:"2 tasks",owner:"Minh Anh",priority:"High",status:"Client review",children:[{id:"SR-1024.1",title:"Define new approval roles and permissions",meta:"Sub-request of CR-1024",tasks:"2 tasks",owner:"Minh Anh",priority:"High",status:"In progress"},{id:"SR-1024.2",title:"Update checkout exception handling",meta:"Sub-request of CR-1024",tasks:"1 task",owner:"Thanh Trúc",priority:"Medium",status:"Done"}]},{id:"CR-1023",title:"Add audit trail for policy changes",meta:"Submitted Aug 15 · Security workspace",tasks:"3 tasks",owner:"Thanh Trúc",priority:"Medium",status:"Planning"},{id:"CR-1022",title:"Extend invoice export with tax breakdown",meta:"Submitted Aug 13 · Finance tools",tasks:"5 tasks",owner:"Quang Huy",priority:"High",status:"In review"},{id:"CR-1021",title:"Support custom roles for external partners",meta:"Submitted Aug 12 · Access controls",tasks:"0 tasks",owner:"Ngọc Linh",priority:"Low",status:"Approved"}];function fe(){const s=localStorage.getItem(H);if(s)try{return JSON.parse(s)}catch{}const r=Z(ve,{name:"Commerce Platform",client:"Atlas Retail",owner:"Bảo Phan",description:"Project workspace"}),d=Z(me,he),p=[{id:"p1",...r,requests:d}];return z(H,p),p}let g=fe(),T=localStorage.getItem(X)||g[0].id;g.some(s=>s.id===T)||(T=g[0].id);let m="All statuses";function y(){z(H,g)}function be(s){T=s,localStorage.setItem(X,s)}function ye(s){const r=s.requests.flatMap(d=>[d,...d.children||[]]);return{active:s.requests.length,completed:r.filter(d=>d.status==="Done"||d.status==="Approved").length}}function ge(){const s=document.querySelector("#app");let r=g.find(e=>e.id===T);s.innerHTML=`
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
          <h1 id="projectName">${i(r.name)}</h1>
          <p id="heroMeta">${i(r.description)} · ${i(r.client)} · <span id="heroCount"></span> active change requests</p>
        </div>
        <button class="outline-btn" id="editBtn">${h("settings",13)}<span>Edit project</span></button>
      </header>

      <section class="project-summary">
        <div class="summary-copy">
          <a href="#" class="crumb" id="crumb">Projects / ${i(r.name)}</a>
          <p id="summaryMeta">${i(r.client)} · Owner: ${i(r.owner)} · Updated today</p>
        </div>
        <div class="summary-metrics">
          <div><strong id="activeCount">04</strong><span>Active CRs</span></div>
          <div><strong id="completedCount">12</strong><span>Completed</span></div>
        </div>
      </section>

      <section class="workflow-card">
        <div class="workflow-intro"><strong>CR workflow</strong><span>From request to delivery</span></div>
        ${[["01","Nhập CR"],["02","Phân loại"],["03","Duyệt nội bộ"],["04","Duyệt khách hàng"],["05","Processing"],["06","Done"]].map(([e,t])=>`<div class="workflow-step"><strong>${e}</strong><span>${t}</span></div>`).join("")}
      </section>

      <section class="list-toolbar">
        <h2 id="listCount"></h2>
        <div class="toolbar-actions">
          <button class="outline-btn small" id="manageBtn">${h("settings",12)}<span>Manage types</span></button>
          <div class="status-filter-wrap">
            <button class="outline-btn small" id="statusBtn"><span id="statusLabel">All statuses</span>${h("chevron",12)}</button>
            <div class="status-menu hidden" id="statusMenu"></div>
          </div>
          <label class="search-box">${h("search",14)}<input id="search" type="search" placeholder="Search requests" autocomplete="off" /></label>
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
          <button type="button" class="primary-btn" id="openNewProjectBtn">${h("plus",12)}<span>New project</span></button>
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
            <button type="button" class="outline-btn small" id="editCrLinkAdd">${h("plus",12)}<span>Add</span></button>
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
`;const d=document.querySelector("#rows"),p=document.querySelector("#modal"),a=document.querySelector("#infoModal"),c=document.querySelector("#projectForm"),v=document.querySelector("#projectsListModal"),L=document.querySelector("#newProjectForm"),D=document.querySelector("#newProjectFormError"),P=document.querySelector("#newCrForm"),$=document.querySelector("#editCrForm"),N=document.querySelector("#confirmModal"),R=document.querySelector("#formError"),S=document.querySelector("#editFormError"),A=document.querySelector("#search"),E=document.querySelector("#statusMenu");let b=null;function i(e=""){return String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function ee(){return r.requests.flatMap(e=>[e,...e.children||[]])}function te(){return r.requests.length}function ne(){return ee().filter(e=>e.status==="Done"||e.status==="Approved").length}function re(e="CR"){const t=r.requests.reduce((n,o)=>Math.max(n,Number(String(o.id).replace(/^\D+/,""))||0),1024);return`${e}-${t+1}`}function oe(){return`Submitted Aug 18 · ${r.name}`}function se(e){return Array.isArray(e.links)?e.links.length:parseInt(e.tasks,10)||0}function I(e){const t=se(e);return`${t} ${t===1?"task":"tasks"}`}function ie(e,t){const n=q(e);if(!n)return;const o=n.item;o.links||(o.links=[]),o.links.push({id:`L${o.links.length+1}-${Date.now()}`,url:t}),o.tasks=I(o),y()}function ae(e,t){const n=q(e);if(!n)return;const o=n.item;o.links=(o.links||[]).filter(l=>l.id!==t),o.tasks=I(o),y()}function U(e){const t=e.links||[];document.querySelector("#editCrLinksList").innerHTML=t.length?t.map(n=>`<div class="link-row"><a href="${i(n.url)}" target="_blank" rel="noopener noreferrer">${i(n.url)}</a><button type="button" class="icon-btn" title="Remove" data-remove-link="${n.id}">${h("x",11)}</button></div>`).join(""):'<p class="links-empty">Chưa có task link nào.</p>',document.querySelector("#editCrTaskCount").textContent=I(e)}const _=["All statuses","New","Planning","In review","Client review","Approved","In progress","Done"],k=_.slice(1);function ce(e){const t=k.indexOf(e);return t===-1?0:t}function J(e){const t=ce(e),n=new Set(k.slice(0,t+1)),o=k[t+1];return o&&n.add(o),o==="Client review"&&k[t+2]&&n.add(k[t+2]),k.filter(l=>n.has(l))}function Y(e,t=!1){const n=e.description?` · ${i(e.description)}`:"";return`<div class="table data-row ${t?"child-row":""}" data-row-id="${e.id}">
    <div><a href="#" class="request-id" data-open-id="${e.id}">${i(e.id)}</a></div>
    <div class="request-copy"><strong>${i(e.title)}</strong><span>${i(e.meta||"")}${n}</span></div>
    <div class="tasks">${i(I(e))}</div>
    <div class="row-actions"><button class="add-sr" data-add-sr="${e.id}">${h("plus",12)}<span>Add SR</span></button><button class="icon-btn" title="Edit" data-edit="${e.id}">${h("edit",12)}</button><button class="icon-btn danger-icon" title="Delete" data-delete="${e.id}">${h("trash",12)}</button></div>
    <div class="owner">${i(e.owner)}</div>
    <div><span class="priority ${String(e.priority).toLowerCase()}">${i(e.priority)}</span></div>
    <div><span class="status ${String(e.status).toLowerCase().replaceAll(" ","-")}">${i(e.status)}</span></div>
  </div>`}function O(e,t){return!t||[e.id,e.title,e.owner,e.priority,e.status,e.description].join(" ").toLowerCase().includes(t)}function f(){const e=A.value.trim().toLowerCase();let t="";r.requests.forEach(n=>{const o=m==="All statuses"||n.status===m,l=(n.children||[]).some(C=>m==="All statuses"||C.status===m),x=o&&O(n,e),j=(n.children||[]).some(C=>l&&O(C,e));!x&&!j||(x&&(t+=Y(n)),(n.children||[]).forEach(C=>{(m==="All statuses"||C.status===m)&&O(C,e)&&(t+=Y(C,!0))}))}),d.innerHTML=t||'<div class="empty">No change requests found.</div>',G()}function G(){const e=te();document.querySelector("#heroCount").textContent=e,document.querySelector("#listCount").textContent=`${e} active CRs`,document.querySelector("#activeCount").textContent=String(e).padStart(2,"0"),document.querySelector("#completedCount").textContent=String(ne()).padStart(2,"0")}function F(){document.querySelector("#projectName").textContent=r.name,document.querySelector("#heroMeta").innerHTML=`${i(r.description)} · ${i(r.client)} · <span id="heroCount"></span> active change requests`,document.querySelector("#crumb").textContent=`Projects / ${r.name}`,document.querySelector("#summaryMeta").textContent=`${r.client} · Owner: ${r.owner} · Updated today`,G()}function w(e){[a,c,P,$,N,v,L].forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden"),p.classList.remove("hidden")}function u(){p.classList.add("hidden")}function le(e,t){[c,P,$,N,v,L].forEach(n=>n.classList.add("hidden")),document.querySelector("#modalTitle").textContent=e,document.querySelector("#modalText").textContent=t,a.classList.remove("hidden"),p.classList.remove("hidden")}function q(e){for(const t of r.requests){if(t.id===e)return{item:t,parent:null};for(const n of t.children||[])if(n.id===e)return{item:n,parent:t}}return null}function K(){document.querySelector("#projectsList").innerHTML=g.map(e=>{const t=ye(e),n=e.id===T;return`<button type="button" class="project-row ${n?"active":""}" data-select-project="${e.id}">
      <span class="project-row-name">${i(e.name)}${n?" <em>· Current</em>":""}</span>
      <span class="project-row-meta">${i(e.client)} · Owner: ${i(e.owner)}</span>
      <span class="project-row-count">${t.active} active CRs</span>
    </button>`}).join("")}function V(e){const t=g.find(n=>n.id===e);t&&(r=t,be(e),m="All statuses",document.querySelector("#statusLabel").textContent=m,A.value="",F(),f(),u())}function de(){P.reset(),document.querySelector("#crPriority").value="Medium",R.classList.add("hidden"),w(P),requestAnimationFrame(()=>document.querySelector("#crTitle").focus())}function B(e){const t=q(e);if(!t)return;const n=t.item;document.querySelector("#editCrId").value=n.id,document.querySelector("#editCrTitle").value=n.title,document.querySelector("#editCrDescription").value=n.description||"",document.querySelector("#editCrOwner").value=n.owner,document.querySelector("#editCrPriority").value=n.priority,document.querySelector("#editCrStatus").innerHTML=J(n.status).map(o=>`<option>${o}</option>`).join(""),document.querySelector("#editCrStatus").value=n.status,document.querySelector("#editCrLinkInput").value="",U(n),S.classList.add("hidden"),w($)}function ue(e){const t=q(e);t&&(b={id:e,parent:t.parent},document.querySelector("#confirmTitle").textContent=`Delete ${e}?`,document.querySelector("#confirmText").textContent=`This will permanently remove ${t.item.title}.`,w(N))}function pe(e){const t=q(e);if(!t)return;const n=t.parent||t.item;n.children||(n.children=[]);const l=`SR-${String(n.id).replace(/^\D+/,"")}.${n.children.length+1}`;n.children.push({id:l,title:"New sub-request",meta:`Sub-request of ${n.id}`,tasks:"0 tasks",links:[],owner:r.owner,priority:"Medium",status:"New"}),y(),f(),B(l)}A.addEventListener("input",f),document.querySelector("#newBtn").onclick=de,document.querySelector("#closeModal").onclick=u,document.querySelector("#modalOk").onclick=u,document.querySelector("#cancelNewCr").onclick=u,document.querySelector("#cancelProject").onclick=u,document.querySelector("#cancelEditCr").onclick=u,p.addEventListener("click",e=>{e.target===p&&u()});function Q(e){const t=q(e);t&&(U(t.item),document.querySelector("#editCrStatus").value=t.item.status,f())}document.querySelector("#editCrLinkAdd").onclick=()=>{const e=document.querySelector("#editCrId").value,t=document.querySelector("#editCrLinkInput");let n=t.value.trim();n&&(/^https?:\/\//i.test(n)||(n=`https://${n}`),ie(e,n),t.value="",Q(e))},$.addEventListener("click",e=>{const t=e.target.closest("[data-remove-link]");t&&(ae(document.querySelector("#editCrId").value,t.dataset.removeLink),Q(document.querySelector("#editCrId").value))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&u()}),document.querySelector("#projectsNavBtn").onclick=()=>{K(),w(v)},document.querySelector("#cancelProjectsList").onclick=u,v.addEventListener("click",e=>{const t=e.target.closest("[data-select-project]");t&&V(t.dataset.selectProject)}),document.querySelector("#openNewProjectBtn").onclick=()=>{L.reset(),D.classList.add("hidden"),w(L),requestAnimationFrame(()=>document.querySelector("#newProjectNameInput").focus())},document.querySelector("#cancelNewProject").onclick=()=>{K(),w(v)},L.addEventListener("submit",e=>{e.preventDefault();const t=document.querySelector("#newProjectNameInput").value.trim(),n=document.querySelector("#newProjectClientInput").value.trim(),o=document.querySelector("#newProjectOwnerInput").value.trim();if(!t||!n||!o){D.textContent="Vui lòng nhập Project name, Client và Owner.",D.classList.remove("hidden");return}const l={id:`p${Date.now()}`,name:t,client:n,owner:o,description:document.querySelector("#newProjectDescriptionInput").value.trim()||"Project workspace",requests:[]};g.push(l),y(),V(l.id)}),document.querySelector("#editBtn").onclick=()=>{document.querySelector("#projectNameInput").value=r.name,document.querySelector("#projectClientInput").value=r.client,document.querySelector("#projectOwnerInput").value=r.owner,document.querySelector("#projectDescriptionInput").value=r.description,w(c)},document.querySelector("#manageBtn").onclick=()=>le("Manage types","Request types are currently represented by the workflow above. This screen is ready to connect to a backend type manager."),document.querySelector("#statusBtn").onclick=()=>E.classList.toggle("hidden"),E.innerHTML=_.map(e=>`<button class="status-option" data-status="${e}">${e}</button>`).join(""),E.addEventListener("click",e=>{const t=e.target.closest("[data-status]");t&&(m=t.dataset.status,document.querySelector("#statusLabel").textContent=m,E.classList.add("hidden"),f())}),document.addEventListener("click",e=>{const t=e.target.closest("[data-edit]");if(t)return B(t.dataset.edit);const n=e.target.closest("[data-delete]");if(n)return ue(n.dataset.delete);const o=e.target.closest("[data-add-sr]");if(o)return pe(o.dataset.addSr);const l=e.target.closest("[data-open-id]");if(l)return e.preventDefault(),B(l.dataset.openId);e.target.closest(".status-filter-wrap")||E.classList.add("hidden")}),c.addEventListener("submit",e=>{e.preventDefault(),r.name=document.querySelector("#projectNameInput").value.trim(),r.client=document.querySelector("#projectClientInput").value.trim(),r.owner=document.querySelector("#projectOwnerInput").value.trim(),r.description=document.querySelector("#projectDescriptionInput").value.trim()||"Project workspace",y(),F(),u()}),P.addEventListener("submit",e=>{e.preventDefault();const t=document.querySelector("#crTitle").value.trim(),n=document.querySelector("#crOwner").value.trim();if(!t||!n){R.textContent="Vui lòng nhập Request title và Owner.",R.classList.remove("hidden");return}r.requests.unshift({id:re(),title:t,description:document.querySelector("#crDescription").value.trim(),meta:oe(),tasks:"0 tasks",links:[],owner:n,priority:document.querySelector("#crPriority").value,status:"New",children:[]}),y(),A.value="",m="All statuses",document.querySelector("#statusLabel").textContent=m,f(),u()}),$.addEventListener("submit",e=>{e.preventDefault();const t=document.querySelector("#editCrId").value,n=q(t);if(!n)return;const o=n.item,l=document.querySelector("#editCrTitle").value.trim(),x=document.querySelector("#editCrOwner").value.trim();if(!l||!x){S.textContent="Vui lòng nhập Request title và Owner.",S.classList.remove("hidden");return}const j=document.querySelector("#editCrStatus").value;if(j!==o.status){if(!J(o.status).includes(j)){S.textContent="Vui lòng cập nhật trạng thái theo đúng thứ tự quy trình (có thể bỏ qua bước Duyệt khách hàng).",S.classList.remove("hidden");return}if(j==="In progress"&&!(o.links||[]).length){S.textContent="Cần thêm ít nhất 1 task link trước khi chuyển sang Processing.",S.classList.remove("hidden");return}}Object.assign(o,{title:l,description:document.querySelector("#editCrDescription").value.trim(),owner:x,priority:document.querySelector("#editCrPriority").value,status:j}),o.tasks=I(o),y(),f(),u()}),document.querySelector("#cancelDelete").onclick=u,document.querySelector("#confirmDelete").onclick=()=>{b&&(b.parent?b.parent.children=(b.parent.children||[]).filter(e=>e.id!==b.id):r.requests=r.requests.filter(e=>e.id!==b.id),y(),b=null,f(),u())},document.querySelector("#logoutBtn").onclick=()=>{localStorage.removeItem(M),sessionStorage.removeItem(M),location.reload()},F(),f()}function Se(){return localStorage.getItem(M)==="1"||sessionStorage.getItem(M)==="1"}function we(){const s=document.querySelector("#app");s.innerHTML=`
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
  `;const r=document.querySelector("#loginForm"),d=document.querySelector("#loginError");r.addEventListener("submit",p=>{p.preventDefault();const a=document.querySelector("#loginUsername").value.trim(),c=document.querySelector("#loginPassword").value,v=document.querySelector("#loginRemember").checked;a===W.username&&c===W.password?((v?localStorage:sessionStorage).setItem(M,"1"),location.reload()):d.classList.remove("hidden")})}Se()?ge():we();
