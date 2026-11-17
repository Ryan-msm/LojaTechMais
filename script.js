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
    a:'Fotografia real de um
