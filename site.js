{
const page=document.body.dataset.page||'home';
const D=window.SITE_DATA||{},CFG=window.SITE_CONFIG||{},BODIES=window.SITE_BODIES||{};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const img=(src,alt='')=>`<img src="${esc(String(src).replace(/^\//,''))}" alt="${esc(alt)}" loading="lazy">`;
const links=(D.navigation||[]).map(l=>[l.url,esc(l.label),l.key,(l.children||[]).length?l.children.map(x=>[x.url,esc(x.label)]):null]);
const nav=document.getElementById('nav');
if(nav){nav.innerHTML=`<a class="logo" href="index.html">Dr Jonathan <span>Wei</span></a><ul>${links.map(l=>`<li${l[3]?' class="dd"':''}><a href="${l[0]}"${(l[2]===page||(l[2]==='portfolio'&&['professional','projects','creative','adventures'].includes(page)))?' aria-current="page"':''}>${l[1]}</a>${l[3]?`<ul class="sub">${l[3].map(x=>`<li><a href="${x[0]}">${x[1]}</a></li>`).join('')}</ul>`:''}</li>`).join('')}</ul>`;}
const foot=document.getElementById('foot');
const yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
/* sticky menu: solid background once the page scrolls */
const topbar=document.getElementById('nav');
if(topbar){const st=()=>topbar.classList.toggle('scrolled',scrollY>30);addEventListener('scroll',st,{passive:true});st();}

let uid=0;
const rnd=seed=>{let s=seed;return()=>(s=s*16807%2147483647)/2147483647};
const ridge=(r,base,amp,n)=>{let d=`M0 900 L0 ${base}`;for(let i=0;i<=n;i++){const x=i*1600/n,y=base-amp*(.35+.65*r())*(i%2?1:.55);d+=` L${x.toFixed(0)} ${y.toFixed(0)}`}return d+' L1600 900 Z'};
const pal={
 day:{a:"#2f7fd1",b:"#cfe6fb",far:"#a9d0f5",mid:"#5f9fe0",near:"#1d4f90",sun:"#ffffff"},
 dawn:{a:"#3d78cc",b:"#f3d4e4",far:"#b4cdee",mid:"#6a98d8",near:"#204a8a",sun:"#ffeede"},
 night:{a:"#0c1a33",b:"#28508f",far:"#3b6aa8",mid:"#244d86",near:"#0f2547",sun:"#e9f2ff"}};
const scene=(v="day",seed=7,road=true)=>{
 const p=pal[v],id='g'+(uid++),r=rnd(seed);
 let s=`<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.a}"/><stop offset="1" stop-color="${p.b}"/></linearGradient></defs>`;
 s+=`<rect width="1600" height="900" fill="url(#${id})"/>`;
 s+=`<circle cx="${1080+r()*200}" cy="${290+r()*40}" r="70" fill="${p.sun}" opacity="${v==='night'?.9:.75}"/>`;
 if(v==='night'){for(let i=0;i<60;i++)s+=`<circle cx="${(r()*1600).toFixed(0)}" cy="${(r()*380).toFixed(0)}" r="${(r()*1.8+.6).toFixed(1)}" fill="#fff" opacity="${(r()*.6+.3).toFixed(2)}"/>`}
 s+=`<path d="${ridge(r,520,260,14)}" fill="${p.far}"/>`;
 s+=`<path d="${ridge(r,640,200,10)}" fill="${p.mid}"/>`;
 s+=`<path d="M0 900 L0 780 C300 740 520 700 760 620 C1000 540 1250 470 1600 420 L1600 900 Z" fill="${p.near}"/>`;
 if(road){
  s+=`<path d="M820 900 C1000 870 1250 850 1300 800 C1350 750 1000 740 1060 700 C1120 660 1450 650 1420 610 C1390 575 1250 560 1340 525 C1420 495 1520 470 1600 460" fill="none" stroke="#ffffff" stroke-width="14" stroke-linecap="round" opacity=".92"/>`;
  s+=`<g transform="translate(1290 512)"><circle cx="0" cy="0" r="17" fill="none" stroke="#fff" stroke-width="5"/><circle cx="52" cy="0" r="17" fill="none" stroke="#fff" stroke-width="5"/><path d="M0 0 L20 -24 L44 -24 L52 0 M20 -24 L30 0 L0 0 M44 -24 L40 -34" stroke="#fff" stroke-width="5" fill="none" stroke-linejoin="round"/><circle cx="36" cy="-62" r="8" fill="#d4232c"/><path d="M34 -54 L26 -30 L32 -6 M30 -46 L46 -32" stroke="#d4232c" stroke-width="9" stroke-linecap="round" fill="none"/></g>`;
 }
 return s+'</svg>';
};
const blueprint=(motif)=>{
 const m={
  Engineering:'<g fill="none" stroke="#fff" stroke-width="5"><circle cx="800" cy="450" r="170"/><circle cx="800" cy="450" r="60"/><path d="M800 220v60M800 620v60M570 450h60M970 450h60M637 287l42 42M921 571l42 42M963 287l-42 42M679 571l-42 42"/></g>',
  Software:'<g fill="#fff"><rect x="560" y="300" width="300" height="34" rx="17"/><rect x="640" y="380" width="460" height="34" rx="17" opacity=".7"/><rect x="640" y="460" width="340" height="34" rx="17" opacity=".7"/><rect x="560" y="540" width="200" height="34" rx="17"/></g>',
  Creative:'<path d="M640 230h110l50 50 50-50h110l70 110-70 40v260H640V380l-70-40z" fill="#fff" opacity=".95"/><path d="M670 450h260" stroke="#418fde" stroke-width="26"/>',
  Effects:'<circle cx="800" cy="450" r="46" fill="#fff"/><g stroke="#fff" stroke-width="14" stroke-linecap="round"><path d="M800 350v-50M800 550v50M700 450h-50M900 450h50M729 379l-36-36M871 521l36 36M871 379l36-36M729 521l-36 36"/></g>',
  Cycling:'<g fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round"><circle cx="640" cy="520" r="120"/><circle cx="980" cy="520" r="120"/><path d="M640 520l130-160h170l40 160M770 360l60 160H640M940 360l-30-60"/></g>'};
 let s=`<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="bp${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7fd1"/><stop offset="1" stop-color="#418FDE"/></linearGradient><radialGradient id="bh${uid}" cx="1" cy="1" r=".75"><stop offset="0" stop-color="#ff6fae" stop-opacity=".55"/><stop offset=".45" stop-color="#8e5cf0" stop-opacity=".25"/><stop offset="1" stop-color="#8e5cf0" stop-opacity="0"/></radialGradient></defs><rect width="1600" height="900" fill="url(#bp${uid})"/><rect width="1600" height="900" fill="url(#bh${uid++})"/>`;
 for(let x=0;x<=1600;x+=80)s+=`<line x1="${x}" y1="0" x2="${x}" y2="900" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>`;
 for(let y=0;y<=900;y+=80)s+=`<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>`;
 return s+(m[motif]||'')+'</svg>';
};
document.querySelectorAll('[data-scene]').forEach((el,i)=>{const [v,seed,road]=el.dataset.scene.split(',');el.innerHTML=road==='bp'?blueprint(seed):scene(v,+seed||7+i,road!=='0')});


/* parallax: background pictures move slower than the page */
const pxEls=[...document.querySelectorAll('[data-px]')];
if(pxEls.length&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 let busy=false;
 const upd=()=>{pxEls.forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;el.style.transform=`translate3d(0,${(-r.top*.3).toFixed(1)}px,0)`});busy=false};
 addEventListener('scroll',()=>{if(!busy){busy=true;requestAnimationFrame(upd)}},{passive:true});
 addEventListener('resize',upd);upd();
}

