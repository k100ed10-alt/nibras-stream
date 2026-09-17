const GRADES = [
  { id: 5, name: "الصف الخامس", cycle: "الحلقة الثانية" },
  { id: 6, name: "الصف السادس", cycle: "الحلقة الثانية" },
  { id: 7, name: "الصف السابع", cycle: "الحلقة الثانية" },
  { id: 8, name: "الصف الثامن", cycle: "الحلقة الثانية" },
  { id: 9, name: "الصف التاسع", cycle: "الحلقة الثانية" },
  { id: 10, name: "الصف العاشر", cycle: "الحلقة الثانية" },
  { id: 11, name: "الصف الحادي عشر", cycle: "ما بعد الأساسي" },
  { id: 12, name: "الصف الثاني عشر", cycle: "ما بعد الأساسي" }
];
const CORE_5_10 = ["التربية الإسلامية","اللغة العربية","اللغة الإنجليزية","الرياضيات","العلوم","الدراسات الاجتماعية","تقنية المعلومات","المهارات الحياتية","الرياضة المدرسية"];
const CORE_11_12 = ["التربية الإسلامية","اللغة العربية","اللغة الإنجليزية","الدراسات الاجتماعية","الرياضيات الأساسية","الرياضيات المتقدمة"];
const ELECTIVES_11_12 = ["الفيزياء","الكيمياء","الأحياء","العلوم البيئية","تقنية المعلومات","مهارات اللغة الإنجليزية","اللغة الفرنسية","الجغرافيا الاقتصادية","التاريخ (الحضارة الإسلامية)","الفنون التشكيلية"];
function subjectsFor(grade){ return Number(grade)>=11 ? [...CORE_11_12,...ELECTIVES_11_12] : CORE_5_10; }
function gradeMeta(id){ return GRADES.find(g=>g.id===Number(id)) || GRADES[3]; }
const SEED_LESSONS = [
  {id:"l1",grade:8,subject:"الرياضيات",title:"المعادلات الخطية",teacher:"أ. سالم الحارثي",day:"الخميس",time:"18:00",status:"live"},
  {id:"l2",grade:8,subject:"اللغة العربية",title:"تحليل النص الأدبي",teacher:"أ. مريم البوسعيدي",day:"الأحد",time:"17:00",status:"ready"},
  {id:"l3",grade:8,subject:"العلوم",title:"الطاقة الحرارية",teacher:"أ. يوسف الشكيلي",day:"الثلاثاء",time:"17:30",status:"upcoming"},
  {id:"l4",grade:12,subject:"الفيزياء",title:"الحركة الدائرية",teacher:"أ. حمد الراشدي",day:"الاثنين",time:"18:30",status:"upcoming"}
];
const SEED_TASKS = [
  {id:"a1",grade:8,subject:"الرياضيات",title:"تدريب المعادلات الخطية",due:"غداً 11:00 م",status:"open"},
  {id:"a2",grade:8,subject:"اللغة العربية",title:"تحليل قصيدة",due:"بعد يومين",status:"open"}
];
function storeGet(k,f){ try{ const r=localStorage.getItem(k); return r?JSON.parse(r):f;}catch{return f;} }
function storeSet(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function currentUser(){ return storeGet("nibras_user",{role:"guest",name:"زائر",grade:8}); }
function setUser(u){ storeSet("nibras_user",u); }
function currentGrade(){ const q=new URLSearchParams(location.search).get("grade"); if(q){ storeSet("nibras_grade",Number(q)); return Number(q);} return Number(storeGet("nibras_grade", currentUser().grade||8)); }
function lessons(){ return [...SEED_LESSONS, ...storeGet("nibras_lessons",[])]; }
function tasks(){ return [...SEED_TASKS, ...storeGet("nibras_tasks",[])]; }
function toast(msg){ const t=document.createElement("div"); t.textContent=msg; t.style.cssText="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#071426;color:#fff;padding:12px 18px;border-radius:14px;z-index:99;font-weight:700"; document.body.appendChild(t); setTimeout(()=>t.remove(),2400); }
function pickOption(el){ el.parentElement.querySelectorAll(".opt").forEach(o=>o.classList.remove("picked")); el.classList.add("picked"); }
function submitQuiz(){ const picked=document.querySelectorAll(".opt.picked").length; const need=document.querySelectorAll(".q-card .options").length; if(picked<need){ toast("جاوب على أسئلة الاختيار أولاً"); return;} toast("تم تسليم الواجب. الدرجة المبدئية: 85%"); const r=document.getElementById("result"); if(r) r.style.display="block"; }
function goLive(){ const b=document.querySelector(".live-now"); if(b) b.textContent="● البث مباشر الآن"; toast("بدأ البث المباشر للصف "+gradeMeta(currentGrade()).name); }
function scheduleLesson(){ const extra=storeGet("nibras_lessons",[]); extra.unshift({id:"x"+Date.now(), grade:Number(document.getElementById("lesson-grade")?.value||currentGrade()), subject:document.getElementById("lesson-subject")?.value||"الرياضيات", title:document.getElementById("lesson-title")?.value||"حصة أسبوعية", teacher:currentUser().name||"المعلم", day:"هذا الأسبوع", time:"18:00", status:"upcoming"}); storeSet("nibras_lessons",extra); toast("تم جدولة الحصة"); }
function createAssignment(){ const extra=storeGet("nibras_tasks",[]); extra.unshift({id:"t"+Date.now(), grade:Number(document.getElementById("lesson-grade")?.value||currentGrade()), subject:document.getElementById("lesson-subject")?.value||"عام", title:document.getElementById("task-title")?.value||"واجب تفاعلي", due:"خلال 48 ساعة", status:"open"}); storeSet("nibras_tasks",extra); toast("تم إنشاء الواجب وإرساله للطلاب"); }
function switchTab(name,btn){ document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active")); btn.classList.add("active"); document.querySelectorAll("[data-pane]").forEach(p=>{ p.style.display=p.getAttribute("data-pane")===name?"flex":"none"; }); }
function loginDemo(role){ const names={student:{role:"student",name:"أحمد الكندي",grade:8},teacher:{role:"teacher",name:"أ. سالم الحارثي",grade:8},parent:{role:"parent",name:"ولي أمر أحمد",grade:8}}; setUser(names[role]); location.href={student:"student.html",teacher:"teacher.html",parent:"parent.html"}[role]; }
function fillSelect(id,items,selected){ const el=document.getElementById(id); if(!el) return; el.innerHTML=items.map(it=>{ const val=typeof it==="object"?it.id:it; const label=typeof it==="object"?it.name:it; return `<option value="${val}" ${String(val)===String(selected)?"selected":""}>${label}</option>`; }).join(""); }
function renderLessons(targetId,grade){ const box=document.getElementById(targetId); if(!box) return; const list=lessons().filter(l=>l.grade===Number(grade)); box.innerHTML=list.length?list.map(l=>`<div class="lesson"><div class="thumb">${l.subject.slice(0,4)}</div><div style="flex:1"><strong>${l.subject} · ${l.title}</strong><div style="color:#64748b;font-size:13px">${l.day} ${l.time} · ${l.teacher}</div></div><a class="chip ${l.status==="live"?"live":""}" href="${l.status==="upcoming"?"studio.html":"watch.html"}?grade=${l.grade}">${l.status==="live"?"LIVE":l.status==="ready"?"مشاهدة":"قادمة"}</a></div>`).join(""):"<p style='color:#64748b'>لا توجد حصص مجدولة.</p>"; }
function renderTasks(targetId,grade){ const box=document.getElementById(targetId); if(!box) return; const list=tasks().filter(t=>t.grade===Number(grade)); box.innerHTML=list.length?list.map(t=>`<div class="lesson"><div><strong>${t.title}</strong><div style="color:#64748b;font-size:13px">${t.subject} · ${t.due}</div></div><a class="chip due" href="assignments.html?grade=${t.grade}">حل الآن</a></div>`).join(""):"<p style='color:#64748b'>لا توجد واجبات مفتوحة.</p>"; }
function renderGradeGrid(targetId){ const box=document.getElementById(targetId); if(!box) return; const nums={5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",10:"١٠",11:"١١",12:"١٢"}; box.innerHTML=GRADES.map(g=>`<a class="grade" href="student.html?grade=${g.id}"><div class="num">${nums[g.id]}</div><div>${g.name}</div><small>${g.cycle}</small></a>`).join(""); }
function renderSubjects(targetId,grade){ const box=document.getElementById(targetId); if(!box) return; const electives=new Set(ELECTIVES_11_12); box.innerHTML=subjectsFor(grade).map(s=>`<div class="subject-pill ${electives.has(s)?"elective":""}">${s}${electives.has(s)?"<small>اختيارية</small>":""}</div>`).join(""); }
document.addEventListener("DOMContentLoaded",()=>{
  const clock=document.getElementById("clock"); if(clock){ const tick=()=>clock.textContent=new Date().toLocaleTimeString("ar-OM",{hour:"2-digit",minute:"2-digit"}); tick(); setInterval(tick,1000); }
  const g=currentGrade(); const meta=gradeMeta(g);
  document.querySelectorAll("[data-grade-name]").forEach(el=>el.textContent=meta.name);
  document.querySelectorAll("[data-cycle]").forEach(el=>el.textContent=meta.cycle);
  document.querySelectorAll("[data-user-name]").forEach(el=>el.textContent=currentUser().name);
  renderGradeGrid("grade-grid"); renderLessons("lesson-list",g); renderTasks("task-list",g); renderSubjects("subject-list",g);
  fillSelect("lesson-grade",GRADES,g);
  if(document.getElementById("lesson-subject")) fillSelect("lesson-subject",subjectsFor(g),subjectsFor(g)[3]);
  document.getElementById("lesson-grade")?.addEventListener("change",e=>fillSelect("lesson-subject",subjectsFor(e.target.value)));
});
