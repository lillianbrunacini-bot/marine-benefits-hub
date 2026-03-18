// Semper Sorted - complete fixed script

const PAY={'E-1':[1833,1833,1833,1833,1833,1833,1833,1833,1833,1833,1833,1833],'E-2':[2055,2055,2055,2055,2055,2055,2055,2055,2055,2055,2055,2055],'E-3':[2161,2161,2272,2272,2272,2272,2272,2272,2272,2272,2272,2272],'E-4':[2393,2393,2531,2645,2745,2745,2745,2745,2745,2745,2745,2745],'E-5':[2610,2610,2730,2880,3014,3134,3213,3213,3213,3213,3213,3213],'E-6':[2848,2848,2979,3090,3213,3389,3494,3566,3566,3566,3566,3566],'E-7':[3294,3294,3408,3530,3671,3836,3969,4104,4245,4342,4447,4561],'E-8':[4739,4739,4883,5033,5183,5278,5416,5557,5695,5795,5878,5878],'E-9':[5789,5789,5789,5961,6133,6307,6482,6655,6827,7001,7174,7348],'W-1':[3399,3546,3628,3711,3837,3964,4090,4219,4346,4473,4601,4730],'W-2':[3868,4052,4181,4311,4440,4570,4699,4829,4958,5088,5217,5347],'W-3':[4381,4563,4694,4824,4955,5085,5215,5346,5476,5607,5736,5867],'W-4':[4783,4969,5099,5229,5359,5489,5619,5749,5879,6009,6139,6269],'O-1':[3637,3758,3898,3898,3898,3898,3898,3898,3898,3898,3898,3898],'O-2':[4187,4772,5503,5503,5503,5503,5503,5503,5503,5503,5503,5503],'O-3':[4862,5503,5932,6218,6503,6800,6986,6986,6986,6986,6986,6986],'O-4':[5553,6431,6858,7155,7407,7655,7990,8238,8381,8381,8381,8381],'O-5':[6432,7264,7752,8018,8248,8490,8665,9059,9313,9517,9617,9617],'O-6':[7733,8493,9058,9058,9165,9544,9597,9597,9852,10331,10636,10936],'O-7':[10014,10476,10680,10873,11171,11562,11835,12107,12380,12652,13198,13744],'O-8':[12131,12523,12797,13063,13340,13834,14183,14535,14797,15296,15592,15888]};
const YOS_IDX=[0,2,3,4,6,8,10,12,14,16,18,20];
const BAH={'pendleton':{'E-1':1332,'E-2':1332,'E-3':1365,'E-4':1620,'E-5':1764,'E-6':1890,'E-7':2034,'E-8':2214,'E-9':2364,'W-1':1944,'W-2':2034,'W-3':2124,'O-1':2016,'O-2':2208,'O-3':2430,'O-4':2628,'O-5':2862,'O-6':3132},'pendleton_d':{'E-1':1656,'E-2':1656,'E-3':1700,'E-4':2016,'E-5':2196,'E-6':2358,'E-7':2538,'E-8':2760,'E-9':2946,'W-1':2418,'W-2':2538,'W-3':2652,'O-1':2508,'O-2':2754,'O-3':3024,'O-4':3270,'O-5':3570,'O-6':3906},'29palms':{'E-1':1032,'E-2':1032,'E-3':1056,'E-4':1254,'E-5':1368,'E-6':1464,'E-7':1572,'E-8':1716,'E-9':1830,'W-1':1500,'W-2':1572,'W-3':1644,'O-1':1440,'O-2':1584,'O-3':1740,'O-4':1884,'O-5':2052,'O-6':2244},'29palms_d':{'E-1':1290,'E-2':1290,'E-3':1314,'E-4':1572,'E-5':1716,'E-6':1836,'E-7':1968,'E-8':2148,'E-9':2286,'W-1':1878,'W-2':1968,'W-3':2058,'O-1':1800,'O-2':1980,'O-3':2166,'O-4':2352,'O-5':2562,'O-6':2808},'quantico':{'E-1':1812,'E-2':1812,'E-3':1860,'E-4':2208,'E-5':2412,'E-6':2580,'E-7':2772,'E-8':3024,'E-9':3228,'W-1':2652,'W-2':2772,'W-3':2892,'O-1':2700,'O-2':2976,'O-3':3276,'O-4':3540,'O-5':3864,'O-6':4236},'quantico_d':{'E-1':2256,'E-2':2256,'E-3':2316,'E-4':2760,'E-5':3012,'E-6':3216,'E-7':3456,'E-8':3768,'E-9':4020,'W-1':3312,'W-2':3456,'W-3':3600,'O-1':3360,'O-2':3696,'O-3':4056,'O-4':4404,'O-5':4800,'O-6':5268},'miramar':{'E-1':1584,'E-2':1584,'E-3':1626,'E-4':1926,'E-5':2100,'E-6':2250,'E-7':2418,'E-8':2640,'E-9':2814,'W-1':2310,'W-2':2418,'W-3':2526,'O-1':2400,'O-2':2628,'O-3':2892,'O-4':3126,'O-5':3402,'O-6':3726},'miramar_d':{'E-1':1974,'E-2':1974,'E-3':2028,'E-4':2394,'E-5':2616,'E-6':2802,'E-7':3012,'E-8':3288,'E-9':3504,'W-1':2880,'W-2':3012,'W-3':3144,'O-1':2988,'O-2':3276,'O-3':3600,'O-4':3900,'O-5':4242,'O-6':4656},'lejeune':{'E-1':1110,'E-2':1110,'E-3':1140,'E-4':1350,'E-5':1476,'E-6':1578,'E-7':1698,'E-8':1848,'E-9':1974,'W-1':1620,'W-2':1698,'W-3':1776,'O-1':1554,'O-2':1710,'O-3':1878,'O-4':2034,'O-5':2214,'O-6':2424},'lejeune_d':{'E-1':1386,'E-2':1386,'E-3':1422,'E-4':1680,'E-5':1836,'E-6':1968,'E-7':2118,'E-8':2304,'E-9':2460,'W-1':2022,'W-2':2118,'W-3':2208,'O-1':1938,'O-2':2130,'O-3':2346,'O-4':2538,'O-5':2760,'O-6':3024}};
const STATION_MAP={'pendleton':['pendleton','camp pendleton'],'29palms':['29 palms','twentynine palms','29palms','stumps'],'quantico':['quantico'],'miramar':['miramar'],'lejeune':['lejeune','camp lejeune','jacksonville'],'okinawa':['okinawa','oki','butler','foster','hansen','schwab','futenma','kinser','courtney'],'hawaii':['hawaii','kaneohe','kbay','k-bay','mcbh','mcb hawaii']};
const BAS={officer:311.68,enlisted:460.16};
let P={},msgs=[];
function getPayIdx(y){for(let i=YOS_IDX.length-1;i>=0;i--){if(y>=YOS_IDX[i])return i;}return 0;}
function getBasePay(g,y){const a=PAY[g];if(!a)return 2000;return a[getPayIdx(parseInt(y)||0)]||a[0];}
function resolveStation(s){const sl=s.toLowerCase();for(const[k,a]of Object.entries(STATION_MAP)){if(a.some(x=>sl.includes(x)))return k;}return null;}
function getBAH(g,housing,stKey){if(housing==='barracks')return 0;if(!stKey||stKey==='okinawa')return null;const t=BAH[housing==='dep'?stKey+'_d':stKey];return t?t[g]||null:null;}
function fmt(n){return'$'+Math.round(n).toLocaleString();}
function launch(){const grade=document.getElementById('ob-grade').value,yos=document.getElementById('ob-yos').value,housing=document.getElementById('ob-housing').value,station=document.getElementById('ob-station').value;const depcountEl=document.getElementById('ob-depcount');const depcount=depcountEl?parseInt(depcountEl.value)||1:1;console.log('launch called - grade:',grade,'station:',station);if(!grade||!station){alert('Please select your rank and duty station.');return;}P={grade,yos:parseInt(yos)||0,housing,station,depcount:housing==='dep'?depcount:0};try{buildUI();}catch(e){console.error('buildUI error:',e);}document.getElementById('ob').style.display='none';document.getElementById('main').classList.add('on');document.getElementById('ai-intro').textContent='You are a '+grade+' with '+P.yos+' years at '+station+'.';
  // Auto-select base in facilities tab
  const stKey=resolveStation(station);
  const baseMap={'pendleton':'pendleton','29palms':'29palms','quantico':'quantico','lejeune':'lejeune','miramar':'miramar','hawaii':'hawaii','okinawa':'okinawa'};
  if(stKey&&baseMap[stKey]){
    const sel=document.getElementById('fac-base-select');
    if(sel){sel.value=baseMap[stKey];switchBase(baseMap[stKey]);}
  }}
