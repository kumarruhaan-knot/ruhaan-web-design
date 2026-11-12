(()=>{'use strict';
const body=document.body,form=document.querySelector('[data-demo-form]'),service=form.elements.service;
const original=Object.fromEntries(['paper','ink','accent','panel','line','button-ink'].map(k=>[k,body.style.getPropertyValue('--'+k)]));
const palettes={original,sage:{paper:'#edf2e8',ink:'#263d2c',accent:'#46634a',panel:'#dfe8d7',line:'#263d2c40','button-ink':'#fff'},blue:{paper:'#edf3f6',ink:'#233b4b',accent:'#34627c',panel:'#dce7ee',line:'#233b4b40','button-ink':'#fff'}};
document.querySelectorAll('[data-palette]').forEach(b=>b.addEventListener('click',()=>{Object.entries(palettes[b.dataset.palette]).forEach(([k,v])=>body.style.setProperty('--'+k,v));document.querySelectorAll('[data-palette]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))}));
function choose(value,scroll=true){service.value=value;form.querySelector('[role=status]').hidden=true;if(scroll){document.querySelector('#enquire').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});service.focus({preventScroll:true})}}
document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.pick)));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{const section=b.closest('section');section.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));section.querySelectorAll('[data-category]').forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.category!==b.dataset.filter)}));
const quantity=document.querySelector('[data-quantity]'),brief=document.querySelector('[data-brief-note]');
function syncBrief(){if(!quantity)return;brief.textContent='Brief: '+service.value+' · '+quantity.value+' '+quantity.dataset.unit+'. Scope and price to be confirmed.'}
document.querySelectorAll('[data-job]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-job]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelector('[data-job-summary]').textContent=b.dataset.job;choose(b.dataset.job,false);syncBrief()}));
quantity?.addEventListener('input',syncBrief);service.addEventListener('change',()=>{syncBrief();form.querySelector('[role=status]').hidden=true});
form.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector('[role=status]');status.hidden=false;status.textContent='Your sample enquiry for “'+service.value+'” is ready'+(quantity?' ('+quantity.value+' '+quantity.dataset.unit+')':'')+'. On your own website, this step can deliver the request to your inbox or WhatsApp. Nothing has been sent, stored or booked in this demo.';status.scrollIntoView({block:'nearest',behavior:'smooth'})});
const dialog=document.querySelector('.lightbox'),large=dialog.querySelector('[data-large-photo]'),caption=dialog.querySelector('[data-photo-caption]');
document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{large.src=b.dataset.photo;large.alt=b.querySelector('img').alt;caption.textContent=b.dataset.caption;dialog.showModal()}));
dialog.querySelector('[data-close-photo]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
})();
