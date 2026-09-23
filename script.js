'use strict';

/* ==========================================================================
   1. DADOS
   ========================================================================== */

const restaurante = {
  nome: 'SHINOBI SUSHI',
  instagram: '@SHINOBISHUIRB',
  whatsapp: '5575998956198',
  taxaEntrega: 5.00
};

const produtos = [
  // COMBOS
  { id: 1, nome: 'Combo Ninja', categoria: 'Combos', quantidadePecas: 16, descricao: '8 Hot Roll Filadélfia + 8 Uramaki Filadélfia', preco: 64.90 },
  { id: 2, nome: 'Combo Samurai', categoria: 'Combos', quantidadePecas: 24, descricao: '8 Hot Roll Filadélfia + 8 Uramaki Filadélfia + 8 Hossomaki Salmão', preco: 89.90 },
  { id: 3, nome: 'Combo Shogun', categoria: 'Combos', quantidadePecas: 32, descricao: '10 Hot Roll Filadélfia + 10 Uramaki Filadélfia + 8 Hossomaki Salmão + 4 Nigiri Salmão', preco: 109.90 },
  { id: 4, nome: 'Combo Sensei', categoria: 'Combos', quantidadePecas: 42, descricao: '12 Hot Roll Filadélfia + 10 Uramaki Filadélfia + 10 Hossomaki Salmão + 5 Nigiri Salmão + 5 Joe Salmão', preco: 139.90 },
  { id: 5, nome: 'Combo Shinobi', categoria: 'Combos', quantidadePecas: 60, descricao: '20 Hot Roll Filadélfia + 20 Uramaki Filadélfia + 10 Hossomaki Salmão + 5 Nigiri Salmão + 5 Joe Salmão', preco: 189.90 },
  // ADICIONAIS
  { id: 6, nome: 'Temaki Salmão', categoria: 'Adicionais', quantidadePecas: null, descricao: 'Temaki individual de Salmão', preco: 49.90 },
  { id: 7, nome: 'Temaki Camarão', categoria: 'Adicionais', quantidadePecas: null, descricao: 'Temaki individual de Camarão', preco: 49.90 },
  { id: 8, nome: 'Dog Sushi', categoria: 'Adicionais', quantidadePecas: null, descricao: 'Dog Sushi artesanal', preco: 49.90 },
  { id: 9, nome: 'Molho Shoyu Extra', categoria: 'Adicionais', quantidadePecas: null, descricao: 'Porção extra de molho Shoyu', preco: 1.00 },
  { id: 10, nome: 'Molho Tarê Extra', categoria: 'Adicionais', quantidadePecas: null, descricao: 'Porção extra de molho Tarê', preco: 1.50 },
  { id: 11, nome: 'Wasabi Extra', categoria: 'Adicionais', quantidadePecas: null, descricao: 'Porção extra de Wasabi', preco: 1.50 },
  { id: 12, nome: 'Hashi Extra', categoria: 'Adicionais', quantidadePecas: null, descricao: 'Par de Hashi extra', preco: 1.00 }
];

/* ==========================================================================
   2. ESTADO
   ========================================================================== */

// carrinho: Map<id, quantidade>
const carrinho = new Map();

/* ==========================================================================
   3. HELPERS
   ========================================================================== */

const formatarMoeda = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const buscarProduto = (id) => produtos.find((p) => p.id === id);

function totalItensCarrinho() {
  let total = 0;
  carrinho.forEach((qtd) => (total += qtd));
  return total;
}

function subtotalCarrinho() {
  let subtotal = 0;
  carrinho.forEach((qtd, id) => {
    const produto = buscarProduto(id);
    if (produto) subtotal += produto.preco * qtd;
  });
  return subtotal;
}

function tipoEntregaAtual() {
  const checked = document.querySelector('input[name="tipoEntrega"]:checked');
  return checked ? checked.value : 'entrega';
}

function taxaEntregaAtual() {
  return tipoEntregaAtual() === 'entrega' ? restaurante.taxaEntrega : 0;
}

/* ==========================================================================
   4. RENDERIZAÇÃO DO CARDÁPIO
   ========================================================================== */

function formatarPrecoFlyer(preco) {
  const [inteiro, centavos] = preco.toFixed(2).split('.');
  return `<span class="price-prefix">R$</span>${inteiro},${centavos}`;
}

