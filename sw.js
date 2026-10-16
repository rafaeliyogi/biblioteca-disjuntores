const V="bib-disj-v2";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","externa.jpg","fotomecanismo.jpg","mecanismo.jpg","polo.jpg","polocatalogo.jpg","vacuo.jpg","eletrico.jpg","lubrificacao.jpg","erosao.jpg","placa.jpg","ensaio.jpg","real_mecanismo.jpg","real_frente.jpg","real_esq.jpg","real_dir.jpg","real_comando.jpg","real_painel.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET")return;
 const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(r.headers.has("range"))return;
 const net=()=>fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res});
 if(r.mode==="navigate"||u.pathname.endsWith(".html")||u.pathname.endsWith("/")||u.pathname.endsWith(".pdf")){
  e.respondWith(net().catch(()=>caches.match(r).then(m=>m||caches.match("index.html")||caches.match("./"))));
 }else{
  e.respondWith(caches.match(r).then(m=>{const f=net().catch(()=>null);return m||f.then(x=>x||Response.error())}));
 }
});