function buildUI(){const{grade,yos,housing,station}=P,isO=grade.startsWith('O')||grade.startsWith('W'),bp=getBasePay(grade,yos),stKey=resolveStation(station),bah=getBAH(grade,housing,stKey),bas=isO?BAS.officer:BAS.enlisted,bahKnown=bah!==null&&housing!=='barracks',total=bp+(bahKnown?bah:0)+bas;document.getElementById('ava').textContent=grade;document.getElementById('h-name').textContent=grade+' \u2014 Marine';document.getElementById('h-meta').textContent=station+(housing==='dep'?' \u00b7 '+P.depcount+' dependent'+(P.depcount!==1?'s':''):housing==='barracks'?' \u00b7 barracks':' \u00b7 no dependents');document.getElementById('h-pay').textContent=fmt(total)+(bahKnown?'':'+');const html='<div class="row"><span class="rl">Base pay ('+grade+', '+yos+' yrs)</span><span class="rv g">'+fmt(bp)+'/mo</span></div>'+(housing==='barracks'?'<div class="row"><span class="rl">BAH</span><span class="rv dim">Waived (barracks)</span></div>':bahKnown?'<div class="row"><span class="rl">BAH ('+station+')</span><span class="rv g">'+fmt(bah)+'/mo \u2014 tax-free</span></div>':'<div class="row"><span class="rl">BAH ('+station+')</span><span class="rv dim">Look up at DTMO.mil</span></div>')+'<div class="row"><span class="rl">BAS (food allowance)</span><span class="rv g">'+fmt(bas)+'/mo \u2014 tax-free</span></div><div class="row" style="border-top:1px solid var(--border);padding-top:9px;margin-top:2px;"><span class="rl" style="font-weight:600;color:var(--ink);">Total estimate</span><span class="rv g" style="font-size:14px;">'+fmt(total)+'/mo'+(bahKnown?'':' + BAH')+'</span></div>';document.getElementById('ov-pay-rows').innerHTML=html;document.getElementById('pay-rows').innerHTML=html;document.getElementById('pay-desc').textContent=grade+' \u00b7 '+yos+' yrs \u00b7 '+station;document.getElementById('bah-desc').textContent=grade+' \u00b7 '+station;const br=document.getElementById('bah-rows');if(housing==='barracks'){br.innerHTML='<div class="row"><span class="rl">Living in barracks \u2014 BAH is waived</span><span class="rv dim">n/a</span></div>';}else if(bahKnown){const nd=getBAH(grade,'nodep',stKey),wd=getBAH(grade,'dep',stKey);br.innerHTML='<div class="row"><span class="rl">Without dependents</span><span class="rv">'+(nd?fmt(nd):'--')+'</span></div><div class="row"><span class="rl">With dependents</span><span class="rv">'+(wd?fmt(wd):'--')+'</span></div><div class="row"><span class="rl">Your current rate</span><span class="rv g">'+fmt(bah)+'/mo \u2014 tax-free</span></div>';}else{br.innerHTML='<div class="row"><span class="rl">Exact BAH for '+station+'</span><span class="rv dim">Look up at DTMO.mil or ask the AI tab</span></div>';}buildPayTable(grade);}
function buildPayTable(ug){const grades=['E-1','E-2','E-3','E-4','E-5','E-6','E-7','E-8','E-9','W-1','W-2','W-3','O-1','O-2','O-3','O-4','O-5','O-6'],cols=[0,2,4,6,8];let h='<tr><th>Grade</th>'+cols.map(i=>'<th>'+YOS_IDX[i]+' yrs</th>').join('')+'</tr>';grades.forEach(g=>{const a=PAY[g]||[],hl=(g===ug)?'class="hl"':'';h+='<tr '+hl+'><td>'+g+'</td>'+cols.map(i=>'<td>'+(a[i]?'$'+Math.round(a[i]/100)*100/1000+'k':'--')+'</td>').join('')+'</tr>';});document.getElementById('pay-table').innerHTML=h;}
function tab(name,el){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));document.querySelectorAll('.panel').forEach(p=>p.classList.remove('on'));if(el)el.classList.add('on');const p=document.getElementById('p-'+name);if(p)p.classList.add('on');const body=document.querySelector('.body');if(body)body.scrollTop=0;if(name==='facilities')initFacilities();}
function buildSys(){const{grade,yos,housing,station}=P,isO=grade.startsWith('O')||grade.startsWith('W'),bp=getBasePay(grade,yos),stKey=resolveStation(station),bah=getBAH(grade,housing,stKey),bas=isO?BAS.officer:BAS.enlisted;return 'You are a friendly, knowledgeable USMC benefits assistant built into the Semper Sorted app. Be warm, direct, and plain-English. Keep answers under 200 words. Avoid jargon — if you must use a military term, explain it in plain English immediately after.\n\nFormatting rules:\n- Use **bold** for key numbers, dollar amounts, and important terms\n- Use bullet points (- ) when listing 3 or more items\n- Use short paragraphs — never one giant wall of text\n- Lead with the direct answer, then explain\n- End with one actionable next step when relevant\n\nMarine profile: Grade: '+grade+', Years of service: '+yos+', Station: '+station+', Housing: '+housing+', Dependents: '+(P.depcount||0)+', Base pay: $'+bp+'/mo, BAH: '+(bah?'$'+bah:bah===0?'waived (barracks)':'unknown for this station')+', BAS: $'+Math.round(bas)+'/mo.\n\nYou can answer questions about: USMC pay, BAH, BAS, TRICARE, GI Bill, Tuition Assistance, VA disability, PCS entitlements, special pays, SCRA, military spouse benefits, discounts, DEERS, base resources, and general military life questions. Always use 2026 rates. Never make up numbers — if unsure, say so and direct them to the official source.';}
async function sendMsg(){const inp=document.getElementById('ask-input'),text=inp.value.trim();if(!text||!P.grade)return;inp.value='';addMsg(text,'user');document.getElementById('suggests').style.display='none';await callAI(text);}
function sendSuggest(el){document.getElementById('ask-input').value=el.textContent;sendMsg();}
function inputKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();}}
function parseMarkdown(text){
  text=text.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  text=text.replace(/\*([^*\n]+?)\*/g,'<em>$1</em>');
  var lines=text.split('\n'),html='',inList=false;
  for(var i=0;i<lines.length;i++){
    var line=lines[i];
    var bm=line.match(/^[-\u2022]\s+(.+)/);
    if(bm){if(!inList){html+='<ul style="margin:6px 0 6px 16px;padding:0;">';inList=true;}html+='<li style="margin-bottom:3px;">'+bm[1]+'</li>';}
    else{if(inList){html+='</ul>';inList=false;}if(line.trim()==='')html+='<br>';else html+=line+'<br>';}
  }
  if(inList)html+='</ul>';
  return html.replace(/(<br>)+$/,'');
}
function addMsg(text,role){const c=document.getElementById('ask-msgs'),div=document.createElement('div');div.className='msg msg-'+(role==='user'?'user':'ai');const b=document.createElement('div');b.className='msg-bubble'+(role==='ai'&&text==='...'?' typing':'');if(role==='ai'&&text!=='...'){b.innerHTML=parseMarkdown(text);}else{b.textContent=text;}div.appendChild(b);c.appendChild(div);c.scrollTop=c.scrollHeight;return b;}


