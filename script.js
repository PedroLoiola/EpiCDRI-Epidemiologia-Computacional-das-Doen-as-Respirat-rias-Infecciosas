
'use strict';
const DEFAULT_DISEASES = [
  {
    "id": "sars1",
    "name": "SARS-CoV-1",
    "shortName": "SARS-CoV-1",
    "r0": 2.7,
    "incubationDays": 4.7,
    "infectiousDays": 9.3,
    "initialInfected": 4,
    "population": 240,
    "mobility": 0.52,
    "contactRadius": 17,
    "immunity": 0.0,
    "isolation": 0.55,
    "distancing": 0.25,
    "heterogeneity": 0.7,
    "color": "#f97316",
    "summary": "Coronavírus associado à epidemia de SARS de 2002–2003. O preset usa R0 intermediário e maior heterogeneidade, refletindo a importância de eventos de superespalhamento e controle por isolamento.",
    "parameterNotes": "R0 aproximado baseado em estimativas da epidemia de Hong Kong; incubação e duração infecciosa são valores médios/operacionais para simulação didática."
  },
  {
    "id": "sars2",
    "name": "SARS-CoV-2",
    "shortName": "SARS-CoV-2",
    "r0": 2.87,
    "incubationDays": 6.5,
    "infectiousDays": 7.0,
    "initialInfected": 5,
    "population": 260,
    "mobility": 0.62,
    "contactRadius": 18,
    "immunity": 0.05,
    "isolation": 0.35,
    "distancing": 0.15,
    "heterogeneity": 0.55,
    "color": "#38bdf8",
    "summary": "Coronavírus causador da COVID-19. O preset representa a linhagem ancestral/início pandêmico, antes de variantes altamente transmissíveis e de imunidade populacional ampla.",
    "parameterNotes": "R0 usa estimativa sumarizada por revisão sistemática; incubação usa meta-análise de intervalo serial e período de incubação."
  },
  {
    "id": "mers",
    "name": "MERS-CoV",
    "shortName": "MERS",
    "r0": 0.91,
    "incubationDays": 5.8,
    "infectiousDays": 10.0,
    "initialInfected": 4,
    "population": 230,
    "mobility": 0.42,
    "contactRadius": 15,
    "immunity": 0.0,
    "isolation": 0.45,
    "distancing": 0.2,
    "heterogeneity": 0.9,
    "color": "#a78bfa",
    "summary": "Coronavírus da Síndrome Respiratória do Oriente Médio. Em geral tem transmissão comunitária limitada, mas pode gerar grandes clusters em serviços de saúde.",
    "parameterNotes": "R0 baixo no preset representa transmissão média; a heterogeneidade alta permite demonstrar clusters e superespalhamento em cenários específicos."
  },
  {
    "id": "influenza",
    "name": "Influenza sazonal",
    "shortName": "Influenza",
    "r0": 1.28,
    "incubationDays": 1.8,
    "infectiousDays": 4.0,
    "initialInfected": 6,
    "population": 260,
    "mobility": 0.72,
    "contactRadius": 16,
    "immunity": 0.15,
    "isolation": 0.18,
    "distancing": 0.1,
    "heterogeneity": 0.35,
    "color": "#22c55e",
    "summary": "Doença respiratória viral aguda com epidemias sazonais recorrentes. O preset usa R0 típico de influenza sazonal e cursos de incubação/infecção mais curtos.",
    "parameterNotes": "R0 baseado em revisão sistemática; incubação e período infeccioso são valores didáticos compatíveis com literatura de infecções respiratórias agudas."
  }
];
const DEFAULT_REFERENCES = [
  {
    "id": "riley2003",
    "disease": "SARS-CoV-1",
    "title": "Transmission dynamics of the etiological agent of SARS in Hong Kong: impact of public health interventions",
    "authors": "Riley S. et al.",
    "journal": "Science",
    "year": 2003,
    "doi": "10.1126/science.1086478",
    "url": "https://pubmed.ncbi.nlm.nih.gov/12766206/",
    "usedFor": "R0 e dinâmica de transmissão da SARS em Hong Kong."
  },
  {
    "id": "cori2009",
    "disease": "SARS-CoV-1",
    "title": "Temporal variability and social heterogeneity in disease transmission: the case of SARS in Hong Kong",
    "authors": "Cori A. et al.",
    "journal": "PLoS Computational Biology",
    "year": 2009,
    "doi": "10.1371/journal.pcbi.1000471",
    "url": "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000471",
    "usedFor": "Duração média do período infeccioso e heterogeneidade/socialidade na transmissão."
  },
  {
    "id": "billah2020",
    "disease": "SARS-CoV-2",
    "title": "Reproductive number of coronavirus: a systematic review and meta-analysis based on global level evidence",
    "authors": "Billah M. A.; Miah M. M.; Khan M. N.",
    "journal": "PLoS ONE",
    "year": 2020,
    "doi": "10.1371/journal.pone.0242128",
    "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0242128",
    "usedFor": "Estimativa sumarizada de R0 para SARS-CoV-2 no início pandêmico."
  },
  {
    "id": "alene2021",
    "disease": "SARS-CoV-2",
    "title": "Serial interval and incubation period of COVID-19: a systematic review and meta-analysis",
    "authors": "Alene M. et al.",
    "journal": "BMC Infectious Diseases",
    "year": 2021,
    "doi": "10.1186/s12879-021-05950-x",
    "url": "https://link.springer.com/article/10.1186/s12879-021-05950-x",
    "usedFor": "Período de incubação e intervalo serial da COVID-19."
  },
  {
    "id": "chowell2015",
    "disease": "MERS-CoV / SARS-CoV-1",
    "title": "Transmission characteristics of MERS and SARS in the healthcare setting: a comparative study",
    "authors": "Chowell G. et al.",
    "journal": "BMC Medicine",
    "year": 2015,
    "doi": "10.1186/s12916-015-0450-0",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26336062/",
    "usedFor": "Comparação de transmissão de MERS e SARS em ambientes de saúde."
  },
  {
    "id": "biggerstaff2014",
    "disease": "Influenza",
    "title": "Estimates of the reproduction number for seasonal, pandemic, and zoonotic influenza: a systematic review of the literature",
    "authors": "Biggerstaff M. et al.",
    "journal": "BMC Infectious Diseases",
    "year": 2014,
    "doi": "10.1186/1471-2334-14-480",
    "url": "https://link.springer.com/article/10.1186/1471-2334-14-480",
    "usedFor": "R0/R para influenza sazonal, pandêmica e zoonótica."
  },
  {
    "id": "lessler2009",
    "disease": "Respiratórias agudas",
    "title": "Incubation periods of acute respiratory viral infections: a systematic review",
    "authors": "Lessler J. et al.",
    "journal": "The Lancet Infectious Diseases",
    "year": 2009,
    "doi": "10.1016/S1473-3099(09)70069-6",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19393959/",
    "usedFor": "Períodos de incubação de infecções respiratórias virais agudas."
  },
  {
    "id": "perez2009",
    "disease": "Modelagem",
    "title": "An agent-based approach for modeling dynamics of contagious disease spread",
    "authors": "Perez L.; Dragicevic S.",
    "journal": "International Journal of Health Geographics",
    "year": 2009,
    "doi": "10.1186/1476-072X-8-50",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2729742/",
    "usedFor": "Fundamentação de modelos epidemiológicos baseados em agentes e espaço."
  },
  {
    "id": "hunter2018",
    "disease": "Modelagem",
    "title": "An open-data-driven agent-based model to simulate infectious disease outbreaks",
    "authors": "Hunter E. et al.",
    "journal": "PLoS ONE",
    "year": 2018,
    "doi": "10.1371/journal.pone.0208775",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6300276/",
    "usedFor": "Uso de modelos baseados em agentes para doenças transmitidas pelo ar."
  }
];
const DEFAULT_CONTENT = {
  "model": {
    "title": "Modelo epidemiológico",
    "body": "O EpiCDRI implementa um SEIR baseado em agentes. Cada esfera representa um indivíduo que se move em um espaço bidimensional. Em cada passo temporal, expostos tornam-se infecciosos após o período de incubação; infecciosos recuperam-se após o período infeccioso; suscetíveis podem ser infectados quando se aproximam de indivíduos infecciosos. O número reprodutivo básico R0 é usado para calibrar a intensidade relativa da transmissão, mas a transmissão observada depende também de mobilidade, raio de contato, distanciamento, isolamento, imunidade inicial e heterogeneidade individual."
  },
  "limitations": {
    "title": "Limitações",
    "body": "Este simulador é didático e exploratório. Ele não deve ser usado para previsão real de epidemias. Os parâmetros da literatura são estimativas dependentes de contexto, método, população, variante viral e intervenções vigentes. O modelo não inclui estrutura etária detalhada, domicílios reais, redes de contato calibradas, sazonalidade, gravidade clínica, mortalidade, testagem, variantes, reinfecção ou incerteza estatística formal. A área de acesso restrito é apenas uma interface local em navegador, não uma autenticação segura."
  },
  "restricted": {
    "title": "Acesso restrito",
    "body": "Use esta área para editar doenças, referências e textos da página. Em GitHub Pages, esta área é apenas client-side: os dados ficam no navegador via localStorage. Para controle real de acesso será necessário usar backend, autenticação e banco de dados."
  }
};
const STORAGE_KEYS = {diseases:'epicdri.diseases.v1',references:'epicdri.references.v1',content:'epicdri.content.v1'};
const ADMIN_PASSWORD='epicdri-admin';
const $=id=>document.getElementById(id);
let diseases=loadJSON(STORAGE_KEYS.diseases,DEFAULT_DISEASES),references=loadJSON(STORAGE_KEYS.references,DEFAULT_REFERENCES),content=loadJSON(STORAGE_KEYS.content,DEFAULT_CONTENT);
const simCanvas=$('simCanvas'),ctx=simCanvas.getContext('2d'),chartCanvas=$('chartCanvas'),cctx=chartCanvas.getContext('2d');
const state={running:false,agents:[],day:0,tick:0,dt:.25,history:[],recentNewInfections:0,rt:0,animation:null,lastTimestamp:0,diseaseId:diseases[1]?.id||diseases[0]?.id,contactsToDraw:[]};
const controls={population:$('population'),initialInfected:$('initialInfected'),r0:$('r0'),incubationDays:$('incubationDays'),infectiousDays:$('infectiousDays'),mobility:$('mobility'),contactRadius:$('contactRadius'),immunity:$('immunity'),isolation:$('isolation'),distancing:$('distancing'),heterogeneity:$('heterogeneity'),speed:$('speed')};
const labels={population:$('populationValue'),initialInfected:$('initialInfectedValue'),r0:$('r0Value'),incubationDays:$('incubationDaysValue'),infectiousDays:$('infectiousDaysValue'),mobility:$('mobilityValue'),contactRadius:$('contactRadiusValue'),immunity:$('immunityValue'),isolation:$('isolationValue'),distancing:$('distancingValue'),heterogeneity:$('heterogeneityValue'),speed:$('speedValue')};
const metrics={S:$('metricS'),E:$('metricE'),I:$('metricI'),R:$('metricR'),day:$('metricDay'),rt:$('metricRt')};
function loadJSON(k,f){try{const r=localStorage.getItem(k);return r?JSON.parse(r):structuredClone(f)}catch(e){return structuredClone(f)}}
function saveJSON(k,v){localStorage.setItem(k,JSON.stringify(v))}
function params(){return Object.fromEntries(Object.entries(controls).map(([k,i])=>[k,Number(i.value)]))}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function getSelectedDisease(){return diseases.find(d=>d.id===state.diseaseId)||diseases[0]}
function updateLabels(){const p=params();labels.population.textContent=p.population;labels.initialInfected.textContent=p.initialInfected;labels.r0.textContent=p.r0.toFixed(2);labels.incubationDays.textContent=p.incubationDays.toFixed(1)+' d';labels.infectiousDays.textContent=p.infectiousDays.toFixed(1)+' d';labels.mobility.textContent=p.mobility.toFixed(2);labels.contactRadius.textContent=p.contactRadius.toFixed(0);labels.immunity.textContent=p.immunity.toFixed(2);labels.isolation.textContent=p.isolation.toFixed(2);labels.distancing.textContent=p.distancing.toFixed(2);labels.heterogeneity.textContent=p.heterogeneity.toFixed(2);labels.speed.textContent=p.speed.toFixed(1)+'×';const d=getSelectedDisease();$('heroDisease').textContent=d?.shortName||d?.name||'Doença';$('heroR0').textContent='R0 = '+p.r0.toFixed(2);$('heroDays').textContent='dia '+state.day.toFixed(1)}
function setControlsFromDisease(d){if(!d)return;for(const k of Object.keys(controls))if(d[k]!==undefined)controls[k].value=d[k];state.diseaseId=d.id;$('diseaseSummary').innerHTML=`<strong style="color:${d.color||'#7dd3fc'}">${d.name}</strong><br>${d.summary||''}<hr style="border-color:rgba(255,255,255,.1);border-width:1px 0 0;margin:10px 0;"><small>${d.parameterNotes||''}</small>`;updateLabels()}
function populateDiseaseSelect(){const s=$('diseaseSelect');s.innerHTML='';for(const d of diseases){const o=document.createElement('option');o.value=d.id;o.textContent=d.name;s.appendChild(o)}s.value=state.diseaseId}
function renderContentTabs(){$('modelTitle').textContent=content.model?.title||'Modelo epidemiológico';$('modelBody').textContent=content.model?.body||'';$('limitationsTitle').textContent=content.limitations?.title||'Limitações';$('limitationsBody').textContent=content.limitations?.body||'';$('restrictedTitle').textContent=content.restricted?.title||'Acesso restrito';$('restrictedBody').textContent=content.restricted?.body||''}
function renderDiseaseCards(){const w=$('diseaseCards');w.innerHTML='';for(const d of diseases){const c=document.createElement('article');c.className='disease-card';c.innerHTML=`<h3 style="color:${d.color||'#fff'}">${d.name}</h3><p>${d.summary||''}</p><table class="param-table"><tr><td>R0</td><td>${Number(d.r0).toFixed(2)}</td></tr><tr><td>Incubação</td><td>${Number(d.incubationDays).toFixed(1)} dias</td></tr><tr><td>Período infeccioso</td><td>${Number(d.infectiousDays).toFixed(1)} dias</td></tr><tr><td>Heterogeneidade</td><td>${Number(d.heterogeneity).toFixed(2)}</td></tr><tr><td>Isolamento</td><td>${Number(d.isolation).toFixed(2)}</td></tr></table><p><small>${d.parameterNotes||''}</small></p>`;w.appendChild(c)}}
function renderReferences(){const w=$('referenceList');w.innerHTML='';for(const r of references){const it=document.createElement('article');it.className='reference-item';it.innerHTML=`<strong>${r.authors} (${r.year}). ${r.title}</strong><span><em>${r.journal}</em>. DOI: ${r.doi||'não informado'}.</span><span>Uso no EpiCDRI: ${r.usedFor||''}</span><span>Categoria: ${r.disease||'Geral'}</span><a href="${r.url}" target="_blank" rel="noopener noreferrer">Abrir fonte</a>`;w.appendChild(it)}}
function createAgent(id,status){const m=28,x=m+Math.random()*(simCanvas.width-m*2),y=m+Math.random()*(simCanvas.height-m*2),ang=Math.random()*Math.PI*2,sociality=Math.exp((Math.random()-.5)*2.2);return{id,x,y,vx:Math.cos(ang),vy:Math.sin(ang),status,daysInState:0,infectedBy:null,secondary:0,isolated:false,sociality,trail:[]}}
function initAgents(){const p=params();state.agents=[];state.day=0;state.tick=0;state.history=[];state.recentNewInfections=0;state.rt=0;state.contactsToDraw=[];for(let i=0;i<p.population;i++)state.agents.push(createAgent(i,Math.random()<p.immunity?'R':'S'));seedInfections(p.initialInfected);recordHistory();updateMetrics();draw();drawChart()}
function seedInfections(n){const cand=state.agents.filter(a=>a.status==='S');for(let i=0;i<n&&cand.length;i++){const idx=Math.floor(Math.random()*cand.length),a=cand.splice(idx,1)[0];a.status='I';a.daysInState=0;a.isolated=Math.random()<params().isolation*.25}}
function moveAgents(){const p=params(),speed=(.35+p.mobility*1.45)*(1-p.distancing*.38);for(const a of state.agents){if($('showTrails').checked){a.trail.push({x:a.x,y:a.y});if(a.trail.length>16)a.trail.shift()}else a.trail.length=0;if(Math.random()<.035){const ang=Math.atan2(a.vy,a.vx)+(Math.random()-.5)*1.0;a.vx=Math.cos(ang);a.vy=Math.sin(ang)}let sp=speed*(.75+Math.min(1.8,a.sociality)*.25);if(a.status==='I')sp*=.86;if(a.isolated)sp*=.18;a.x+=a.vx*sp;a.y+=a.vy*sp;if(a.x<18||a.x>simCanvas.width-18)a.vx*=-1;if(a.y<18||a.y>simCanvas.height-18)a.vy*=-1;a.x=clamp(a.x,18,simCanvas.width-18);a.y=clamp(a.y,18,simCanvas.height-18)}}
function transmissionStep(){const p=params();state.contactsToDraw=[];const infs=state.agents.filter(a=>a.status==='I'),sus=state.agents.filter(a=>a.status==='S'),base=p.r0/Math.max(.1,p.infectiousDays),mit=1-.72*p.distancing;for(const inf of infs)for(const s of sus){const dx=inf.x-s.x,dy=inf.y-s.y,dist=Math.hypot(dx,dy);if(dist>p.contactRadius)continue;if(state.contactsToDraw.length<45&&Math.random()<.25)state.contactsToDraw.push([inf.x,inf.y,s.x,s.y]);const prox=1-dist/p.contactRadius,het=1+p.heterogeneity*(inf.sociality-1)*.75,iso=inf.isolated?.25:1;let prob=base*state.dt*prox*mit*iso*het*.095;prob=clamp(prob,0,.45);if(Math.random()<prob){s.status='E';s.daysInState=0;s.infectedBy=inf.id;inf.secondary++;state.recentNewInfections++}}}
function progressionStep(){const p=params();for(const a of state.agents){if(a.status==='S'||a.status==='R')continue;a.daysInState+=state.dt;if(a.status==='E'&&a.daysInState>=p.incubationDays){a.status='I';a.daysInState=0;a.isolated=Math.random()<p.isolation}if(a.status==='I'){if(!a.isolated&&Math.random()<p.isolation*.035)a.isolated=true;if(a.daysInState>=p.infectiousDays){a.status='R';a.daysInState=0;a.isolated=false}}}}
function step(){moveAgents();transmissionStep();progressionStep();state.day+=state.dt;state.tick++;if(Math.abs(state.day-Math.round(state.day))<.001){updateRt();recordHistory();state.recentNewInfections=0}updateMetrics()}
function countStates(){const c={S:0,E:0,I:0,R:0};for(const a of state.agents)c[a.status]++;return c}
function updateRt(){const I=state.agents.filter(a=>a.status==='I').length;state.rt=I>0?clamp(state.recentNewInfections/I*2.2,0,12):0}
function recordHistory(){const c=countStates();state.history.push({day:state.day,...c});if(state.history.length>240)state.history.shift();drawChart()}
function updateMetrics(){const c=countStates();metrics.S.textContent=c.S;metrics.E.textContent=c.E;metrics.I.textContent=c.I;metrics.R.textContent=c.R;metrics.day.textContent=state.day.toFixed(1);metrics.rt.textContent=state.rt.toFixed(2);$('heroDays').textContent='dia '+state.day.toFixed(1)}
function draw(){const w=simCanvas.width,h=simCanvas.height;ctx.clearRect(0,0,w,h);ctx.fillStyle='#fbfcfe';ctx.fillRect(0,0,w,h);if($('showConnections')?.checked){ctx.save();ctx.strokeStyle='rgba(185,28,28,.22)';ctx.lineWidth=1;for(const [x1,y1,x2,y2] of state.contactsToDraw){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}ctx.restore()}drawTrails();drawAgents()}
function drawGrid(){ctx.save();ctx.strokeStyle='rgba(255,255,255,.045)';ctx.lineWidth=1;for(let x=0;x<=simCanvas.width;x+=55){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,simCanvas.height);ctx.stroke()}for(let y=0;y<=simCanvas.height;y+=55){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(simCanvas.width,y);ctx.stroke()}ctx.restore()}
function drawSoftRegions(){const regs=[[70,70,250,150,'Área residencial','rgba(56,189,248,.08)'],[380,90,280,170,'Escola / trabalho','rgba(245,158,11,.08)'],[735,100,285,175,'Transporte / comércio','rgba(167,139,250,.08)'],[190,370,315,170,'Bairros mistos','rgba(34,197,94,.06)'],[650,360,330,170,'Serviços de saúde','rgba(239,68,68,.06)']];ctx.save();for(const [x,y,w,h,l,col] of regs){ctx.fillStyle=col;roundRect(ctx,x,y,w,h,28,true,false);ctx.fillStyle='rgba(255,255,255,.55)';ctx.font='bold 13px Arial';ctx.fillText(l,x+18,y+28)}ctx.restore()}
function drawTrails(){if(!$('showTrails').checked)return;ctx.save();ctx.strokeStyle='rgba(255,255,255,.10)';ctx.lineWidth=1;for(const a of state.agents){if(a.trail.length<2)continue;ctx.beginPath();a.trail.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));ctx.stroke()}ctx.restore()}
function drawAgents(){ctx.save();for(const a of state.agents){const color=a.status==='S'?'#60a5fa':a.status==='E'?'#f59e0b':a.status==='I'?'#ef4444':'#22c55e';if(a.status==='I'){ctx.beginPath();ctx.arc(a.x,a.y,9.5,0,Math.PI*2);ctx.fillStyle='rgba(239,68,68,.18)';ctx.fill()}ctx.beginPath();ctx.arc(a.x,a.y,a.status==='I'?5.2:4.5,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();ctx.lineWidth=1.3;ctx.strokeStyle='rgba(15,23,42,.35)';ctx.stroke();if(a.isolated){ctx.beginPath();ctx.arc(a.x,a.y,8.8,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,.72)';ctx.lineWidth=1.3;ctx.stroke()}}ctx.restore()}
function drawCanvasBadge(){const d=getSelectedDisease(),p=params();ctx.save();ctx.fillStyle='rgba(2,6,23,.78)';roundRect(ctx,18,18,355,94,18,true,false);ctx.strokeStyle='rgba(255,255,255,.12)';ctx.stroke();ctx.fillStyle=d?.color||'#7dd3fc';ctx.font='bold 18px Arial';ctx.fillText(d?.name||'Doença',38,48);ctx.fillStyle='#cbd5e1';ctx.font='13px Arial';ctx.fillText(`dia ${state.day.toFixed(1)} · R0 ${p.r0.toFixed(2)} · incubação ${p.incubationDays.toFixed(1)} d`,38,70);ctx.fillText(`infeccioso ${p.infectiousDays.toFixed(1)} d · mobilidade ${p.mobility.toFixed(2)} · Rt ${state.rt.toFixed(2)}`,38,90);ctx.restore()}
function drawChart(){const w=chartCanvas.width,h=chartCanvas.height,p=params();cctx.clearRect(0,0,w,h);cctx.fillStyle='#fbfcfe';cctx.fillRect(0,0,w,h);const l=45,r=18,t=20,b=28,pw=w-l-r,ph=h-t-b;cctx.strokeStyle='rgba(15,23,42,.10)';cctx.lineWidth=1;for(let i=0;i<=5;i++){const y=t+ph/5*i;cctx.beginPath();cctx.moveTo(l,y);cctx.lineTo(w-r,y);cctx.stroke();cctx.fillStyle='rgba(71,85,105,.72)';cctx.font='11px Arial';cctx.fillText(String(Math.round(p.population*(1-i/5))),8,y+4)}if(state.history.length<2)return;line('S','#60a5fa');line('E','#f59e0b');line('I','#ef4444');line('R','#22c55e');cctx.fillStyle='#475569';cctx.font='12px Arial';cctx.fillText('dias',w-50,h-8);function line(k,col){cctx.beginPath();state.history.forEach((d,i)=>{const x=l+i/Math.max(1,state.history.length-1)*pw,y=t+ph-d[k]/p.population*ph;if(i===0)cctx.moveTo(x,y);else cctx.lineTo(x,y)});cctx.strokeStyle=col;cctx.lineWidth=2.8;cctx.stroke()}}
function roundRect(c,x,y,w,h,r,fill,stroke){const R=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+R,y);c.arcTo(x+w,y,x+w,y+h,R);c.arcTo(x+w,y+h,x,y+h,R);c.arcTo(x,y+h,x,y,R);c.arcTo(x,y,x+w,y,R);c.closePath();if(fill)c.fill();if(stroke)c.stroke()}
function animate(ts){if(!state.running)return;const p=params();if(!state.lastTimestamp)state.lastTimestamp=ts;const delta=ts-state.lastTimestamp;if(delta>80/p.speed){step();draw();state.lastTimestamp=ts}state.animation=requestAnimationFrame(animate)}
function start(){if(state.running)return;state.running=true;state.lastTimestamp=0;state.animation=requestAnimationFrame(animate)}
function pause(){state.running=false;if(state.animation)cancelAnimationFrame(state.animation)}
function reset(){pause();initAgents()}
function setupTabs(){document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));btn.classList.add('active');$(btn.dataset.tab).classList.add('active')}))}
function setupEvents(){setupTabs();$('diseaseSelect').addEventListener('change',e=>{const d=diseases.find(x=>x.id===e.target.value);setControlsFromDisease(d);reset()});Object.values(controls).forEach(i=>i.addEventListener('input',()=>{updateLabels();draw()}));['population','initialInfected','immunity'].forEach(k=>controls[k].addEventListener('change',reset));$('startBtn').addEventListener('click',start);$('pauseBtn').addEventListener('click',pause);$('resetBtn').addEventListener('click',reset);$('seedBtn').addEventListener('click',()=>{seedInfections(Math.max(1,Math.round(params().initialInfected/2)));draw();updateMetrics()});['showConnections','showTrails','showGrid'].forEach(id=>{const el=$(id); if(el) el.addEventListener('change',draw);});$('loginBtn').addEventListener('click',adminLogin);$('saveAdminBtn').addEventListener('click',saveAdminChanges);$('resetAdminBtn').addEventListener('click',resetAdminData);$('exportAdminBtn').addEventListener('click',exportAdminData);$('importAdminInput').addEventListener('change',importAdminData)}
function adminLogin(){if($('adminPassword').value!==ADMIN_PASSWORD){alert('Senha incorreta.');return}$('loginBox').hidden=true;$('adminBox').hidden=false;fillAdminEditors()}
function fillAdminEditors(){$('diseaseEditor').value=JSON.stringify(diseases,null,2);$('referenceEditor').value=JSON.stringify(references,null,2);$('contentEditor').value=JSON.stringify(content,null,2)}
function saveAdminChanges(){try{const nd=JSON.parse($('diseaseEditor').value),nr=JSON.parse($('referenceEditor').value),nc=JSON.parse($('contentEditor').value);if(!Array.isArray(nd))throw new Error('Doenças precisa ser uma lista.');if(!Array.isArray(nr))throw new Error('Referências precisa ser uma lista.');diseases=nd;references=nr;content=nc;saveJSON(STORAGE_KEYS.diseases,diseases);saveJSON(STORAGE_KEYS.references,references);saveJSON(STORAGE_KEYS.content,content);state.diseaseId=diseases[0]?.id;refreshAll();alert('Alterações salvas neste navegador.')}catch(e){alert('Erro no JSON: '+e.message)}}
function resetAdminData(){if(!confirm('Restaurar dados padrão?'))return;localStorage.removeItem(STORAGE_KEYS.diseases);localStorage.removeItem(STORAGE_KEYS.references);localStorage.removeItem(STORAGE_KEYS.content);diseases=structuredClone(DEFAULT_DISEASES);references=structuredClone(DEFAULT_REFERENCES);content=structuredClone(DEFAULT_CONTENT);state.diseaseId=diseases[1]?.id||diseases[0]?.id;refreshAll();fillAdminEditors()}
function exportAdminData(){const blob=new Blob([JSON.stringify({diseases,references,content},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='epicdri-dados.json';a.click();URL.revokeObjectURL(a.href)}
function importAdminData(e){const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(String(reader.result));if(!Array.isArray(data.diseases)||!Array.isArray(data.references)||!data.content)throw new Error('O arquivo deve conter diseases, references e content.');diseases=data.diseases;references=data.references;content=data.content;saveJSON(STORAGE_KEYS.diseases,diseases);saveJSON(STORAGE_KEYS.references,references);saveJSON(STORAGE_KEYS.content,content);state.diseaseId=diseases[0]?.id;refreshAll();fillAdminEditors();alert('Dados importados.')}catch(err){alert('Falha ao importar: '+err.message)}};reader.readAsText(file)}
function refreshAll(){populateDiseaseSelect();renderContentTabs();renderDiseaseCards();renderReferences();setControlsFromDisease(getSelectedDisease());initAgents()}
function init(){setupEvents();refreshAll()}
init();