/* projects and creative media */
const projects=(D.projects||[]).map(p=>({id:p.id,t:esc(p.title),c:p.category,s:p.status,d:esc(p.summary),img:p.image}));
const creative=(D.creative||[]).map(p=>({id:p.id,t:esc(p.title),c:'Creative',sc:p.illustration||'day,31',d:esc(p.summary),img:p.image}));
const statusCls=s=>/In development|Active/.test(s)?' live':s==='Planned'?' plan':'';
const pEl=document.getElementById('plist'),fEl=document.getElementById('filters');
if(pEl&&fEl){
 const cats=["All","Hardware","Software & AI"];let cur="All";
 const render=()=>{pEl.innerHTML=projects.filter(p=>cur==="All"||p.c===cur).map(p=>`<a class="p" href="project.html#${p.id}"><div class="art">${p.img?img(p.img):blueprint(p.c==="Hardware"?"Engineering":"Software")}</div><div class="body"><div class="meta"><span class="k">${p.c}</span><span class="tag${statusCls(p.s)}">${p.s}</span></div><h3>${p.t}</h3><p>${p.d}</p></div></a>`).join('');fEl.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===cur))};
 fEl.innerHTML=cats.map(c=>`<button type="button" data-c="${c}">${c}</button>`).join('');
 fEl.addEventListener('click',e=>{const b=e.target.closest('button');if(b){cur=b.dataset.c;render()}});
 render();
}
const cEl2=document.getElementById('clist');
if(cEl2){cEl2.innerHTML=creative.map(p=>{const [v,sd,rd]=p.sc.split(',');return `<a class="p" href="project.html#${p.id}"><div class="art">${p.img?img(p.img):rd==='bp'?blueprint(sd):scene(v,+sd,rd!=='0')}</div><div class="body"><h3>${p.t}</h3><p>${p.d}</p></div></a>`}).join('');}
const dEl=document.getElementById('detail');
if(dEl){
 const show=()=>{
  const id=location.hash.slice(1),all=projects.concat(creative),p=all.find(x=>x.id===id)||all[0];
  const tmp=document.createElement('textarea');tmp.innerHTML=p.t;document.getElementById('dtitle').textContent=tmp.value;document.title=tmp.value+' | Dr Jonathan Wei';
  tmp.innerHTML=p.d;document.getElementById('dlead').textContent=tmp.value;
  const body=BODIES[p.id];
  const back=p.c==="Creative"?'<a href="creative.html">All creative media</a>':'<a href="projects.html">All projects and experiments</a>';
  dEl.innerHTML=`<div><div class="meta" style="justify-content:flex-start;gap:12px;margin-bottom:16px"><span class="k">${p.c}</span>${p.s?`<span class="tag${statusCls(p.s)}">${p.s}</span>`:''}</div><h2>Overview</h2>${body?`<div class="prose" style="margin-top:14px">${body}</div>`:`<p style="margin-top:14px">${p.d} The full write-up, photos and video go here.</p><details open><summary>Development log</summary><div class="in"><p class="note">Sample entries until the real log is written.</p><ul class="ticks"><li>First idea and sketches</li><li>Prototype one and what broke</li><li>Current version and next steps</li></ul></div></details>`}<p style="margin-top:20px">${back}</p></div><div class="photo">${p.img?img(p.img,p.t):p.c==="Creative"?scene("day",31):blueprint(p.c==="Hardware"?"Engineering":"Software")}</div>`;
 };
 addEventListener('hashchange',show);show();
}