function toggleDepCount(val){
  var wrap = document.getElementById('dep-count-wrap');
  if(!wrap) return;
  wrap.style.display = (val === 'dep') ? 'block' : 'none';
}


const FACILITIES = {
  pendleton: {
    name: 'Camp Pendleton, CA',
    mapQuery: 'key+facilities+Camp+Pendleton+California',
    mapCenter: '33.2133,-117.3897',
    facilities: [
      { name: 'Naval Hospital Camp Pendleton', category: 'Healthcare', icon: '🏥', bg: '#fff0f0', color: '#ef4444', addr: 'Building H-100, Camp Pendleton, CA 92055', phone: '(760) 725-1288', hours: 'Mon–Fri 7:30am–4:30pm', map: 'Naval+Hospital+Camp+Pendleton+CA' },
      { name: 'TRICARE Health Benefits', category: 'TRICARE', icon: '💊', bg: '#fff0f0', color: '#ef4444', addr: 'Naval Hospital, Camp Pendleton', phone: '(760) 725-1262', hours: 'Mon–Fri 7:30am–4:00pm', map: 'Naval+Hospital+Camp+Pendleton+CA' },
      { name: 'DEERS / ID Cards (Main Gate)', category: 'Admin', icon: '🪪', bg: '#fffbeb', color: '#d97706', addr: 'Bldg 22270, Mainside, Camp Pendleton', phone: '(760) 725-2768', hours: 'Mon–Fri 7:30am–3:30pm', map: 'Camp+Pendleton+Main+Gate+ID+Office' },
      { name: 'DEERS / ID Cards (North)', category: 'Admin', icon: '🪪', bg: '#fffbeb', color: '#d97706', addr: 'Sea Side Plaza, North Camp Pendleton', phone: '(760) 763-6476', hours: 'Mon–Fri 7:30am–3:30pm', map: 'Camp+Pendleton+North+Pass+ID' },
      { name: 'Commissary', category: 'Shopping', icon: '🛒', bg: '#eff6ff', color: '#3b82f6', addr: 'Pacific Plaza, Vandergrift Blvd, Camp Pendleton', phone: '(760) 725-5175', hours: 'Tue–Sat 9am–7pm, Sun 10am–6pm', map: 'Camp+Pendleton+Commissary+Pacific+Plaza' },
      { name: 'Marine Corps Exchange (MCX)', category: 'Shopping', icon: '🏪', bg: '#eff6ff', color: '#3b82f6', addr: 'Pacific Plaza, near Main Gate, Camp Pendleton', phone: '(760) 725-5175', hours: 'Mon–Sat 9am–8pm, Sun 10am–7pm', map: 'Marine+Corps+Exchange+Camp+Pendleton' },
      { name: 'Finance Office', category: 'Admin', icon: '💰', bg: '#ecfdf5', color: '#10b981', addr: 'Bldg 1254, Mainside, Camp Pendleton', phone: '(760) 725-5391', hours: 'Mon–Fri 7:30am–4:00pm', map: 'Camp+Pendleton+Finance+Office' },
      { name: 'Legal Assistance (JAG)', category: 'Admin', icon: '⚖️', bg: '#f5f3ff', color: '#8b5cf6', addr: 'Bldg 1254, Mainside, Camp Pendleton', phone: '(760) 725-6558', hours: 'Mon–Fri 8:00am–4:00pm', map: 'Camp+Pendleton+Legal+Office' },
    ]
  },
  '29palms': {
    name: '29 Palms (MCAGCC), CA',
    mapQuery: 'key+facilities+MCAGCC+Twentynine+Palms+California',
    mapCenter: '34.1371,-116.0545',
    facilities: [
      { name: 'Robert E. Bush Naval Hospital', category: 'Healthcare', icon: '🏥', bg: '#fff0f0', color: '#ef4444', addr: '1145 Sturgis Rd, Twentynine Palms, CA 92278', phone: '(760) 830-2190', hours: 'Mon–Fri 7:30am–4:30pm', map: 'Robert+E+Bush+Naval+Hospital+29+Palms' },
      { name: 'DEERS / ID Card Office', category: 'Admin', icon: '🪪', bg: '#fffbeb', color: '#d97706', addr: '1551 Fourth Street, MCAGCC, 29 Palms, CA 92278', phone: '(760) 830-5365', hours: 'Mon–Fri 7:30am–3:30pm', map: 'MCAGCC+29+Palms+ID+Card+DEERS' },
      { name: 'Commissary', category: 'Shopping', icon: '🛒', bg: '#eff6ff', color: '#3b82f6', addr: 'Del Valle Drive, Bldg 1025, 29 Palms, CA 92278', phone: '(760) 830-7578', hours: 'Tue–Sat 9am–6pm, Sun 10am–5pm', map: 'Commissary+Twentynine+Palms+MCAGCC' },
      { name: 'Marine Corps Exchange (MCX)', category: 'Shopping', icon: '🏪', bg: '#eff6ff', color: '#3b82f6', addr: 'Building 1024, Del Valle St, 29 Palms, CA 92278', phone: '(760) 830-6163', hours: 'Mon–Sat 9am–7pm, Sun 10am–6pm', map: 'MCX+Exchange+Twentynine+Palms' },
      { name: 'Finance Office', category: 'Admin', icon: '💰', bg: '#ecfdf5', color: '#10b981', addr: '1521 Fourth Street, MCAGCC, 29 Palms', phone: '(760) 830-7342', hours: 'Mon–Fri 7:30am–4:00pm', map: 'Finance+Office+MCAGCC+29+Palms' },
      { name: 'MCFTB / Family Services', category: 'Family', icon: '👨‍👩‍👧', bg: '#fae8ff', color: '#9333ea', addr: 'Village Center, MCAGCC 29 Palms', phone: '(760) 830-6605', hours: 'Mon–Fri 8:00am–4:30pm', map: 'Family+Services+MCAGCC+29+Palms' },
    ]
  },
  quantico: {
    name: 'MCB Quantico, VA',
    mapQuery: 'key+facilities+Marine+Corps+Base+Quantico+Virginia',
    mapCenter: '38.5232,-77.3141',
    facilities: [
      { name: 'Naval Health Clinic Quantico', category: 'Healthcare', icon: '🏥', bg: '#fff0f0', color: '#ef4444', addr: '3259 Catlin Ave, Quantico, VA 22134', phone: '(703) 784-1725', hours: 'Mon–Fri 7:30am–4:00pm', map: 'Naval+Health+Clinic+Quantico+VA' },
      { name: 'DEERS / ID Card Office', category: 'Admin', icon: '🪪', bg: '#fffbeb', color: '#d97706', addr: 'Building 2096, MCB Quantico, VA 22134', phone: '(703) 432-0218', hours: 'Mon–Fri 7:30am–3:30pm', map: 'MCB+Quantico+DEERS+ID+Card' },
      { name: 'Commissary', category: 'Shopping', icon: '🛒', bg: '#eff6ff', color: '#3b82f6', addr: 'MCB Quantico, VA 22134', phone: '(703) 432-8099', hours: 'Tue–Sat 9am–7pm, Sun 10am–6pm', map: 'Commissary+MCB+Quantico+VA' },
      { name: 'Marine Corps Exchange (MCX)', category: 'Shopping', icon: '🏪', bg: '#eff6ff', color: '#3b82f6', addr: 'MCB Quantico, VA 22134', phone: '(703) 432-8800', hours: 'Mon–Sat 9am–8pm, Sun 10am–7pm', map: 'Marine+Corps+Exchange+Quantico+VA' },
      { name: 'Finance Office', category: 'Admin', icon: '💰', bg: '#ecfdf5', color: '#10b981', addr: 'MCB Quantico, VA 22134', phone: '(703) 784-2400', hours: 'Mon–Fri 7:30am–4:00pm', map: 'Finance+Office+MCB+Quantico' },
      { name: 'Legal Assistance (JAG)', category: 'Admin', icon: '⚖️', bg: '#f5f3ff', color: '#8b5cf6', addr: 'MCB Quantico, VA 22134', phone: '(703) 784-3122', hours: 'Mon–Fri 8:00am–4:00pm', map: 'Legal+Office+MCB+Quantico' },
      { name: 'NMCRS (Emergency Financial Aid)', category: 'Family', icon: '🤝', bg: '#fae8ff', color: '#9333ea', addr: 'MCB Quantico, VA 22134', phone: '(703) 784-9754', hours: 'Mon–Fri 8:00am–4:00pm', map: 'Navy+Marine+Corps+Relief+Society+Quantico' },
    ]
  },
  lejeune: {
    name: 'Camp Lejeune, NC',
    mapQuery: 'key+facilities+Camp+Lejeune+North+Carolina',
    mapCenter: '34.6785,-77.3411',
    facilities: [
      { name: 'Naval Hospital Camp Lejeune', category: 'Healthcare', icon: '🏥', bg: '#fff0f0', color: '#ef4444', addr: '100 Brewster Blvd, Camp Lejeune, NC 28547', phone: '(910) 450-4300', hours: 'Mon–Fri 7:30am–4:30pm', map: 'Naval+Hospital+Camp+Lejeune+NC' },
      { name: 'DEERS / ID Card Office', category: 'Admin', icon: '🪪', bg: '#fffbeb', color: '#d97706', addr: 'Building 1, Stone St, Camp Lejeune, NC 28547', phone: '(910) 451-7425', hours: 'Mon–Fri 7:30am–3:30pm', map: 'Camp+Lejeune+DEERS+ID+Card' },
      { name: 'Commissary', category: 'Shopping', icon: '🛒', bg: '#eff6ff', color: '#3b82f6', addr: 'Holcomb Blvd, Camp Lejeune, NC 28547', phone: '(910) 451-2606', hours: 'Tue–Sat 9am–7pm, Sun 10am–6pm', map: 'Commissary+Camp+Lejeune+NC' },
      { name: 'Marine Corps Exchange (MCX)', category: 'Shopping', icon: '🏪', bg: '#eff6ff', color: '#3b82f6', addr: 'Holcomb Blvd, Camp Lejeune, NC 28547', phone: '(910) 353-2461', hours: 'Mon–Sat 9am–8pm, Sun 10am–7pm', map: 'MCX+Camp+Lejeune+NC' },
      { name: 'Finance Office', category: 'Admin', icon: '💰', bg: '#ecfdf5', color: '#10b981', addr: 'Building 1, Stone St, Camp Lejeune', phone: '(910) 451-5757', hours: 'Mon–Fri 7:30am–4:00pm', map: 'Finance+Office+Camp+Lejeune' },
    ]
  },
  miramar: {
    name: 'MCAS Miramar, CA',
    mapQuery: 'key+facilities+MCAS+Miramar+San+Diego+California',
    mapCenter: '32.8684,-117.1425',
    facilities: [
      { name: 'Branch Health Clinic Miramar', category: 'Healthcare', icon: '🏥', bg: '#fff0f0', color: '#ef4444', addr: 'Bldg 2180, MCAS Miramar, CA 92145', phone: '(858) 577-8500', hours: 'Mon–Fri 7:30am–4:00pm', map: 'Branch+Health+Clinic+MCAS+Miramar' },
      { name: 'DEERS / ID Card Office', category: 'Admin', icon: '🪪', bg: '#fffbeb', color: '#d97706', addr: 'MCAS Miramar, CA 92145', phone: '(858) 577-1110', hours: 'Mon–Fri 7:30am–3:30pm', map: 'MCAS+Miramar+ID+Card+DEERS' },
      { name: 'Commissary', category: 'Shopping', icon: '🛒', bg: '#eff6ff', color: '#3b82f6', addr: 'MCAS Miramar, CA 92145', phone: '(858) 537-3560', hours: 'Tue–Sat 9am–7pm, Sun 10am–6pm', map: 'Commissary+MCAS+Miramar' },
      { name: 'Marine Corps Exchange (MCX)', category: 'Shopping', icon: '🏪', bg: '#eff6ff', color: '#3b82f6', addr: 'MCAS Miramar, CA 92145', phone: '(858) 537-1680', hours: 'Mon–Sat 9am–8pm, Sun 10am–7pm', map: 'MCX+MCAS+Miramar+CA' },
    ]
  }
};

