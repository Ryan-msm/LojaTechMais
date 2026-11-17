(function(){
'use strict';
var app=document.getElementById('app'),log=document.getElementById('log'),anu=document.getElementById('anuncios'),
grade=document.getElementById('grade'),lc=document.getElementById('lista-carrinho'),cv=document.getElementById('carr-vazio'),
lcomp=document.getElementById('lista-comp'),compv=document.getElementById('comp-vazio'),cont=document.getElementById('contador'),tot=document.getElementById('total');

var CH='lqt_prefs',prefs={t2:false,t3:false,hc:false,esp:false,links:false,mov:false,leg:true,audio:true};
try{Object.assign(prefs,JSON.parse(localStorage.getItem(CH)||'{}'))}catch(e){}
function salvar(){try{localStorage.setItem(CH,JSON.stringify(prefs))}catch(e){}}

function aplicar(){
 app.classList.toggle('hc',prefs.hc);app.classList.toggle('esp',prefs.esp);app.classList.toggle('links',prefs.links);
 app.classList.toggle('mov',prefs.mov);app.classList.toggle('t2',prefs.t2&&!prefs.t3);app.classList.toggle('t3',prefs.t3);
 document.querySelectorAll('[data-p]').forEach(function(b){var k=b.dataset.p;
  b.setAttribute('aria-pressed',String(k==='t1'?(!prefs.t2&&!prefs.t3):!!prefs[k]))});
 var bl=document.getElementById('btn-leg'),ba=document.getElementById('btn-audio');
 bl.setAttribute('aria-pressed',String(prefs.leg));bl.textContent=prefs.leg?'Legendas ligadas':'Legendas desligadas';
 ba.setAttribute('aria-pressed',String(prefs.audio));ba.textContent=prefs.audio?'Áudio ligado':'Áudio desligado';salvar()}

function hora(){var d=new Date();return ('0'+d.getMinutes()).slice(-2)+':'+('0'+d.getSeconds()).slice(-2)}
function legendar(t,q){if(!prefs.leg)return;var li=document.createElement('li');
 li.innerHTML='<span class="hora">'+hora()+'</span><b>'+(q||'Site')+':</b> ';li.appendChild(document.createTextNode(t));
 log.appendChild(li);while(log.children.length>8)log.removeChild(log.firstChild)}
function falar(t,q){legendar(t,q);if(!prefs.audio||!('speechSynthesis'in window))return;
 try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';u.rate=1.03;speechSynthesis.speak(u)}catch(e){}}
function anunciar(t){anu.textContent='';setTimeout(function(){anu.textContent=t},60)}
function piscar(el){if(!el||prefs.mov)return;el.classList.add('pisca');setTimeout(function(){el.classList.remove('pisca')},1500)}
function brl(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}

var ICO={ram:'<rect x="35" y="55" width="130" height="34" rx="4" fill="#0f766e"/><g fill="#f8fafc"><rect x="45" y="62" width="8" height="20"/><rect x="60" y="62" width="8" height="20"/><rect x="75" y="62" width="8" height="20"/><rect x="90" y="62" width="8" height="20"/><rect x="105" y="62" width="8" height="20"/></g><rect x="120" y="62" width="34" height="20" fill="#0b1b2b"/>',
ssd:'<rect x="50" y="52" width="100" height="40" rx="4" fill="#334155"/><rect x="62" y="62" width="60" height="6" fill="#94a3b8"/><rect x="62" y="76" width="40" height="6" fill="#64748b"/><rect x="132" y="62" width="10" height="20" fill="#e2e8f0"/>',
gpu:'<rect x="35" y="50" width="130" height="42" rx="4" fill="#1f2937"/><circle cx="70" cy="71" r="14" fill="#4b5563"/><circle cx="112" cy="71" r="14" fill="#4b5563"/><rect x="35" y="92" width="130" height="6" fill="#f59e0b"/>',
cpu:'<rect x="62" y="48" width="76" height="48" rx="4" fill="#475569"/><rect x="80" y="64" width="40" height="18" fill="#94a3b8"/><g stroke="#94a3b8" stroke-width="3"><line x1="70" y1="42" x2="70" y2="48"/><line x1="90" y1="42" x2="90" y2="48"/><line x1="110" y1="42" x2="110" y2="48"/><line x1="130" y1="42" x2="130" y2="48"/></g>',
mae:'<rect x="40" y="45" width="120" height="56" rx="4" fill="#1e293b"/><rect x="60" y="60" width="34" height="26" fill="#0f172a"/><rect x="108" y="58" width="8" height="30" fill="#f59e0b"/><rect x="122" y="58" width="8" height="30" fill="#f59e0b"/>',
mon:'<rect x="45" y="45" width="110" height="62" rx="5" fill="#0f172a"/><rect x="55" y="55" width="90" height="42" fill="#1d4ed8"/><rect x="88" y="107" width="24" height="8" fill="#475569"/>',
fonte:'<rect x="55" y="48" width="90" height="54" rx="4" fill="#111827"/><circle cx="100" cy="75" r="16" fill="#1f2937"/><rect x="146" y="68" width="8" height="12" fill="#94a3b8"/>'};

var P=[
{id:'ram',n:'Memória Kingston Fury Beast 16GB DDR4',p:249.9,c:'memorias',i:'ram',a:'Pente de memória verde com dissipador e contatos dourados',d:'DDR4 3200 MHz com dissipador metálico, indicada para multitarefa pesada.',e:15},
{id:'ssd',n:'SSD Kingston NV2 1TB NVMe M.2',p:419.9,c:'ssd',i:'ssd',a:'Placa preta compacta de SSD com etiqueta e conector lateral',d:'Leitura de até 3500 MB/s para acelerar sistema e jogos.',e:20},
{id:'gpu',n:'Placa de vídeo RTX 3060 12GB',p:1899,c:'gpu',i:'gpu',a:'Placa escura com duas ventoinhas e faixa amarela na base',d:'Desempenho em Full HD e Quad HD com ray tracing.',e:8},
{id:'cpu',n:'Processador Intel Core i5-10400F',p:629,c:'cpu',i:'cpu',a:'Chip cinza quadrado com contatos e pinos no topo',d:'Seis núcleos e doze threads para jogos e produtividade.',e:10},
{id:'mae',n:'Placa-mãe ASUS TUF B460M-PLUS',p:749.9,c:'placa-mae',i:'mae',a:'Placa escura com slot de CPU e encaixes de memória',d:'Dois slots M.2, DDR4 e proteção contra sobretensão.',e:5},
{id:'mon',n:'Monitor gamer 27 polegadas Quad HD 180Hz',p:1299,c:'monitor',i:'mon',a:'Monitor escuro com tela azul ligada sobre base',d:'Painel curvo QHD de 180 Hz com G-Sync e FreeSync.',e:6},
{id:'fonte',n:'Fonte 650W 80 Plus Bronze',p:389.9,c:'fonte',i:'fonte',a:'Caixa preta retangular com ventoinha circular frontal',d:'PFC ativo, cabos sleeved e proteção contra curto.',e:12}];

var filtro='todos',termo='',ordem='padrao',carrinho=[],comparar=[];

function lista(){
 var l=P.filter(function(p){
  var okc=filtro==='todos'||p.c===filtro;
  var okt=!termo||p.n.toLowerCase().indexOf(termo)>=0||p.d.toLowerCase().indexOf(termo)>=0;
  return okc&&okt});
 if(ordem==='menor')l.sort(function(a,b){return a.p-b.p});
 if(ordem==='maior')l.sort(function(a,b){return b.p-a.p});
 if(ordem==='az')l.sort(function(a,b){return a.n.localeCompare(b.n,'pt-BR')});
 return l}

function render(){
 var l=lista();grade.innerHTML='';
 l.forEach(function(p){
  var li=document.createElement('li');li.className='card';
  li.innerHTML='<svg viewBox="0 0 200 140" role="img" aria-label="'+p.a+'">'+ICO[p.i]+'</svg>'+
   '<p class="cat-tag">'+p.c.replace('-',' ')+'</p><h3>'+p.n+'</h3>'+
   '<p class="preco">'+brl(p.p)+'</p><p class="estoque">Estoque: '+p.e+' uni.</p>'+
   '<p class="desc">'+p.d+'</p><div class="linha">'+
   '<button class="btn" data-ouvir="'+p.id+'">Ouvir</button>'+
   '<button class="btn primario" data-add="'+p.id+'">Adicionar</button>'+
   '<button class="btn" data-comp="'+p.id+'" aria-pressed="false">Comparar</button></div>';
  li.querySelector('[data-ouvir]').setAttribute('aria-label','Ouvir descrição de '+p.n);
  li.querySelector('[data-add]').setAttribute('aria-label','Adicionar '+p.n+' ao carrinho');
  li.querySelector('[data-comp]').setAttribute('aria-label','Comparar '+p.n);
  if(comparar.indexOf(p.id)>=0)li.querySelector('[data-comp]').setAttribute('aria-pressed','true');
  grade.appendChild(li)});
 document.getElementById('sem-res').hidden=l.length>0;
 anunciar(l.length+(l.length===1?' peça exibida.':' peças exibidas.'))}

grade.addEventListener('click',function(ev){
 var b=ev.target.closest('button');if(!b)return;
 var id=b.dataset.ouvir||b.dataset.add||b.dataset.comp;
 var p=P.filter(function(x){return x.id===id})[0];if(!p)return;
 if(b.dataset.ouvir){falar(p.n+'. '+p.d+' Preço '+brl(p.p)+'. Estoque de '+p.e+' unidades.','Descrição');return}
 if(b.dataset.add){carrinho.push(p);renderCarrinho();anunciar(p.n+' adicionado ao carrinho.');
  legendar(p.n+' foi adicionado ao carrinho.','Carrinho');piscar(cont);return}
 if(b.dataset.comp){
  var i=comparar.indexOf(p.id);
  if(i>=0){comparar.splice(i,1);b.setAttribute('aria-pressed','false');anunciar(p.n+' removido da comparação.')}
  else{if(comparar.length>=3){anunciar('Limite de 3 itens na comparação.');falar('Limite de três itens na comparação.','Comparação');return}
   comparar.push(p.id);b.setAttribute('aria-pressed','true');anunciar(p.n+' marcado para comparação.')}
  renderComp()}});

function renderCarrinho(){
 lc.innerHTML='';
 carrinho.forEach(function(p,i){
  var li=document.createElement('li');
  li.innerHTML='<span>'+p.n+'</span><span class="preco">'+brl(p.p)+'</span>';
  var b=document.createElement('button');b.className='btn';b.textContent='Remover';
  b.style.minHeight='32px';b.style.fontSize='.76em';
  b.setAttribute('aria-label','Remover '+p.n+' do carrinho');
  b.addEventListener('click',function(){carrinho.splice(i,1);renderCarrinho();
   anunciar(p.n+' removido do carrinho.');legendar(p.n+' removido do carrinho.','Carrinho')});
  li.appendChild(b);lc.appendChild(li)});
 cv.hidden=carrinho.length>0;
 cont.textContent=carrinho.length===1?'1 item':carrinho.length+' itens';
 tot.textContent=brl(carrinho.reduce(function(s,p){return s+p.p},0))}

function renderComp(){
 lcomp.innerHTML='';
 comparar.forEach(function(id){
  var p=P.filter(function(x){return x.id===id})[0];if(!p)return;
  var li=document.createElement('li');li.textContent=p.n+' — '+brl(p.p);lcomp.appendChild(li)});
 compv.hidden=comparar.length>0}

function buscar(){
 termo=document.getElementById('busca').value.trim().toLowerCase();render();
 legendar(termo?'Busca por '+termo+'.':'Busca limpa.','Busca')}
document.getElementById('btn-buscar').addEventListener('click',buscar);
document.getElementById('busca').addEventListener('keydown',function(e){
 if(e.key==='Enter')buscar();
 if(e.key==='Escape'){this.value='';termo='';render();anunciar('Busca limpa.')}});

document.getElementById('cats').addEventListener('click',function(ev){
 var b=ev.target.closest('button');if(!b)return;filtro=b.dataset.cat;
 document.querySelectorAll('#cats button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
 render();legendar('Filtro: '+b.textContent+'.','Filtro')});

document.getElementById('ordenar').addEventListener('change',function(){
 ordem=this.value;render();
 legendar('Ordenação: '+this.options[this.selectedIndex].text+'.','Ordenação')});

document.querySelectorAll('[data-p]').forEach(function(b){
 b.addEventListener('click',function(){
  var k=b.dataset.p;
  if(k==='t1'){prefs.t2=prefs.t3=false}
  else if(k==='t2'){prefs.t2=true;prefs.t3=false}
  else if(k==='t3'){prefs.t3=true;prefs.t2=false}
  else prefs[k]=!prefs[k];
  aplicar();
  if(k==='hc')falar(prefs.hc?'Alto contraste ativado.':'Alto contraste desativado.');
  if(k==='t2'||k==='t3')falar('Tamanho do texto ajustado.');
  if(k==='mov'&&prefs.mov)falar('Movimento reduzido.')})});

document.getElementById('btn-reset').addEventListener('click',function(){
 prefs={t2:false,t3:false,hc:false,esp:false,links:false,mov:false,leg:true,audio:true};aplicar();falar('Preferências restauradas.')});
document.getElementById('btn-leg').addEventListener('click',function(){
 prefs.leg=!prefs.leg;aplicar();if(prefs.leg)legendar('Legendas reativadas.')});
document.getElementById('btn-audio').addEventListener('click',function(){
 prefs.audio=!prefs.audio;aplicar();
 if(!prefs.audio&&'speechSynthesis'in window)speechSynthesis.cancel();
 legendar(prefs.audio?'Áudio reativado.':'Áudio desligado. As legendas continuam.')});

var bp=document.getElementById('btn-prefs'),pn=document.getElementById('prefs');
bp.addEventListener('click',function(){
 var ab=bp.getAttribute('aria-expanded')==='true';bp.setAttribute('aria-expanded',String(!ab));
 pn.hidden=ab;if(!ab)pn.querySelector('button').focus()});
document.getElementById('btn-fechar-prefs').addEventListener('click',function(){
 pn.hidden=true;bp.setAttribute('aria-expanded','false');bp.focus()});

var PASSOS=[
{alvo:'#busca',t:'Campo de busca com rótulo associado, dica de uso e resultado anunciado. Digite uma peça e pressione Enter.'},
{alvo:'#cats',t:'Filtros de categoria. Cada botão informa o próprio estado pelo atributo aria-pressed, então o leitor de tela sabe qual está ativo.'},
{alvo:'#grade',t:'Cartões de produto com nome, preço, estoque e descrição em texto. O ícone tem nome acessível descritivo e cada botão tem rótulo próprio.'},
{alvo:'#carrinho',t:'Carrinho com região viva. Toda inclusão ou remoção é anunciada e também aparece nas legendas.'},
{alvo:'#checkout',t:'Formulário com rótulos reais, dicas vinculadas e erros anunciados. Ao enviar com erro, o foco vai para o primeiro campo inválido.'},
{alvo:'#legendas',t:'Barra de legendas. Todo áudio do site vira texto aqui. O controle de áudio é separado do de legendas, para quem não ouve.'},
{alvo:'#declaracao',t:'Declaração de acessibilidade com os critérios WCAG atendidos. Fim do tour.'}];
var passo=0,pan=document.getElementById('assistente'),bs=document.getElementById('btn-assistente');
function limpar(){document.querySelectorAll('.alvo').forEach(function(e){e.classList.remove('alvo')})}
function mostrar(){
 document.getElementById('passo-num').textContent='Passo '+(passo+1)+' de '+PASSOS.length;
 document.getElementById('passo-txt').textContent=PASSOS[passo].t;
 document.getElementById('btn-ant').disabled=passo===0;
 document.getElementById('btn-prox').textContent=passo===PASSOS.length-1?'Concluir':'Próximo';
 limpar();var el=document.querySelector(PASSOS[passo].alvo);
 if(el){el.classList.add('alvo');el.scrollIntoView({block:'center',behavior:prefs.mov?'auto':'smooth'})}
 falar(PASSOS[passo].t,'Assistente')}
function abrir(){pan.hidden=false;bs.setAttribute('aria-expanded','true');passo=0;mostrar();document.getElementById('btn-prox').focus()}
function fechar(){pan.hidden=true;bs.setAttribute('aria-expanded','false');limpar();bs.focus();legendar('Assistente fechado.')}
bs.addEventListener('click',function(){pan.hidden?abrir():fechar()});
document.getElementById('btn-fechar-assist').addEventListener('click',fechar);
document.getElementById('btn-rep').addEventListener('click',function(){falar(PASSOS[passo].t,'Assistente')});
document.getElementById('btn-prox').addEventListener('click',function(){
 if(passo===PASSOS.length-1){falar('Tour concluído.','Assistente');fechar();return}passo++;mostrar()});
document.getElementById('btn-ant').addEventListener('click',function(){if(passo>0){passo--;mostrar()}});

document.addEventListener('keydown',function(e){
 if(e.altKey&&e.key.toLowerCase()==='a'){e.preventDefault();bp.click()}
 if(e.altKey&&e.key.toLowerCase()==='s'){e.preventDefault();bs.click()}});

function marcar(id,msg){
 var c=document.getElementById('campo-'+id),er=document.getElementById('erro-'+id);
 c.classList.toggle('invalido',!!msg);er.textContent=msg||'';return !!msg}

document.getElementById('btn-finalizar').addEventListener('click',function(){
 var nome=document.getElementById('nome').value.trim(),email=document.getElementById('email').value.trim(),cep=document.getElementById('cep').value.trim(),primeiro=null;
 if(nome.length<3&&marcar('nome','Informe seu nome completo, com ao menos 3 letras.'))primeiro=primeiro||'nome';else if(nome.length>=3)marcar('nome','');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){if(marcar('email','Informe um e-mail válido, como nome@dominio.com.'))primeiro=primeiro||'email'}else marcar('email','');
 if(!/^\d{5}-?\d{3}$/.test(cep)){if(marcar('cep','Informe o CEP com 8 dígitos.'))primeiro=primeiro||'cep'}else marcar('cep','');
 var r=document.getElementById('retorno');
 if(primeiro){r.textContent='Pedido não enviado. Corrija os campos destacados.';r.style.color='var(--danger)';
  document.getElementById(primeiro).focus();falar('Pedido não enviado. Corrija os campos destacados.','Validação');return}
 if(!carrinho.length){r.textContent='Adicione ao menos uma peça antes de finalizar.';r.style.color='var(--danger)';
  falar('Adicione ao menos uma peça antes de finalizar.','Validação');return}
 r.textContent='Pedido confirmado para '+nome+'. Subtotal de '+brl(carrinho.reduce(function(s,p){return s+p.p},0))+'. O rastreio vai para '+email+'.';
 r.style.color='var(--ok)';falar('Pedido confirmado.','Confirmação')});

aplicar();render();renderCarrinho();renderComp();
})();
