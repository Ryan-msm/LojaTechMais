(function(){
'use strict';

var app = document.getElementById('app'),
    log = document.getElementById('log'),
    anu = document.getElementById('anuncios'),
    grade = document.getElementById('grade'),
    lc = document.getElementById('lista-carrinho'),
    cv = document.getElementById('carr-vazio'),
    lcomp = document.getElementById('lista-comp'),
    compv = document.getElementById('comp-vazio'),
    cont = document.getElementById('contador'),
    tot = document.getElementById('total');

var CH = 'lqt_prefs', prefs = {t2:false, t3:false, hc:false, esp:false, links:false, mov:false, leg:true, audio:true};
try { Object.assign(prefs, JSON.parse(localStorage.getItem(CH) || '{}')); } catch(e){}
function salvar() { try { localStorage.setItem(CH, JSON.stringify(prefs)); } catch(e){} }

function aplicar() {
  app.classList.toggle('hc', prefs.hc);
  app.classList.toggle('esp', prefs.esp);
  app.classList.toggle('links', prefs.links);
  app.classList.toggle('mov', prefs.mov);
  app.classList.toggle('t2', prefs.t2 && !prefs.t3);
  app.classList.toggle('t3', prefs.t3);
  document.querySelectorAll('[data-p]').forEach(function(b){
    var k = b.dataset.p;
    b.setAttribute('aria-pressed', String(k === 't1' ? (!prefs.t2 && !prefs.t3) : !!prefs[k]));
  });
  var bl = document.getElementById('btn-leg'), ba = document.getElementById('btn-audio');
  if(bl){ bl.setAttribute('aria-pressed', String(prefs.leg)); bl.textContent = prefs.leg ? 'Legendas ligadas' : 'Legendas desligadas'; }
  if(ba){ ba.setAttribute('aria-pressed', String(prefs.audio)); ba.textContent = prefs.audio ? 'Áudio ligado' : 'Áudio desligado'; }
  salvar();
}

function hora() { var d = new Date(); return ('0'+d.getMinutes()).slice(-2)+':'+('0'+d.getSeconds()).slice(-2); }
function legendar(t, q) {
  if(!prefs.leg) return;
  var li = document.createElement('li');
  li.innerHTML = '<span class="hora">'+hora()+'</span><b>'+(q||'Site')+':</b> ';
  li.appendChild(document.createTextNode(t));
  log.appendChild(li);
  while(log.children.length > 8) log.removeChild(log.firstChild);
}
function falar(t, q) {
  legendar(t, q);
  if(!prefs.audio || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(t);
    u.lang = 'pt-BR'; u.rate = 1.03;
    speechSynthesis.speak(u);
  } catch(e){}
}
function anunciar(t) { anu.textContent = ''; setTimeout(function(){ anu.textContent = t; }, 60); }
function piscar(el) { if(!el || prefs.mov) return; el.classList.add('pisca'); setTimeout(function(){ el.classList.remove('pisca'); }, 1200); }
function brl(v) { return v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); }

/* Catálogo Completo com 20 Produtos e URLs Diretas sem Bloqueio CORB/CORS */
var P = [
  {id:'p1', n:'Placa de Vídeo RTX 4060 Ventus 2X OC MSI 8GB', p:1899.00, pAnt:2299.00, c:'gpu', loja:'Kabum', img:'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=80', a:'Placa de vídeo com ventoinhas duplas', d:'DLSS 3, Ray Tracing e 8GB GDDR6 para jogos em Full HD ultra.', e:12},
  {id:'p2', n:'Processador AMD Ryzen 7 5700X, 8-Core, 16-Threads', p:1249.90, pAnt:1599.00, c:'cpu', loja:'Pichau', img:'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&auto=format&fit=crop&q=80', a:'Chip processador instalado na placa-mãe', d:'Alto desempenho para multitarefa pesada, jogos e criação.', e:18},
  {id:'p3', n:'Memória RAM Kingston Fury Beast 16GB (2x8) DDR4 3200MHz', p:299.90, pAnt:399.00, c:'memorias', loja:'Kabum', img:'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop&q=80', a:'Módulos de memória RAM DDR4', d:'Frequência de 3200MHz com dissipador metálico de perfil baixo.', e:25},
  {id:'p4', n:'SSD Kingston NV2 1TB NVMe M.2 2280', p:429.90, pAnt:549.00, c:'ssd', loja:'Pichau', img:'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=80', a:'Unidade de armazenamento SSD M.2', d:'Leitura de até 3500 MB/s para carregamento instantâneo.', e:30},
  {id:'p5', n:'Placa-Mãe ASUS TUF Gaming B450M-PLUS II, DDR4', p:699.90, pAnt:899.00, c:'placa-mae', loja:'Kabum', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80', a:'Placa-mãe escura com componentes eletrônicos', d:'Suporte a Ryzen série 5000, VRM robusto e proteção militar.', e:8},
  {id:'p6', n:'Monitor Gamer Curvo 27 pol. QHD 180Hz 1ms', p:1399.00, pAnt:1799.00, c:'monitor', loja:'Pichau', img:'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80', a:'Monitor gamer widescreen sobre mesa', d:'Painel curvo QHD, taxa de atualização de 180Hz e FreeSync.', e:7},
  {id:'p7', n:'Fonte MSI MAG A650BN 650W 80 Plus Bronze', p:349.90, pAnt:449.00, c:'fonte', loja:'Kabum', img:'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&auto=format&fit=crop&q=80', a:'Fonte de alimentação de computador', d:'Certificação 80 Plus Bronze com PFC ativo e cabos pretos.', e:15},
  {id:'p8', n:'Gabinete Gamer Mid Tower Lateral Vidro Temperado', p:229.90, pAnt:299.00, c:'perifericos', loja:'Pichau', img:'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=80', a:'Gabinete gamer iluminado', d:'Frente em mesh para fluxo de ar otimizado e lateral em vidro.', e:14},
  {id:'p9', n:'Processador Intel Core i5-12400F, 6-Core, 12-Threads', p:799.00, pAnt:999.00, c:'cpu', loja:'Kabum', img:'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&auto=format&fit=crop&q=80', a:'Processador Intel no socket', d:'Excelente custo-benefício para jogos e produtividade diária.', e:20},
  {id:'p10', n:'Placa de Vídeo RTX 4070 Super 12GB GDDR6X', p:3899.00, pAnt:4499.00, c:'gpu', loja:'Pichau', img:'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=80', a:'Placa de vídeo topo de linha', d:'Desempenho extremo para jogos em Quad HD e 4K com Ray Tracing.', e:5},
  {id:'p11', n:'Memória RAM Corsair Vengeance RGB 32GB (2x16) 3600MHz', p:679.90, pAnt:849.00, c:'memorias', loja:'Kabum', img:'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop&q=80', a:'Pentes de memória RAM de alta capacidade', d:'Iluminação RGB dinâmica e alto desempenho em frequências elevadas.', e:10},
  {id:'p12', n:'SSD M.2 NVMe 2TB Samsung 990 PRO', p:1199.00, pAnt:1499.00, c:'ssd', loja:'Pichau', img:'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=80', a:'SSD NVMe de 2TB', d:'Leitura ultrarrápida de até 7450 MB/s para entusiastas.', e:9},
  {id:'p13', n:'Placa-Mãe Gigabyte B550M AORUS Elite, DDR4', p:849.00, pAnt:1049.00, c:'placa-mae', loja:'Kabum', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80', a:'Placa-mãe AORUS', d:'Dissipadores térmicos avançados e slot M.2 com protetor térmico.', e:11},
  {id:'p14', n:'Monitor Gamer 24 pol. 165Hz 1ms IPS Full HD', p:899.00, pAnt:1199.00, c:'monitor', loja:'Pichau', img:'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80', a:'Monitor gamer 165Hz', d:'Fluidez extrema para eSports com tempo de resposta ultrabaixo.', e:16},
  {id:'p15', n:'Fonte Corsair RM750x 750W 80 Plus Gold Modular', p:799.90, pAnt:999.00, c:'fonte', loja:'Kabum', img:'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&auto=format&fit=crop&q=80', a:'Fonte modular 750W', d:'Eficiência máxima, cabeamento 100% modular e operação silenciosa.', e:7},
  {id:'p16', n:'Teclado Mecânico Gamer Switch Blue RGB', p:199.90, pAnt:269.00, c:'perifericos', loja:'Pichau', img:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80', a:'Teclado mecânico iluminado', d:'Formato compacto TKL, construção em alumínio e iluminação RGB.', e:22},
  {id:'p17', n:'Mouse Gamer Óptico Logitech G203 Lightsync 8500 DPI', p:139.90, pAnt:199.00, c:'perifericos', loja:'Kabum', img:'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80', a:'Mouse gamer preto RGB', d:'Sensor de nível para jogos, design clássico e luzes vibrantes.', e:35},
  {id:'p18', n:'Water Cooler Corsair H100 RGB 240mm', p:599.90, pAnt:749.00, c:'perifericos', loja:'Pichau', img:'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=80', a:'Sistema de refrigeração líquida', d:'Refrigeração líquida de alto desempenho com ventoinhas ARGB.', e:12},
  {id:'p19', n:'Processador AMD Ryzen 5 5600, 6-Core, 12-Threads', p:849.00, pAnt:1099.00, c:'cpu', loja:'Kabum', img:'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&auto=format&fit=crop&q=80', a:'Processador AMD Ryzen 5', d:'Excelente taxa de quadros por segundo para jogos competitivos.', e:28},
  {id:'p20', n:'Placa de Vídeo RX 6600 Challenger D ASRock 8GB', p:1399.00, pAnt:1799.00, c:'gpu', loja:'Pichau', img:'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=80', a:'Placa de vídeo Radeon RX 6600', d:'Ótimo custo-benefício para rodar jogos atuais em 1080p.', e:14}
];

var filtro = 'todos', termo = '', ordem = 'padrao', carrinho = [], comparar = [];

function lista() {
  var l = P.filter(function(p){
    var okc = (filtro === 'todos' || p.c === filtro);
    var okt = (!termo || p.n.toLowerCase().indexOf(termo) >= 0 || p.d.toLowerCase().indexOf(termo) >= 0);
    return okc && okt;
  });
  if(ordem === 'menor') l.sort(function(a,b){ return a.p - b.p; });
  if(ordem === 'maior') l.sort(function(a,b){ return b.p - a.p; });
  if(ordem === 'az') l.sort(function(a,b){ return a.n.localeCompare(b.n, 'pt-BR'); });
  return l;
}

function render() {
  var l = lista();
  grade.innerHTML = '';
  l.forEach(function(p){
    var li = document.createElement('li');
    li.className = 'card';
    li.innerHTML = 
      '<div class="card-img-wrap">' +
        '<span class="badge-loja">' + p.loja + '</span>' +
        '<img src="' + p.img + '" alt="' + p.a + '" loading="lazy">' +
      '</div>' +
      '<p class="cat-tag">' + p.c.toUpperCase() + '</p>' +
      '<h3>' + p.n + '</h3>' +
      '<p class="preco">' + brl(p.p) + '<span class="preco-antigo">' + brl(p.pAnt) + '</span></p>' +
      '<p class="frete-gratis">⚡ Frete Grátis Full</p>' +
      '<p class="estoque">Estoque: ' + p.e + ' unidades</p>' +
      '<p class="desc">' + p.d + '</p>' +
      '<div class="linha-botoes">' +
        '<button class="btn" data-ouvir="' + p.id + '">Ouvir</button>' +
        '<button class="btn primario" data-add="' + p.id + '">Comprar</button>' +
        '<button class="btn" data-comp="' + p.id + '" aria-pressed="false">Comparar</button>' +
      '</div>';

    li.querySelector('[data-ouvir]').setAttribute('aria-label', 'Ouvir descrição de ' + p.n);
    li.querySelector('[data-add]').setAttribute('aria-label', 'Adicionar ' + p.n + ' ao carrinho');
    li.querySelector('[data-comp]').setAttribute('aria-label', 'Comparar ' + p.n);
    if(comparar.indexOf(p.id) >= 0) li.querySelector('[data-comp]').setAttribute('aria-pressed', 'true');
    grade.appendChild(li);
  });
  var semRes = document.getElementById('sem-res');
  if(semRes) semRes.hidden = (l.length > 0);
  anunciar(l.length + (l.length === 1 ? ' produto exibido.' : ' produtos exibidos.'));
}

grade.addEventListener('click', function(ev){
  var b = ev.target.closest('button');
  if(!b) return;
  var id = b.dataset.ouvir || b.dataset.add || b.dataset.comp;
  var p = P.filter(function(x){ return x.id === id; })[0];
  if(!p) return;

  if(b.dataset.ouvir) {
    falar(p.n + '. ' + p.d + ' Preço ' + brl(p.p) + '. Vendido por ' + p.loja + '.', 'Descrição');
    return;
  }
  if(b.dataset.add) {
    carrinho.push(p);
    renderCarrinho();
    anunciar(p.n + ' adicionado ao carrinho.');
    legendar(p.n + ' foi adicionado ao carrinho.', 'Carrinho');
    piscar(cont);
    return;
  }
  if(b.dataset.comp) {
    var i = comparar.indexOf(p.id);
    if(i >= 0) {
      comparar.splice(i, 1);
      b.setAttribute('aria-pressed', 'false');
      anunciar(p.n + ' removido da comparação.');
    } else {
      if(comparar.length >= 3) {
        anunciar('Limite de 3 itens na comparação.');
        falar('Limite de três itens na comparação.', 'Comparação');
        return;
      }
      comparar.push(p.id);
      b.setAttribute('aria-pressed', 'true');
      anunciar(p.n + ' marcado para comparação.');
    }
    renderComp();
  }
});

function renderCarrinho() {
  lc.innerHTML = '';
  carrinho.forEach(function(p, i){
    var li = document.createElement('li');
    li.innerHTML = '<span><b>' + p.n + '</b></span><span class="preco" style="font-size:1em;">' + brl(p.p) + '</span>';
    var b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Remover';
    b.style.fontSize = '.75em';
    b.style.minHeight = '30px';
    b.setAttribute('aria-label', 'Remover ' + p.n + ' do carrinho');
    b.addEventListener('click', function(){
      carrinho.splice(i, 1);
      renderCarrinho();
      anunciar(p.n + ' removido do carrinho.');
      legendar(p.n + ' removido do carrinho.', 'Carrinho');
    });
    li.appendChild(b);
    lc.appendChild(li);
  });
  cv.hidden = (carrinho.length > 0);
  cont.textContent = (carrinho.length === 1 ? '1 item' : carrinho.length + ' itens');
  tot.textContent = brl(carrinho.reduce(function(s, p){ return s + p.p; }, 0));
}

function renderComp() {
  lcomp.innerHTML = '';
  comparar.forEach(function(id){
    var p = P.filter(function(x){ return x.id === id; })[0];
    if(!p) return;
    var li = document.createElement('li');
    li.style.padding = '6px 0';
    li.style.borderBottom = '1px solid var(--line)';
    li.textContent = p.n + ' — ' + brl(p.p) + ' (' + p.loja + ')';
    lcomp.appendChild(li);
  });
  compv.hidden = (comparar.length > 0);
}

function buscar() {
  var inputBusca = document.getElementById('busca');
  if(inputBusca) {
    termo = inputBusca.value.trim().toLowerCase();
    render();
    legendar(termo ? 'Busca por ' + termo + '.' : 'Busca limpa.', 'Busca');
  }
}

var btnBuscar = document.getElementById('btn-buscar');
if(btnBuscar) btnBuscar.addEventListener('click', buscar);
var inputBusca = document.getElementById('busca');
if(inputBusca) {
  inputBusca.addEventListener('keydown', function(e){
    if(e.key === 'Enter') buscar();
    if(e.key === 'Escape') { this.value = ''; termo = ''; render(); anunciar('Busca limpa.'); }
  });
}

var catsEl = document.getElementById('cats');
if(catsEl) {
  catsEl.addEventListener('click', function(ev){
    var b = ev.target.closest('button');
    if(!b) return;
    filtro = b.dataset.cat;
    document.querySelectorAll('#cats button').forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); });
    render();
    legendar('Filtro de categoria: ' + b.textContent + '.', 'Filtro');
  });
}

var ordenarEl = document.getElementById('ordenar');
if(ordenarEl) {
  ordenarEl.addEventListener('change', function(){
    ordem = this.value;
    render();
    legendar('Ordenação alterada para: ' + this.options[this.selectedIndex].text + '.', 'Ordenação');
  });
}

document.querySelectorAll('[data-p]').forEach(function(b){
  b.addEventListener('click', function(){
    var k = b.dataset.p;
    if(k === 't1') { prefs.t2 = prefs.t3 = false; }
    else if(k === 't2') { prefs.t2 = true; prefs.t3 = false; }
    else if(k === 't3') { prefs.t3 = true; prefs.t2 = false; }
    else { prefs[k] = !prefs[k]; }
    aplicar();
    if(k === 'hc') falar(prefs.hc ? 'Alto contraste ativado.' : 'Alto contraste desativado.');
    if(k === 't2' || k === 't3') falar('Tamanho do texto ajustado.');
    if(k === 'mov' && prefs.mov) falar('Movimento reduzido.');
  });
});

var btnReset = document.getElementById('btn-reset');
if(btnReset) btnReset.addEventListener('click', function(){
  prefs = {t2:false, t3:false, hc:false, esp:false, links:false, mov:false, leg:true, audio:true};
  aplicar();
  falar('Preferências restauradas.');
});

var btnLeg = document.getElementById('btn-leg');
if(btnLeg) btnLeg.addEventListener('click', function(){
  prefs.leg = !prefs.leg;
  aplicar();
  if(prefs.leg) legendar('Legendas reativadas.');
});

var btnAudio = document.getElementById('btn-audio');
if(btnAudio) btnAudio.addEventListener('click', function(){
  prefs.audio = !prefs.audio;
  aplicar();
  if(!prefs.audio && ('speechSynthesis' in window)) speechSynthesis.cancel();
  legendar(prefs.audio ? 'Áudio reativado.' : 'Áudio desligado.');
});

var bp = document.getElementById('btn-prefs'), pn = document.getElementById('prefs');
if(bp && pn) {
  bp.addEventListener('click', function(){
    var ab = (bp.getAttribute('aria-expanded') === 'true');
    bp.setAttribute('aria-expanded', String(!ab));
    pn.hidden = ab;
    if(!ab) { var firstBtn = pn.querySelector('button'); if(firstBtn) firstBtn.focus(); }
  });
  var btnFecharPrefs = document.getElementById('btn-fechar-prefs');
  if(btnFecharPrefs) {
    btnFecharPrefs.addEventListener('click', function(){
      pn.hidden = true;
      bp.setAttribute('aria-expanded', 'false');
      bp.focus();
    });
  }
}

var PASSOS = [
  {alvo:'#busca', t:'Campo de busca inteligente. Digite qualquer componente e pressione Enter para filtrar o catálogo.'},
  {alvo:'#cats', t:'Filtros rápidos de categorias estilo e-commerce. O leitor de tela anuncia qual filtro está ativo.'},
  {alvo:'#grade', t:'Vitrine de produtos com 20 itens reais de hardware, imagens diretas e preços promocionais.'},
  {alvo:'#carrinho', t:'Carrinho dinâmico com atualização instantânea de subtotal e suporte a acessibilidade.'},
  {alvo:'#checkout', t:'Formulário de fechamento com validação imediata e foco automático em caso de erro.'}
];

var passo = 0, pan = document.getElementById('assistente'), bs = document.getElementById('btn-assistente');
function limparAlvo() { document.querySelectorAll('.alvo').forEach(function(e){ e.classList.remove('alvo'); }); }
function mostrarPasso() {
  var numEl = document.getElementById('passo-num'), txtEl = document.getElementById('passo-txt'), antEl = document.getElementById('btn-ant'), proxEl = document.getElementById('btn-prox');
  if(numEl) numEl.textContent = 'Passo ' + (passo + 1) + ' de ' + PASSOS.length;
  if(txtEl) txtEl.textContent = PASSOS[passo].t;
  if(antEl) antEl.disabled = (passo === 0);
  if(proxEl) proxEl.textContent = (passo === PASSOS.length - 1 ? 'Concluir' : 'Próximo');
  limparAlvo();
  var el = document.querySelector(PASSOS[passo].alvo);
  if(el) {
    el.classList.add('alvo');
    el.scrollIntoView({block:'center', behavior: prefs.mov ? 'auto' : 'smooth'});
  }
  falar(PASSOS[passo].t, 'Assistente');
}

if(bs && pan) {
  bs.addEventListener('click', function(){
    if(pan.hidden) {
      pan.hidden = false;
      bs.setAttribute('aria-expanded', 'true');
      passo = 0;
      mostrarPasso();
      var proxBtn = document.getElementById('btn-prox');
      if(proxBtn) proxBtn.focus();
    } else {
      pan.hidden = true;
      bs.setAttribute('aria-expanded', 'false');
      limparAlvo();
      bs.focus();
      legendar('Assistente fechado.');
    }
  });
  var btnFecharAssist = document.getElementById('btn-fechar-assist');
  if(btnFecharAssist) btnFecharAssist.addEventListener('click', function(){
    pan.hidden = true;
    bs.setAttribute('aria-expanded', 'false');
    limparAlvo();
    bs.focus();
  });
  var btnRep = document.getElementById('btn-rep');
  if(btnRep) btnRep.addEventListener('click', function(){ falar(PASSOS[passo].t, 'Assistente'); });
  var btnProx = document.getElementById('btn-prox');
  if(btnProx) btnProx.addEventListener('click', function(){
    if(passo === PASSOS.length - 1) {
      falar('Tour concluído com sucesso.', 'Assistente');
      pan.hidden = true;
      bs.setAttribute('aria-expanded', 'false');
      limparAlvo();
      bs.focus();
      return;
    }
    passo++;
    mostrarPasso();
  });
  var btnAnt = document.getElementById('btn-ant');
  if(btnAnt) btnAnt.addEventListener('click', function(){
    if(passo > 0) { passo--; mostrarPasso(); }
  });
}

document.addEventListener('keydown', function(e){
  if(e.altKey && e.key.toLowerCase() === 'a') { e.preventDefault(); if(bp) bp.click(); }
  if(e.altKey && e.key.toLowerCase() === 's') { e.preventDefault(); if(bs) bs.click(); }
});

function marcarCampo(id, msg) {
  var c = document.getElementById('campo-' + id), er = document.getElementById('erro-' + id);
  if(c) c.classList.toggle('invalido', !!msg);
  if(er) er.textContent = msg || '';
  return !!msg;
}

var btnFinalizar = document.getElementById('btn-finalizar');
if(btnFinalizar) {
  btnFinalizar.addEventListener('click', function(){
    var nome = document.getElementById('nome').value.trim(),
        email = document.getElementById('email').value.trim(),
        cep = document.getElementById('cep').value.trim(),
        primeiro = null;

    if(nome.length < 3 && marcarCampo('nome', 'Informe seu nome completo (mínimo 3 letras).')) primeiro = primeiro || 'nome';
    else marcarCampo('nome', '');

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      if(marcarCampo('email', 'Informe um e-mail válido (ex: nome@dominio.com).')) primeiro = primeiro || 'email';
    } else marcarCampo('email', '');

    if(!/^\d{5}-?\d{3}$/.test(cep)) {
      if(marcarCampo('cep', 'Informe um CEP válido (8 dígitos).')) primeiro = primeiro || 'cep';
    } else marcarCampo('cep', '');

    var r = document.getElementById('retorno');
    if(primeiro) {
      if(r) { r.textContent = 'Pedido não enviado. Corrija os campos destacados.'; r.style.color = 'var(--danger)'; }
      var campoFoco = document.getElementById(primeiro);
      if(campoFoco) campoFoco.focus();
      falar('Pedido não enviado. Corrija os campos em destaque.', 'Validação');
      return;
    }
    if(!carrinho.length) {
      if(r) { r.textContent = 'Adicione ao menos uma peça ao carrinho antes de finalizar.'; r.style.color = 'var(--danger)'; }
      falar('Adicione ao menos uma peça ao carrinho antes de finalizar.', 'Validação');
      return;
    }
    if(r) {
      r.textContent = 'Parabéns, ' + nome + '! Pedido confirmado com sucesso. O rastreio será enviado para ' + email + '.';
      r.style.color = 'var(--ok)';
    }
    falar('Pedido confirmado com sucesso!', 'Confirmação');
  });
}

aplicar();
render();
renderCarrinho();
renderComp();

})();