function renderFacilities(baseKey) {
  var base = FACILITIES[baseKey];
  if (!base) return;
  var mapFrame = document.getElementById('fac-map');
  var firstFac = base.facilities[0];
  mapFrame.src = 'https://maps.google.com/maps?q=' + firstFac.map + '&output=embed&z=14';
  document.getElementById('map-label').textContent = 'Showing: ' + base.name + ' key facilities';
  var list = document.getElementById('fac-list');
  var seen = [];
  var categories = base.facilities.map(function(f){return f.category;}).filter(function(c,i,a){return a.indexOf(c)===i;});
  var html = '';
  categories.forEach(function(cat) {
    var facs = base.facilities.filter(function(f){return f.category===cat;});
    html += '<div><div class="sh">' + cat + '</div><div class="fac-grid">';
    facs.forEach(function(f) {
      var url = 'https://maps.google.com/maps?q=' + f.map;
      html += '<div class="fac-card" onclick="window.open('' + url + '','_blank')">';
      html += '<div class="fac-icon" style="background:' + f.bg + ';"><span style="font-size:18px;">' + f.icon + '</span></div>';
      html += '<div class="fac-name">' + f.name + '</div>';
      html += '<div class="fac-addr">' + f.addr + '</div>';
      html += '<div class="fac-phone">' + f.phone + '</div>';
      html += '<div class="fac-hours">' + f.hours + '</div>';
      html += '</div>';
    });
    html += '</div></div>';
  });
  list.innerHTML = html;
}

