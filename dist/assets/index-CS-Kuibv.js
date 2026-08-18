(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))g(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&g(p)}).observe(document,{childList:!0,subtree:!0});function v(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function g(o){if(o.ep)return;o.ep=!0;const s=v(o);fetch(o.href,s)}})();const f=(m,c=14)=>`<svg width="${c}" height="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.9 1.9 0 0 0-3.2 1.4v.2a2 2 0 0 1-4 0v-.2a1.9 1.9 0 0 0-3.2-1.4l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.9 1.9 0 0 0-1.4-3.2h-.2a2 2 0 0 1 0-4h.2a1.9 1.9 0 0 0 1.4-3.2l-.1-.1A2 2 0 0 1 6.2 1.7l.1.1A1.9 1.9 0 0 0 9.5.4V.2a2 2 0 0 1 4 0v.2a1.9 1.9 0 0 0 3.2 1.4l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.9 1.9 0 0 0 1.4 3.2h.2a2 2 0 0 1 0 4h-.2a1.9 1.9 0 0 0-1.5 3.2Z" transform="scale(.72) translate(4.7 4.7)"/>',search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/>',plus:'<path d="M12 5v14M5 12h14"/>',chevron:'<path d="m7 9 5 5 5-5"/>',edit:'<path d="m4 20 4.2-1 9.9-9.9a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z"/><path d="m13.8 7.2 3 3"/>',trash:'<path d="M4 7h16M9 11v5M15 11v5M6 7l1 13h10l1-13M9 7V4h6v3"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',arrow:'<path d="m9 18 6-6-6-6"/>',check:'<path d="m5 12 4 4L19 6"/>'}[m]||""}</svg>`,q="nimbus-commerce-platform-v1",U="nimbus-commerce-project-v1",M="nimbus-commerce-auth-v1",B={username:"admin",password:"Admin@123"};function G(m,c){try{return JSON.parse(localStorage.getItem(m))??structuredClone(c)}catch{return structuredClone(c)}}function k(m,c){localStorage.setItem(m,JSON.stringify(c))}const re=[{id:"CR-1024",title:"Enterprise checkout approval redesign",meta:"Large CR · 2 sub-requests · Customer approval",tasks:"2 tasks",owner:"Minh Anh",priority:"High",status:"Client review",children:[{id:"SR-1024.1",title:"Define new approval roles and permissions",meta:"Sub-request of CR-1024",tasks:"2 tasks",owner:"Minh Anh",priority:"High",status:"In progress"},{id:"SR-1024.2",title:"Update checkout exception handling",meta:"Sub-request of CR-1024",tasks:"1 task",owner:"Thanh Trúc",priority:"Medium",status:"Done"}]},{id:"CR-1023",title:"Add audit trail for policy changes",meta:"Submitted Aug 15 · Security workspace",tasks:"3 tasks",owner:"Thanh Trúc",priority:"Medium",status:"Planning"},{id:"CR-1022",title:"Extend invoice export with tax breakdown",meta:"Submitted Aug 13 · Finance tools",tasks:"5 tasks",owner:"Quang Huy",priority:"High",status:"In review"},{id:"CR-1021",title:"Support custom roles for external partners",meta:"Submitted Aug 12 · Access controls",tasks:"0 tasks",owner:"Ngọc Linh",priority:"Low",status:"Approved"}];let l=G(q,re),i=G(U,{name:"Commerce Platform",client:"Atlas Retail",owner:"Bảo Phan",description:"Project workspace"}),h="All statuses";function oe(){const m=document.querySelector("#app");m.innerHTML=`
  <div class="app-shell">
    <aside class="sidebar">
      <div class="sidebar-brand">NIMBUS</div>
      <nav class="side-nav" aria-label="Main navigation">
        <button class="nav-link active">Change Requests</button>
        <button class="nav-link">Projects</button>
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
          <h1 id="projectName">${a(i.name)}</h1>
          <p id="heroMeta">${a(i.description)} · ${a(i.client)} · <span id="heroCount"></span> active change requests</p>
        </div>
        <button class="outline-btn" id="editBtn">${f("settings",13)}<span>Edit project</span></button>
      </header>

      <section class="project-summary">
        <div class="summary-copy">
          <a href="#" class="crumb" id="crumb">Projects / ${a(i.name)}</a>
          <p id="summaryMeta">${a(i.client)} · Owner: ${a(i.owner)} · Updated today</p>
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
          <button class="outline-btn small" id="manageBtn">${f("settings",12)}<span>Manage types</span></button>
          <div class="status-filter-wrap">
            <button class="outline-btn small" id="statusBtn"><span id="statusLabel">All statuses</span>${f("chevron",12)}</button>
            <div class="status-menu hidden" id="statusMenu"></div>
          </div>
          <label class="search-box">${f("search",14)}<input id="search" type="search" placeholder="Search requests" autocomplete="off" /></label>
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
        <div class="task-links">
          <span>Task links · <strong id="editCrTaskCount">0 tasks</strong></span>
          <div class="task-links-add">
            <input id="editCrLinkInput" type="url" placeholder="Dán link task (Jira, Notion, Google Doc...)" />
            <button type="button" class="outline-btn small" id="editCrLinkAdd">${f("plus",12)}<span>Add</span></button>
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
`;const c=document.querySelector("#rows"),v=document.querySelector("#modal"),g=document.querySelector("#infoModal"),o=document.querySelector("#projectForm"),s=document.querySelector("#newCrForm"),p=document.querySelector("#editCrForm"),x=document.querySelector("#confirmModal"),T=document.querySelector("#formError"),I=document.querySelector("#editFormError"),A=document.querySelector("#search"),w=document.querySelector("#statusMenu");let b=null;function a(e=""){return String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function J(){return l.flatMap(e=>[e,...e.children||[]])}function K(){return l.length}function _(){return J().filter(e=>e.status==="Done"||e.status==="Approved").length}function Q(e="CR"){const t=l.reduce((n,r)=>Math.max(n,Number(String(r.id).replace(/^\D+/,""))||0),1024);return`${e}-${t+1}`}function V(){return`Submitted Aug 18 · ${i.name}`}function Y(e){return Array.isArray(e.links)?e.links.length:parseInt(e.tasks,10)||0}function L(e){const t=Y(e);return`${t} ${t===1?"task":"tasks"}`}function Z(e,t){const n=S(e);if(!n)return;const r=n.item;r.links||(r.links=[]),r.links.push({id:`L${r.links.length+1}-${Date.now()}`,url:t}),r.tasks=L(r),r.status==="New"&&(r.status="In progress"),k(q,l)}function W(e,t){const n=S(e);if(!n)return;const r=n.item;r.links=(r.links||[]).filter(u=>u.id!==t),r.tasks=L(r),k(q,l)}function j(e){const t=e.links||[];document.querySelector("#editCrLinksList").innerHTML=t.length?t.map(n=>`<div class="link-row"><a href="${a(n.url)}" target="_blank" rel="noopener noreferrer">${a(n.url)}</a><button type="button" class="icon-btn" title="Remove" data-remove-link="${n.id}">${f("x",11)}</button></div>`).join(""):'<p class="links-empty">Chưa có task link nào.</p>',document.querySelector("#editCrTaskCount").textContent=L(e)}const N=["All statuses","New","Planning","In progress","In review","Client review","Approved","Done"];function O(e,t=!1){const n=e.description?` · ${a(e.description)}`:"";return`<div class="table data-row ${t?"child-row":""}" data-row-id="${e.id}">
    <div><a href="#" class="request-id" data-open-id="${e.id}">${a(e.id)}</a></div>
    <div class="request-copy"><strong>${a(e.title)}</strong><span>${a(e.meta||"")}${n}</span></div>
    <div class="tasks">${a(L(e))}</div>
    <div class="row-actions"><button class="add-sr" data-add-sr="${e.id}">${f("plus",12)}<span>Add SR</span></button><button class="icon-btn" title="Edit" data-edit="${e.id}">${f("edit",12)}</button><button class="icon-btn danger-icon" title="Delete" data-delete="${e.id}">${f("trash",12)}</button></div>
    <div class="owner">${a(e.owner)}</div>
    <div><span class="priority ${String(e.priority).toLowerCase()}">${a(e.priority)}</span></div>
    <div><span class="status ${String(e.status).toLowerCase().replaceAll(" ","-")}">${a(e.status)}</span></div>
  </div>`}function R(e,t){return!t||[e.id,e.title,e.owner,e.priority,e.status,e.description].join(" ").toLowerCase().includes(t)}function y(){const e=A.value.trim().toLowerCase();let t="";l.forEach(n=>{const r=h==="All statuses"||n.status===h,u=(n.children||[]).some(C=>h==="All statuses"||C.status===h),$=r&&R(n,e),ne=(n.children||[]).some(C=>u&&R(C,e));!$&&!ne||($&&(t+=O(n)),(n.children||[]).forEach(C=>{(h==="All statuses"||C.status===h)&&R(C,e)&&(t+=O(C,!0))}))}),c.innerHTML=t||'<div class="empty">No change requests found.</div>',P()}function P(){const e=K();document.querySelector("#heroCount").textContent=e,document.querySelector("#listCount").textContent=`${e} active CRs`,document.querySelector("#activeCount").textContent=String(e).padStart(2,"0"),document.querySelector("#completedCount").textContent=String(_()).padStart(2,"0")}function F(){document.querySelector("#projectName").textContent=i.name,document.querySelector("#heroMeta").innerHTML=`${a(i.description)} · ${a(i.client)} · <span id="heroCount"></span> active change requests`,document.querySelector("#crumb").textContent=`Projects / ${i.name}`,document.querySelector("#summaryMeta").textContent=`${i.client} · Owner: ${i.owner} · Updated today`,P()}function E(e){[g,o,s,p,x].forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden"),v.classList.remove("hidden")}function d(){v.classList.add("hidden")}function X(e,t){[o,s,p,x].forEach(n=>n.classList.add("hidden")),document.querySelector("#modalTitle").textContent=e,document.querySelector("#modalText").textContent=t,g.classList.remove("hidden"),v.classList.remove("hidden")}function S(e){for(const t of l){if(t.id===e)return{item:t,parent:null};for(const n of t.children||[])if(n.id===e)return{item:n,parent:t}}return null}function z(){s.reset(),document.querySelector("#crPriority").value="Medium",T.classList.add("hidden"),E(s),requestAnimationFrame(()=>document.querySelector("#crTitle").focus())}function D(e){const t=S(e);if(!t)return;const n=t.item;document.querySelector("#editCrId").value=n.id,document.querySelector("#editCrTitle").value=n.title,document.querySelector("#editCrDescription").value=n.description||"",document.querySelector("#editCrOwner").value=n.owner,document.querySelector("#editCrPriority").value=n.priority,document.querySelector("#editCrStatus").innerHTML=N.slice(1).map(r=>`<option>${r}</option>`).join(""),document.querySelector("#editCrStatus").value=n.status,document.querySelector("#editCrLinkInput").value="",j(n),I.classList.add("hidden"),E(p)}function ee(e){const t=S(e);t&&(b={id:e,parent:t.parent},document.querySelector("#confirmTitle").textContent=`Delete ${e}?`,document.querySelector("#confirmText").textContent=`This will permanently remove ${t.item.title}.`,E(x))}function te(e){const t=S(e);if(!t)return;const n=t.parent||t.item;n.children||(n.children=[]);const u=`SR-${String(n.id).replace(/^\D+/,"")}.${n.children.length+1}`;n.children.push({id:u,title:"New sub-request",meta:`Sub-request of ${n.id}`,tasks:"0 tasks",links:[],owner:i.owner,priority:"Medium",status:"New"}),k(q,l),y(),D(u)}A.addEventListener("input",y),document.querySelector("#newBtn").onclick=z,document.querySelector("#closeModal").onclick=d,document.querySelector("#modalOk").onclick=d,document.querySelector("#cancelNewCr").onclick=d,document.querySelector("#cancelProject").onclick=d,document.querySelector("#cancelEditCr").onclick=d,v.addEventListener("click",e=>{e.target===v&&d()});function H(e){const t=S(e);t&&(j(t.item),document.querySelector("#editCrStatus").value=t.item.status,y())}document.querySelector("#editCrLinkAdd").onclick=()=>{const e=document.querySelector("#editCrId").value,t=document.querySelector("#editCrLinkInput");let n=t.value.trim();n&&(/^https?:\/\//i.test(n)||(n=`https://${n}`),Z(e,n),t.value="",H(e))},p.addEventListener("click",e=>{const t=e.target.closest("[data-remove-link]");t&&(W(document.querySelector("#editCrId").value,t.dataset.removeLink),H(document.querySelector("#editCrId").value))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&d()}),document.querySelector("#editBtn").onclick=()=>{document.querySelector("#projectNameInput").value=i.name,document.querySelector("#projectClientInput").value=i.client,document.querySelector("#projectOwnerInput").value=i.owner,document.querySelector("#projectDescriptionInput").value=i.description,E(o)},document.querySelector("#manageBtn").onclick=()=>X("Manage types","Request types are currently represented by the workflow above. This screen is ready to connect to a backend type manager."),document.querySelector("#statusBtn").onclick=()=>w.classList.toggle("hidden"),w.innerHTML=N.map(e=>`<button class="status-option" data-status="${e}">${e}</button>`).join(""),w.addEventListener("click",e=>{const t=e.target.closest("[data-status]");t&&(h=t.dataset.status,document.querySelector("#statusLabel").textContent=h,w.classList.add("hidden"),y())}),document.addEventListener("click",e=>{const t=e.target.closest("[data-edit]");if(t)return D(t.dataset.edit);const n=e.target.closest("[data-delete]");if(n)return ee(n.dataset.delete);const r=e.target.closest("[data-add-sr]");if(r)return te(r.dataset.addSr);const u=e.target.closest("[data-open-id]");if(u)return e.preventDefault(),D(u.dataset.openId);e.target.closest(".status-filter-wrap")||w.classList.add("hidden")}),o.addEventListener("submit",e=>{e.preventDefault(),i={name:document.querySelector("#projectNameInput").value.trim(),client:document.querySelector("#projectClientInput").value.trim(),owner:document.querySelector("#projectOwnerInput").value.trim(),description:document.querySelector("#projectDescriptionInput").value.trim()||"Project workspace"},k(U,i),F(),d()}),s.addEventListener("submit",e=>{e.preventDefault();const t=document.querySelector("#crTitle").value.trim(),n=document.querySelector("#crOwner").value.trim();if(!t||!n){T.textContent="Vui lòng nhập Request title và Owner.",T.classList.remove("hidden");return}l.unshift({id:Q(),title:t,description:document.querySelector("#crDescription").value.trim(),meta:V(),tasks:"0 tasks",links:[],owner:n,priority:document.querySelector("#crPriority").value,status:"New",children:[]}),k(q,l),A.value="",h="All statuses",document.querySelector("#statusLabel").textContent=h,y(),d()}),p.addEventListener("submit",e=>{e.preventDefault();const t=document.querySelector("#editCrId").value,n=S(t);if(!n)return;const r=n.item,u=document.querySelector("#editCrTitle").value.trim(),$=document.querySelector("#editCrOwner").value.trim();if(!u||!$){I.textContent="Vui lòng nhập Request title và Owner.",I.classList.remove("hidden");return}Object.assign(r,{title:u,description:document.querySelector("#editCrDescription").value.trim(),owner:$,priority:document.querySelector("#editCrPriority").value,status:document.querySelector("#editCrStatus").value}),r.tasks=L(r),k(q,l),y(),d()}),document.querySelector("#cancelDelete").onclick=d,document.querySelector("#confirmDelete").onclick=()=>{b&&(b.parent?b.parent.children=(b.parent.children||[]).filter(e=>e.id!==b.id):l=l.filter(e=>e.id!==b.id),k(q,l),b=null,y(),d())},document.querySelector("#logoutBtn").onclick=()=>{localStorage.removeItem(M),sessionStorage.removeItem(M),location.reload()},F(),y()}function ie(){return localStorage.getItem(M)==="1"||sessionStorage.getItem(M)==="1"}function se(){const m=document.querySelector("#app");m.innerHTML=`
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
  `;const c=document.querySelector("#loginForm"),v=document.querySelector("#loginError");c.addEventListener("submit",g=>{g.preventDefault();const o=document.querySelector("#loginUsername").value.trim(),s=document.querySelector("#loginPassword").value,p=document.querySelector("#loginRemember").checked;o===B.username&&s===B.password?((p?localStorage:sessionStorage).setItem(M,"1"),location.reload()):v.classList.remove("hidden")})}ie()?oe():se();
