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
function toggleDepCount(val){
  var wrap=document.getElementById('dep-count-wrap');
  if(wrap)wrap.style.display=(val==='dep')?'block':'none';
}
function launch(){
  var grade=document.getElementById('ob-grade').value;
  var yos=document.getElementById('ob-yos').value;
  var housing=document.getElementById('ob-housing').value;
  var station=document.getElementById('ob-station').value;
  var depcountEl=document.getElementById('ob-depcount');
  var depcount=depcountEl?parseInt(depcountEl.value)||1:1;
  if(!grade||!station){alert('Please select your rank and duty station.');return;}
  P={grade:grade,yos:parseInt(yos)||0,housing:housing,station:station,depcount:housing==='dep'?depcount:0};
  try{buildUI();}catch(e){console.error('buildUI error:',e);}
  document.getElementById('ob').style.display='none';
  document.getElementById('main').classList.add('on');
  document.getElementById('ai-intro').textContent='You are a '+grade+' with '+P.yos+' years at '+station+'.';
  var stKey=resolveStation(station);
  var baseMap={'pendleton':'pendleton','29palms':'29palms','quantico':'quantico','lejeune':'lejeune','miramar':'miramar','hawaii':'hawaii','okinawa':'okinawa'};
  if(stKey&&baseMap[stKey]){var sel=document.getElementById('fac-base-select');if(sel){sel.value=baseMap[stKey];switchBase(baseMap[stKey]);}}
}
