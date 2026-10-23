const C='hbc-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!='GET'||u.origin!=location.origin)return;
const k=u.origin+u.pathname,imm=/\/[ts]-[0-9a-f]+\.bin$/.test(u.pathname);
const net=()=>fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put(k,y))}return x});
e.respondWith(imm?caches.match(k).then(m=>m||net()):net().catch(()=>caches.match(k)))});
