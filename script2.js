function abrirCarrinho() {
  document.getElementById("aba-carrinho").classList.add("aberto");
}

function fecharCarrinho() {
  document.getElementById("aba-carrinho").classList.remove("aberto");
}

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarAoCarrinho(id, nome, preco) {
  const produto = carrinho.find(p => p.id === id);

  if (produto) {
    produto.quantidade++;
  } else {
    carrinho.push({ id, nome, preco, quantidade: 1 });
  }

  salvar();
  renderizar();
}

function renderizar() {
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(p => {
    const subtotal = p.preco * p.quantidade;
    total += subtotal;

    lista.innerHTML += `
      <div class="item-carrinho">
        <span>${p.nome}</span>
        <input type="number" value="${p.quantidade}" min="1"
          onchange="atualizar(${p.id}, this.value)">
        <span>R$ ${subtotal}</span>
        <button onclick="remover(${p.id})">X</button>
      </div>
    `;
  });

  totalSpan.textContent = total;
}

function remover(id) {
  carrinho = carrinho.filter(p => p.id !== id);
  salvar();
  renderizar();
}

function atualizar(id, qtd) {
  const produto = carrinho.find(p => p.id === id);
  produto.quantidade = Number(qtd);

  if (produto.quantidade <= 0) remover(id);

  salvar();
  renderizar();
}

function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

renderizar();
function abrirCarrinho() {
  document.getElementById("aba-carrinho").classList.add("aberto");
}

function fecharCarrinho() {
  document.getElementById("aba-carrinho").classList.remove("aberto");
}

function comprar() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  alert("Compra realizada com sucesso!");

  carrinho = [];          
  salvar();               
  renderizar();           
  fecharCarrinho();       
}
