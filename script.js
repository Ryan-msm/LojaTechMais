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

/* Catálogo com 20 Produtos e Fotografias Reais de Hardware (Wikimedia Commons) */
var P = [
  {
    id:'p1',
    n:'Placa de Vídeo NVIDIA GeForce RTX 4060 8GB GDDR6',
    p:1899.00, pAnt:2299.00, c:'gpu', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Nvidia_GeForce_RTX_4060_Ti_Founders_Edition.jpg/640px-Nvidia_GeForce_RTX_4060_Ti_Founders_Edition.jpg',
    a:'Fotografia real da placa de vídeo NVIDIA GeForce RTX série 40',
    d:'Arquitetura Ada Lovelace, DLSS 3, Ray Tracing e 8GB GDDR6 para jogos em Full HD.',
    e:12
  },
  {
    id:'p2',
    n:'Processador AMD Ryzen 7 5700X, 8-Core, 16-Threads AM4',
    p:1249.90, pAnt:1599.00, c:'cpu', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Ryzen_7_1700X_CPU.jpg/640px-AMD_Ryzen_7_1700X_CPU.jpg',
    a:'Fotografia real do chip processador AMD Ryzen com pinos dourados',
    d:'Clock boost até 4.6GHz, 36MB de cache, ideal para jogos e edição pesada.',
    e:18
  },
  {
    id:'p3',
    n:'Memória RAM Kingston HyperX Fury 16GB (2x8) DDR4 3200MHz',
    p:299.90, pAnt:399.00, c:'memorias', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/HyperX_Fury_DDR4_RAM.jpg/640px-HyperX_Fury_DDR4_RAM.jpg',
    a:'Fotografia real do pente de memória RAM DDR4 preto com dissipador',
    d:'Dissipador de calor assimétrico de perfil baixo e suporte Intel XMP.',
    e:25
  },
  {
    id:'p4',
    n:'SSD Kingston NVMe M.2 2280 1TB PCIe Gen 4.0',
    p:429.90, pAnt:549.00, c:'ssd', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/M.2_2280_SSD.jpg/640px-M.2_2280_SSD.jpg',
    a:'Fotografia real de um módulo SSD M.2 2280 NVMe',
    d:'Leitura de até 3500 MB/s, formato compacto sem cabos para placas-mãe modernas.',
    e:30
  },
  {
    id:'p5',
    n:'Placa-Mãe ASUS TUF Gaming B550M-PLUS Micro-ATX AM4',
    p:699.90, pAnt:899.00, c:'placa-mae', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Computer_motherboard.jpg/640px-Computer_motherboard.jpg',
    a:'Fotografia real de uma placa-mãe ATX com slots PCIe e memórias',
    d:'VRM robusto de 8+2 fases, dois slots M.2, rede 2.5Gb e áudio gaming.',
    e:8
  },
  {
    id:'p6',
    n:'Monitor Gamer Curvo 27 pol. QHD 165Hz 1ms FreeSync',
    p:1399.00, pAnt:1799.00, c:'monitor', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/LG_UltraGear_gaming_monitor.jpg/640px-LG_UltraGear_gaming_monitor.jpg',
    a:'Fotografia real de um monitor gamer widescreen sobre mesa',
    d:'Resolução 2560x1440, bordas ultrafinas e ajuste de inclinação.',
    e:7
  },
  {
    id:'p7',
    n:'Fonte ATX 650W 80 Plus Bronze PFC Ativo',
    p:349.90, pAnt:449.00, c:'fonte', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/ATX_power_supply.jpg/640px-ATX_power_supply.jpg',
    a:'Fotografia real de uma fonte de alimentação ATX preta com ventoinha',
    d:'Ventoinha silenciosa de 120mm e proteções contra sobretensão e curto-circuito.',
    e:15
  },
  {
    id:'p8',
    n:'Gabinete Gamer Mid Tower Lateral Vidro Temperado',
    p:229.90, pAnt:299.00, c:'perifericos', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Gaming_PC_case.jpg/640px-Gaming_PC_case.jpg',
    a:'Fotografia real de um gabinete gamer torre média iluminado',
    d:'Suporte para placas-mãe ATX/mATX e espaço para water cooler de 240mm.',
    e:14
  },
  {
    id:'p9',
    n:'Processador Intel Core i5-12400F LGA 1700 6-Core',
    p:799.00, pAnt:999.00, c:'cpu', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Intel_Core_i5_12400F.jpg/640px-Intel_Core_i5_12400F.jpg',
    a:'Fotografia real do processador Intel Core i5 de 12ª geração',
    d:'6 núcleos de performance, 12 threads e 18MB de Intel Smart Cache.',
    e:20
  },
  {
    id:'p10',
    n:'Placa de Vídeo AMD Radeon RX 6700 XT 12GB GDDR6',
    p:2399.00, pAnt:2899.00, c:'gpu', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/AMD_Radeon_RX_6700_XT.jpg/640px-AMD_Radeon_RX_6700_XT.jpg',
    a:'Fotografia real da placa de vídeo AMD Radeon RX 6700 XT',
    d:'12GB de VRAM GDDR6, ideal para jogos em Quad HD com texturas no máximo.',
    e:5
  },
  {
    id:'p11',
    n:'Memória RAM Corsair Vengeance RGB Pro 32GB (2x16) DDR4',
    p:679.90, pAnt:849.00, c:'memorias', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Corsair_Vengeance_RAM.jpg/640px-Corsair_Vengeance_RAM.jpg',
    a:'Fotografia real de módulos de memória Corsair Vengeance',
    d:'Iluminação LED RGB multizona dinâmica e chips selecionados para overclock.',
    e:10
  },
  {
    id:'p12',
    n:'SSD SATA III 2.5" 960GB Kingston A400',
    p:359.00, pAnt:449.00, c:'ssd', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Kingston_A400_SSD.jpg/640px-Kingston_A400_SSD.jpg',
    a:'Fotografia real de um SSD SATA 2.5 polegadas Kingston',
    d:'10x mais rápido que um HD tradicional, ideal para upgrades de PC e notebooks.',
    e:24
  },
  {
    id:'p13',
    n:'Placa-Mãe MSI MAG Z690 Tomahawk WiFi DDR4 LGA 1700',
    p:1299.00, pAnt:1599.00, c:'placa-mae', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Micro-Star_International_motherboard.jpg/640px-Micro-Star_International_motherboard.jpg',
    a:'Fotografia real de placa-mãe MSI ATX com dissipadores',
    d:'Wi-Fi 6E integrado, 4 slots M.2 Shield Frozr e USB 3.2 Gen 2x2.',
    e:6
  },
  {
    id:'p14',
    n:'Monitor Ultrawide 29 pol. IPS Full HD 75Hz HDR10',
    p:1099.00, pAnt:1399.00, c:'monitor', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ultrawide_monitor.jpg/640px-Ultrawide_monitor.jpg',
    a:'Fotografia real de monitor ultrawide 21:9 sobre secretária',
    d:'Proporção 21:9 para maior área de trabalho e imersão em jogos de corrida.',
    e:11
  },
  {
    id:'p15',
    n:'Fonte Modular Corsair RM850x 850W 80 Plus Gold',
    p:899.90, pAnt:1149.00, c:'fonte', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Modular_PC_power_supply.jpg/640px-Modular_PC_power_supply.jpg',
    a:'Fotografia real de fonte modular com conectores destacáveis',
    d:'Capacitores japoneses 105°C, modo Zero RPM e eficiência 80 Plus Gold.',
    e:7
  },
  {
    id:'p16',
    n:'Teclado Mecânico Gamer Switch Blue Retroiluminado RGB',
    p:199.90, pAnt:269.00, c:'perifericos', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Mechanical_keyboard_RGB.jpg/640px-Mechanical_keyboard_RGB.jpg',
    a:'Fotografia real de teclado mecânico com iluminação RGB',
    d:'Teclas anti-ghosting 100%, resposta tátil audível e cabo trançado.',
    e:22
  },
  {
    id:'p17',
    n:'Mouse Gamer Óptico Logitech G502 Hero 25K DPI',
    p:279.90, pAnt:369.00, c:'perifericos', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logitech_G502_Hero.jpg/640px-Logitech_G502_Hero.jpg',
    a:'Fotografia real do mouse gamer Logitech G502 preto',
    d:'Sensor HERO 25K, 11 botões programáveis e pesos ajustáveis.',
    e:35
  },
  {
    id:'p18',
    n:'Air Cooler Torre CPU 120mm Heatpipes de Cobre',
    p:149.90, pAnt:199.00, c:'perifericos', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/CPU_cooler_heatsink_and_fan.jpg/640px-CPU_cooler_heatsink_and_fan.jpg',
    a:'Fotografia real de cooler de torre para processador com ventoinha',
    d:'4 heatpipes de contato direto para manter o processador frio sob carga.',
    e:19
  },
  {
    id:'p19',
    n:'HD Interno Seagate BarraCuda 2TB 7200RPM SATA 3.5"',
    p:389.00, pAnt:479.00, c:'ssd', loja:'Kabum',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Hard_disk_drive_3.5_inch.jpg/640px-Hard_disk_drive_3.5_inch.jpg',
    a:'Fotografia real de um disco rígido interno SATA de 3.5 polegadas',
    d:'Armazenamento confiável de alta capacidade para backups e biblioteca de jogos.',
    e:28
  },
  {
    id:'p20',
    n:'Placa de Vídeo GTX 1660 Super 6GB GDDR6 Dual Fan',
    p:1199.00, pAnt:1499.00, c:'gpu', loja:'Pichau',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Graphics_card_dual_fan.jpg/640px-Graphics_card_dual_fan.jpg',
    a:'Fotografia real de placa de vídeo com duas ventoinhas',
    d:'Excelente opção para jogos competitivos em 1080p com baixo consumo.',
    e:14
  }
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
        '<img src="' + p.img + '" alt="' + p.a + '" loading="lazy" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png\'">' +
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
  {alvo:'#grade', t:'Vitrine de produtos com 20 itens reais de hardware, fotografias autênticas e preços promocionais.'},
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
