const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

window.addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("loader-hide"),1500));

const canvas=$("#space"),ctx=canvas.getContext("2d");
let W,H,stars=[];
function resize(){W=canvas.width=innerWidth*devicePixelRatio;H=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";stars=Array.from({length:Math.min(170,Math.floor(innerWidth/7))},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*2+.3,r:Math.random()*1.5+.2,s:Math.random()*.35+.05}))}
resize();addEventListener("resize",resize);
function space(){ctx.clearRect(0,0,W,H);for(const p of stars){p.y+=p.s*devicePixelRatio;if(p.y>H)p.y=0;ctx.globalAlpha=.18+p.z*.2;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.z,0,Math.PI*2);ctx.fill()}requestAnimationFrame(space)}space();

document.addEventListener("pointermove",e=>{document.documentElement.style.setProperty("--mx",e.clientX+"px");document.documentElement.style.setProperty("--my",e.clientY+"px");$(".cursor-dot").style.transform=`translate(${e.clientX}px,${e.clientY}px)`;$(" .cursor-ring")?.style.setProperty("transform",`translate(${e.clientX-18}px,${e.clientY-18}px)`)});
document.querySelector(".cursor-ring")?.style.setProperty("transform","translate(-18px,-18px)");

addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;$(".scroll-progress").style.width=(scrollY/h*100)+"%";$(".nav").classList.toggle("scrolled",scrollY>20)});

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
$$(".reveal").forEach(x=>observer.observe(x));

let words=["AI systems","scalable APIs","data pipelines","GenAI tools","ML models","cloud services"];
let wi=0;setInterval(()=>{$("#rotatingWord").textContent=words[wi++%words.length]},1300);

$("#menuBtn").onclick=()=>$(".nav").classList.toggle("open");
$("#themeBtn").onclick=()=>{document.body.classList.toggle("warm");document.documentElement.style.setProperty("--a",document.body.classList.contains("warm")?"#f97316":"#8b5cf6");document.documentElement.style.setProperty("--b",document.body.classList.contains("warm")?"#eab308":"#06b6d4")};

$$(".magnetic").forEach(el=>el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`}));
$$(".magnetic").forEach(el=>el.addEventListener("mouseleave",()=>el.style.transform=""));

const stackData={
dev:["DEV","Full-stack development, APIs and software engineering fundamentals.",["Python","92%"],["Java","80%"],["React / HTML / CSS","78%"],["REST APIs / Postman","85%"]],
ai:["AI / ML","Deep learning, multimodal systems and GenAI workflows.",["PyTorch","88%"],["Python","92%"],["RAG / LLMs","78%"],["Computer Vision","82%"]],
data:["DATA","Building pipelines and working with distributed data systems.",["PySpark","86%"],["Spark SQL","82%"],["Databricks","80%"],["Delta Lake","78%"]],
security:["SECURITY","Security-first thinking across networks, systems and applications.",["Linux","88%"],["Nmap","84%"],["Web Security","80%"],["Wireshark","76%"]]
};
$$(".stack-tabs button").forEach(btn=>btn.onclick=()=>{ $$(".stack-tabs button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");let d=stackData[btn.dataset.stack];$("#stackPanel").innerHTML=`<h3>${d[0]}</h3><p>${d[1]}</p><div class="skill-bars">${d.slice(2).map(x=>`<label>${x[0]} <i style="--v:${x[1]}"></i></label>`).join("")}</div>`});

const projects={
skin:["AI + HEALTH","Multimodal Skin Cancer Diagnosis","A multimodal deep learning framework combining dermoscopic image features from CNNs with clinical symptom data through late fusion, with Grad-CAM and SHAP for explainability.",["PyTorch","CNN","MLP","Grad-CAM","SHAP"],"https://github.com/YOUR_USERNAME/multimodal-skin-cancer-diagnosis"],
rag:["GEN AI","Medical Prescription RAG Assistant","An OCR-to-RAG workflow for handwritten prescriptions: image preprocessing, text extraction, retrieval over a FAISS knowledge base and grounded responses.",["Tesseract OCR","LangChain","RAG","FAISS","OpenAI API"],"https://github.com/YOUR_USERNAME/medical-prescription-rag-chatbot"],
retina:["DEEP LEARNING","Diabetic Retinopathy Detection","A ResNet-50 computer vision pipeline with preprocessing, augmentation and Grad-CAM to improve the interpretability of retinal disease predictions.",["PyTorch","ResNet-50","OpenCV","Grad-CAM"],"https://github.com/YOUR_USERNAME/diabetic-retinopathy-detection"],
foodhack:["HACKATHON · MERN","Food Delivery System","Built a full-stack food delivery platform during a hackathon — features include real-time order tracking, restaurant management dashboard, JWT-based user authentication and a responsive React frontend.",["MongoDB","Express.js","React","Node.js","JWT","REST API"],"https://github.com/YOUR_USERNAME/food-delivery-mern"]
};
$$(".project-card").forEach(card=>card.onclick=()=>{let p=projects[card.dataset.project];$("#modalKicker").textContent=p[0];$("#modalTitle").textContent=p[1];$("#modalText").textContent=p[2];$("#modalTags").innerHTML=p[3].map(t=>`<span>${t}</span>`).join("");$("#modalGithub").href=p[4];$("#projectModal").classList.add("open")});
$(".modal-close").onclick=()=>$("#projectModal").classList.remove("open");
$("#projectModal").onclick=e=>{if(e.target.id==="projectModal")e.currentTarget.classList.remove("open")};

const commands={
about:"Mahendra Kanth — SDE with strong foundations in DSA, OOP, DBMS and OS. Builds AI-powered systems, REST APIs and data pipelines.",
whoami:"Mahendra Kanth | Software Engineer | CSE @ VIT Vellore (CGPA 8.76) | CEH Certified",
skills:"Python · Java · React · SQL · PyTorch · PySpark · REST APIs · Docker · AWS · Azure CI/CD · RAG",
projects:"skin-cancer-diagnosis | prescription-rag-chatbot | diabetic-retinopathy",
contact:"email: your-email@example.com | github: github.com/YOUR_USERNAME | linkedin: linkedin.com/in/YOUR_LINKEDIN",
certifications:"CEH (EC-Council) · Oracle Cloud Infrastructure AI Foundation · Distributed DB (CouchD)",
help:"about · whoami · skills · projects · certifications · contact · clear"
};
const input=$("#terminalInput"),out=$("#terminalOutput");
input.addEventListener("keydown",e=>{if(e.key!=="Enter")return;let cmd=input.value.trim().toLowerCase();if(cmd==="clear"){out.innerHTML="";input.value="";return}let result=commands[cmd]||`command not found: ${cmd}. Type <b>help</b>.`;out.innerHTML+=`<div><span class="green">visitor@portfolio</span>:~$ ${cmd}</div><p>${result}</p>`;input.value="";out.parentElement.scrollTop=out.parentElement.scrollHeight});