function criarListaDescricao(descricao) {
  // divide a descrição em itens sempre que houver " + ", no estilo bullet do cardápio físico
  const itens = descricao.split('+').map((item) => item.trim()).filter(Boolean);
  return itens.map((item) => `<li>${item}</li>`).join('');
}

function criarCardProduto(produto) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.id = String(produto.id);

  const badgePecas = produto.quantidadePecas
    ? `<span class="product-pieces">${produto.quantidadePecas} peças</span>`
    : '';

  card.innerHTML = `
    <div class="product-card-top">
      <h3 class="product-name">${produto.nome}</h3>
      ${badgePecas}
    </div>
    <div class="product-body">
      <ul class="product-desc">${criarListaDescricao(produto.descricao)}</ul>
    </div>
    <div class="product-footer">
      <span class="product-price">${formatarPrecoFlyer(produto.preco)}</span>
      <button type="button" class="btn-add" data-id="${produto.id}">Adicionar</button>
    </div>
  `;

  return card;
}

function renderizarCardapio() {
  const combosGrid = document.getElementById('combosGrid');
  const adicionaisGrid = document.getElementById('adicionaisGrid');

  combosGrid.innerHTML = '';
  adicionaisGrid.innerHTML = '';

  produtos.forEach((produto) => {
    const card = criarCardProduto(produto);
    if (produto.categoria === 'Combos') {
      combosGrid.appendChild(card);
    } else {
      adicionaisGrid.appendChild(card);
    }
  });
}

/* ==========================================================================
   5. RENDERIZAÇÃO DO CARRINHO
   ========================================================================== */

function criarLinhaCarrinho(produto, qtd) {
  const linha = document.createElement('div');
  linha.className = 'cart-item';
  linha.dataset.id = String(produto.id);

  linha.innerHTML = `
    <div>
      <p class="cart-item-name">${produto.nome}</p>
      <p class="cart-item-unit">${formatarMoeda(produto.preco)} cada</p>
    </div>
    <div class="cart-item-total">${formatarMoeda(produto.preco * qtd)}</div>
    <div class="cart-item-controls">
      <button type="button" class="qty-btn minus" data-id="${produto.id}" aria-label="Diminuir quantidade">−</button>
      <span class="qty-value">${qtd}</span>
      <button type="button" class="qty-btn plus" data-id="${produto.id}" aria-label="Aumentar quantidade">+</button>
      <button type="button" class="remove-btn" data-id="${produto.id}">Remover</button>
    </div>
  `;

  return linha;
}

function renderizarCarrinho() {
  const container = document.getElementById('cartItems');
  const vazio = document.getElementById('cartEmpty');
  const resumo = document.getElementById('cartSummary');

  container.innerHTML = '';

  if (carrinho.size === 0) {
    vazio.style.display = 'block';
    resumo.style.display = 'none';
  } else {
    vazio.style.display = 'none';
    resumo.style.display = 'flex';

    carrinho.forEach((qtd, id) => {
      const produto = buscarProduto(id);
      if (produto) container.appendChild(criarLinhaCarrinho(produto, qtd));
    });
  }

  atualizarResumo();
  atualizarContadores();
}

function atualizarResumo() {
  const subtotal = subtotalCarrinho();
  const taxa = carrinho.size > 0 ? taxaEntregaAtual() : 0;
  const total = subtotal + taxa;

  document.getElementById('subtotalValue').textContent = formatarMoeda(subtotal);
  document.getElementById('taxaValue').textContent =
    taxa > 0 ? formatarMoeda(taxa) : 'Grátis';
  document.getElementById('totalValue').textContent = formatarMoeda(total);

  const nota = document.getElementById('tempoEntregaNota');
  if (nota) nota.hidden = tipoEntregaAtual() !== 'entrega';
}

function atualizarContadores() {
  const total = totalItensCarrinho();
  document.getElementById('cartCount').textContent = String(total);
  document.getElementById('fabCount').textContent = String(total);

  // Exibe o botão flutuante no celular apenas se houver itens no carrinho
  const fab = document.getElementById('fabCart');
  if (fab) {
    if (total > 0) {
      fab.classList.add('visible');
    } else {
      fab.classList.remove('visible');
    }
  }
}