// Auto-select base matching user's duty station on load
function initFacilities() {
  if (!P.station) return;
  const s = P.station.toLowerCase();
  let baseKey = 'pendleton';
  if (s.includes('29') || s.includes('palms') || s.includes('stumps')) baseKey = '29palms';
  else if (s.includes('quantico')) baseKey = 'quantico';
  else if (s.includes('lejeune') || s.includes('jacksonville')) baseKey = 'lejeune';
  else if (s.includes('miramar')) baseKey = 'miramar';
  
  const sel = document.getElementById('fac-base-sel');
  if (sel) sel.value = baseKey;
  renderFacilities(baseKey);
}


function switchBase(val){
  document.querySelectorAll('.base-content').forEach(el=>el.classList.remove('on'));
  const target=document.getElementById('fac-'+val);
  if(target)target.classList.add('on');
}

function filterAcro(q){
  const items=document.querySelectorAll('.acro-item');
  const ql=q.toLowerCase();
  items.forEach(item=>{
    const terms=(item.dataset.terms||'')+item.textContent;
    item.style.display=terms.toLowerCase().includes(ql)?'':'none';
  });
}

async function callAI(userMsg){const btn=document.getElementById('ask-send');btn.disabled=true;const bubble=addMsg('...','ai');msgs.push({role:'user',content:userMsg});try{const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:msgs.slice(-10),system:buildSys()})});const data=await res.json();const reply=data.content?.[0]?.text||'Something went wrong. Try again.';bubble.classList.remove('typing');bubble.innerHTML=parseMarkdown(reply);msgs.push({role:'assistant',content:reply});}catch(e){bubble.classList.remove('typing');bubble.textContent='Connection error. Try again.';}btn.disabled=false;document.getElementById('ask-msgs').scrollTop=9999;}
