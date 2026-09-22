# 🍣 Shinobi Sushi — Cardápio Online & Pedidos via WhatsApp

O **Shinobi Sushi** é uma aplicação web leve, moderna e responsiva desenvolvida para automatizar o processo de pedidos de um restaurante japonês[cite: 1]. A plataforma permite que o cliente monte seu carrinho de compras interativamente e envie o pedido estruturado diretamente para o WhatsApp do estabelecimento[cite: 1].

---

## 🚀 Funcionalidades

- 🛒 **Carrinho Dinâmico:** Adição/remoção de itens e ajuste de quantidade em tempo real.
- 🛵 **Opções de Entrega:** Alternância entre Entrega (com formulário de endereço completo) e Retirada no Local.
- 💳 **Formas de Pagamento:** Suporte a Pix, Cartão de Crédito, Débito e Dinheiro (com campo dinâmico de troco).
- 📲 **Integração com WhatsApp:** Formatação automática do resumo do pedido para envio direto via API do WhatsApp.
- 📱 **Layout Responsivo & Mobile First:** Botão flutuante (FAB) para acesso rápido ao carrinho em dispositivos móveis.
- 🎨 **Design Único:** Estilo visual *grunge/ninja* focado em temas escuros, tipografia marcante e detalhes decorativos recortados.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica da aplicação.
- **CSS3:** Estilização avançada com variáveis CSS, CSS Grid, Flexbox e `clip-path` para efeitos visuais.
- **JavaScript (Vanilla JS):** Manipulação da DOM, lógica do carrinho e validação de formulários sem dependência de bibliotecas externas.

---

## 📂 Estrutura do Projeto

```text
├── .vscode/          # Configurações do ambiente de desenvolvimento
├── index.html        # Estrutura principal da página
├── style.css         # Estilização e identidade visual
├── script.js        # Lógica do carrinho e integração com o WhatsApp
└── logo.png          # Logotipo do Shinobi Sushi