/* ==========================================================================
   6. AÇÕES DO CARRINHO
   ========================================================================== */

function adicionarAoCarrinho(id) {
  const atual = carrinho.get(id) || 0;
  carrinho.set(id, atual + 1);
  renderizarCarrinho();
}

function incrementarItem(id) {
  const atual = carrinho.get(id) || 0;
  carrinho.set(id, atual + 1);
  renderizarCarrinho();
}

function decrementarItem(id) {
  const atual = carrinho.get(id) || 0;
  if (atual <= 1) {
    carrinho.delete(id);
  } else {
    carrinho.set(id, atual - 1);
  }
  renderizarCarrinho();
}

function removerItem(id) {
  carrinho.delete(id);
  renderizarCarrinho();
}

/* ==========================================================================
   7. ABRIR / FECHAR PAINEL DO CARRINHO
   ========================================================================== */

function abrirCarrinho() {
  document.getElementById('cartPanel').classList.add('open');
  document.getElementById('cartPanel').setAttribute('aria-hidden', 'false');
  document.getElementById('overlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function fecharCarrinho() {
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('cartPanel').setAttribute('aria-hidden', 'true');
  document.getElementById('overlay').classList.remove('visible');
  document.body.style.overflow = '';
}

/* ==========================================================================
   8. FORMULÁRIO — entrega / pagamento dinâmicos
   ========================================================================== */

function atualizarCamposEntrega() {
  const enderecoFields = document.getElementById('enderecoFields');
  const ehEntrega = tipoEntregaAtual() === 'entrega';
  enderecoFields.hidden = !ehEntrega;
  atualizarResumo();
}

function atualizarCampoTroco() {
  const forma = document.getElementById('formaPagamento').value;
  const trocoField = document.getElementById('trocoField');
  trocoField.hidden = forma !== 'Dinheiro';
  if (forma !== 'Dinheiro') {
    document.getElementById('trocoPara').value = '';
  }
}

/* ==========================================================================
   9. VALIDAÇÃO
   ========================================================================== */

function limparEstadosInvalidos() {
  document.querySelectorAll('.field.invalid').forEach((el) => el.classList.remove('invalid'));
  const erro = document.getElementById('formError');
  erro.textContent = '';
  erro.classList.remove('visible');
}

function marcarInvalido(inputId) {
  const input = document.getElementById(inputId);
  if (input) input.closest('.field')?.classList.add('invalid');
}

function mostrarErro(mensagem) {
  const erro = document.getElementById('formError');
  erro.textContent = mensagem;
  erro.classList.add('visible');
}

function validarPedido() {
  limparEstadosInvalidos();

  if (carrinho.size === 0) {
    mostrarErro('Seu carrinho está vazio. Adicione pelo menos um item.');
    return false;
  }

  const nome = document.getElementById('nomeCliente').value.trim();
  if (!nome) {
    marcarInvalido('nomeCliente');
    mostrarErro('Informe seu nome completo.');
    return false;
  }

  const ehEntrega = tipoEntregaAtual() === 'entrega';
  if (ehEntrega) {
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();

    if (!rua) {
      marcarInvalido('rua');
      mostrarErro('Informe a rua para entrega.');
      return false;
    }
    if (!numero) {
      marcarInvalido('numero');
      mostrarErro('Informe o número do endereço.');
      return false;
    }
    if (!bairro) {
      marcarInvalido('bairro');
      mostrarErro('Informe o bairro para entrega.');
      return false;
    }
  }

  const formaPagamento = document.getElementById('formaPagamento').value;
  if (!formaPagamento) {
    marcarInvalido('formaPagamento');
    mostrarErro('Selecione a forma de pagamento.');
    return false;
  }

  return true;
}

/* ==========================================================================
   10. MONTAGEM DA MENSAGEM E ENVIO PARO WHATSAPP
   ========================================================================== */

function montarMensagem() {
  const nome = document.getElementById('nomeCliente').value.trim();
  const ehEntrega = tipoEntregaAtual() === 'entrega';
  const formaPagamento = document.getElementById('formaPagamento').value;
  const trocoPara = document.getElementById('trocoPara').value.trim();
  const observacoes = document.getElementById('observacoes').value.trim();

  const subtotal = subtotalCarrinho();
  const taxa = taxaEntregaAtual();
  const total = subtotal + taxa;

  let msg = '';
  msg += `🍣 *NOVO PEDIDO — ${restaurante.nome}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━\n\n`;

  msg += `👤 *Cliente:* ${nome}\n\n`;

  msg += `🧾 *Itens do pedido:*\n`;
  carrinho.forEach((qtd, id) => {
    const produto = buscarProduto(id);
    if (!produto) return;
    msg += `▪️ ${qtd}x ${produto.nome} — ${formatarMoeda(produto.preco * qtd)}\n`;
  });

  msg += `\n💰 *Subtotal:* ${formatarMoeda(subtotal)}\n`;

  if (ehEntrega) {
    msg += `🛵 *Taxa de entrega:* ${formatarMoeda(taxa)}\n`;
    msg += `⏱ *Tempo estimado:* 20 a 50 minutos\n`;
  } else {
    msg += `🏠 *Retirada no local* (sem taxa de entrega)\n`;
  }

  msg += `✅ *Total:* ${formatarMoeda(total)}\n\n`;

  if (ehEntrega) {
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const referencia = document.getElementById('referencia').value.trim();

    msg += `📍 *Endereço de entrega:*\n`;
    msg += `${rua}, ${numero} — ${bairro}\n`;
    if (referencia) msg += `Referência: ${referencia}\n`;
    msg += `\n`;
  } else {
    msg += `📍 *Retirada:* o cliente irá buscar no balcão\n\n`;
  }

  msg += `💳 *Pagamento:* ${formaPagamento}`;
  if (formaPagamento === 'Dinheiro' && trocoPara) {
    msg += ` (troco para R$ ${trocoPara})`;
  }
  msg += `\n`;

  if (observacoes) {
    msg += `\n📝 *Observações:* ${observacoes}\n`;
  }

  msg += `\n━━━━━━━━━━━━━━━━━━\n`;
  msg += `Pedido gerado pelo site oficial • ${restaurante.instagram}`;

  return msg;
}

function enviarPedidoWhatsApp() {
  const mensagem = montarMensagem();
  const url = `https://api.whatsapp.com/send?phone=${restaurante.whatsapp}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

/* ==========================================================================
   11. EVENTOS
   ========================================================================== */

function configurarEventos() {
  // adicionar produto ao carrinho (delegação de evento no grid)
  document.getElementById('combosGrid').addEventListener('click', handleAddClick);
  document.getElementById('adicionaisGrid').addEventListener('click', handleAddClick);

  function handleAddClick(e) {
    const btn = e.target.closest('.btn-add');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    adicionarAoCarrinho(id);

    const textoOriginal = btn.textContent;
    btn.textContent = 'Adicionado ✓';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = textoOriginal;
      btn.classList.remove('added');
    }, 900);
  }

  // controles dentro do carrinho (qty +/-, remover)
  document.getElementById('cartItems').addEventListener('click', (e) => {
    const id = Number(e.target.closest('[data-id]')?.dataset.id);
    if (!id) return;

    if (e.target.closest('.plus')) incrementarItem(id);
    else if (e.target.closest('.minus')) decrementarItem(id);
    else if (e.target.closest('.remove-btn')) removerItem(id);
  });

  // abrir/fechar carrinho
  document.getElementById('cartToggle').addEventListener('click', abrirCarrinho);
  document.getElementById('fabCart').addEventListener('click', abrirCarrinho);
  document.getElementById('cartClose').addEventListener('click', fecharCarrinho);
  document.getElementById('overlay').addEventListener('click', fecharCarrinho);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharCarrinho();
  });

  // tipo de entrega
  document.getElementById('tipoEntregaGroup').addEventListener('change', atualizarCamposEntrega);

  // forma de pagamento
  document.getElementById('formaPagamento').addEventListener('change', atualizarCampoTroco);

  // submit do formulário
  document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validarPedido()) return;
    enviarPedidoWhatsApp();
  });
}

/* ==========================================================================
   12. INICIALIZAÇÃO
   ========================================================================== */

function iniciar() {
  renderizarCardapio();
  renderizarCarrinho();
  atualizarCamposEntrega();
  atualizarCampoTroco();
  configurarEventos();
}

document.addEventListener('DOMContentLoaded', iniciar);