/* about */
const tlEl=document.getElementById('tl');
if(tlEl){tlEl.innerHTML=(D.timeline||[]).map(t=>[t.year,esc(t.role),esc(t.detail)]).map(t=>`<li><span class="y">${t[0]}</span><b>${t[1]}</b><span>${t[2]}</span></li>`).join('');}
const lEl=document.getElementById('langs');
if(lEl){lEl.innerHTML=(D.languages||[]).map(l=>[esc(l.language),+l.percent||0,esc(l.level)]).map(l=>`<div class="lang"><span>${l[0]}</span><div class="bar"><i style="width:${l[1]}%"></i></div><span class="lvl">${l[2]}</span></div>`).join('');}
const svg=document.getElementById('profile');
if(svg){
 const stops=[{x:0,y:.12,l:"Taiwan",s:"Taipei, where it started"},{x:.08,y:.22,l:"South Africa",s:"Pretoria"},{x:.17,y:.3,l:"Australia",s:"Brisbane"},{x:.27,y:.52,l:"2012",s:"Mechanical & aerospace eng.",m:1},{x:.34,y:.42},{x:.44,y:.9,l:"2018",s:"PhD",m:1,k:1},{x:.52,y:.4,l:"Delft",s:"TU Delft postdoc"},{x:.63,y:.66,l:"2022",s:"TNO",m:1},{x:.69,y:.55},{x:.78,y:.82,l:"2025",s:"BSI",m:1,k:1},{x:.86,y:.48,l:"2026",s:"Founder"},{x:1,y:1,l:"Next",s:"The next climb",m:1,f:1}];
 const draw=()=>{
  const W=svg.clientWidth,H=svg.clientHeight;if(!W)return;
  const top=W<520?58:W<720?70:100,bot=30,L=4,R=W<520?8:16;
  const X=x=>L+x*(W-L-R),Y=y=>H-bot-y*(H-bot-top-28);
  const past=stops.filter(s=>!s.f),fut=stops.slice(-2);
  const line=a=>a.map((s,i)=>(i?'L':'M')+X(s.x).toFixed(1)+' '+Y(s.y).toFixed(1)).join(' ');
  let h=`<defs><linearGradient id="gl" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#418FDE"/><stop offset=".38" stop-color="#8e5cf0"/><stop offset=".68" stop-color="#ff6fae"/><stop offset="1" stop-color="#FF8A3D"/></linearGradient><linearGradient id="gf" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#418FDE" stop-opacity=".14"/><stop offset=".5" stop-color="#8e5cf0" stop-opacity=".14"/><stop offset="1" stop-color="#ff6fae" stop-opacity=".16"/></linearGradient></defs><path d="${line(past)} L${X(past[past.length-1].x)} ${H-bot} L${X(0)} ${H-bot} Z" fill="url(#gf)"/>`;
  h+=`<line x1="${X(0)}" x2="${X(1)}" y1="${H-bot}" y2="${H-bot}" stroke="var(--line)" stroke-width="2"/>`;
  h+=`<path class="draw" d="${line(past)}" fill="none" stroke="url(#gl)" stroke-width="${W<520?4:6}" stroke-linejoin="round" stroke-linecap="round" style="--len:${Math.ceil(W*2.2)}"/>`;
  h+=`<path d="${line(fut)}" fill="none" stroke="#FF8A3D" stroke-width="${W<520?4:6}" stroke-dasharray="2 12" stroke-linecap="round"/>`;
  stops.filter(s=>s.l&&(W>=720||s.m)).forEach((s,i)=>{
   const px=X(s.x),py=Y(s.y),row=W<720?1:i%2,ly=top-(row?0:44)-6,a=s.x>.95?'end':s.x<.03?'start':'middle';
   h+=`<line x1="${px}" x2="${px}" y1="${ly+10}" y2="${py-9}" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="3 4"/>`;
   h+=s.k?`<circle cx="${px}" cy="${py}" r="9" fill="#fff" stroke="var(--red)" stroke-width="3"/><circle cx="${px}" cy="${py}" r="3.5" fill="var(--red)"/>`:`<circle cx="${px}" cy="${py}" r="6" fill="var(--bg)" stroke="var(--blue)" stroke-width="3"/>`;
   h+=`<text x="${px}" y="${ly-12}" text-anchor="${a}" font-size="${W<520?15:17}" font-weight="700" fill="var(--ink)">${s.l}</text>`+(W>=720?`<text x="${px}" y="${ly+5}" text-anchor="${a}" font-size="14" fill="var(--mute)">${s.s}</text>`:'');
  });
  svg.innerHTML=h;
 };
 new ResizeObserver(draw).observe(svg);
}

/* adventures */
const cEl=document.getElementById('cross');
if(cEl){cEl.innerHTML=(D.crossings||[]).map(c=>[esc(c.place),esc(c.note)]).map(c=>`<li>${c[0]}<small>${c[1]}</small></li>`).join('');}

/* contact */
const f=document.getElementById('cform'),out=document.getElementById('sent');
if(f){f.addEventListener('submit',e=>{e.preventDefault();const miss=[...f.querySelectorAll('[required]')].filter(i=>!i.value.trim()||(i.type==="email"&&!/^\S+@\S+\.\S+$/.test(i.value)));if(miss.length){out.textContent="Fill in your name, a valid email and a message.";miss[0].focus();return}if(!CFG.contact_form_endpoint){out.textContent="This form isn't connected yet. Email me in the meantime.";return}
 out.textContent="Sending...";fetch(CFG.contact_form_endpoint,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}}).then(r=>{if(!r.ok)throw 0;f.reset();out.textContent="Thanks, your message is on its way. I'll get back to you soon."}).catch(()=>{out.textContent="Sorry, that didn't go through. Try again in a moment."});});}

/* if the icon library can't load, show the names instead */
if(document.querySelector('.icons'))setTimeout(()=>{if(!document.querySelector('.icons svg'))document.body.classList.add('noicons')},2500);

/* scroll-down button glides to the next section */
const dn=document.querySelector('.down');
if(dn){dn.addEventListener('click',e=>{const t=document.querySelector(dn.getAttribute('href'));if(!t)return;e.preventDefault();t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});}

/* model comp card */
const comp=document.getElementById('comp');
if(comp&&D.model){
 const m=D.model,esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const ph=(p,cls)=>`<figure class="cshot ${cls}">${p.image?`<img src="${esc(p.image.replace(/^\//,''))}" alt="${esc(p.label)}">`:`<div class="photo" data-scene="${esc(p.scene)}"></div>`}<figcaption>${esc(p.label)}</figcaption></figure>`;
 const photos=m.photos||[];
 comp.innerHTML=`<div class="cshots">${photos.map((p,i)=>ph(p,i?'':'main')).join('')}</div>
 <div class="cinfo">
  <h2>${esc(m.name)}</h2><p class="cbase">${esc(m.based_in)}</p><p>${esc(m.headline)}</p>
  <table class="cstats"><tbody>${(m.stats||[]).map(s=>`<tr><th scope="row">${esc(s.label)}</th><td>${s.value?esc(s.value):'<span class="todo">to add</span>'}</td></tr>`).join('')}</tbody></table>
  <h3>Specialities</h3><div class="chips">${(m.specialities||[]).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
  <h3>Available for</h3><ul class="ticks">${(m.available_for||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
  <h3>Skills</h3><ul class="ticks">${(m.skills||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
  <div class="btns"><a class="btn main" href="contact.html">Book me</a>${m.comp_card_pdf?`<a class="btn alt" href="${esc(m.comp_card_pdf.replace(/^\//,''))}">Download comp card (PDF)</a>`:''}</div>
 </div>`;
 comp.querySelectorAll('[data-scene]').forEach(el=>{const [v,sd,rd]=el.dataset.scene.split(',');el.innerHTML=rd==='bp'?blueprint(sd):scene(v,+sd,rd!=='0')});
}
}
