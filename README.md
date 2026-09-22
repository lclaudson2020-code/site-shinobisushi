# 🍣 Shinobi Sushi — Cardápio Online & Pedidos via WhatsApp

O **Shinobi Sushi** é uma aplicação web leve, moderna e responsiva desenvolvida para automatizar o processo de pedidos de um restaurante japonês[cite: 1]. A plataforma permite que o cliente monte o seu carrinho de compras interativamente e envie o pedido estruturado diretamente para o WhatsApp do estabelecimento[cite: 1].

---

## 🚀 Funcionalidades

- 🛒 **Carrinho Dinâmico:** Adição/remoção de itens e ajuste de quantidade em tempo real.
- 🛵 **Opções de Entrega:** Alternância entre Entrega (com formulário de endereço completo) e Retirada no Local.
- 💳 **Formas de Pagamento:** Suporte a Pix, Cartão de Crédito, Débito e Dinheiro (com campo dinâmico para troco).
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
├── script.js         # Lógica do carrinho e integração com o WhatsApp
└── logo.png          # Logotipo do Shinobi Sushi
💻 Como Executar o Projeto
Clone este repositório:

Bash
git clone [https://github.com/lclaudson2020-code/site-shinobisushi.git](https://github.com/lclaudson2020-code/site-shinobisushi.git)
Acesse a pasta do projeto:

Bash
cd site-shinobisushi
Abra o arquivo index.html:

Pode simplesmente dar um duplo clique no arquivo index.html para abrir no seu navegador.

Ou utilizar a extensão Live Server no VS Code.

⚙️ Como Personalizar para o Seu Negócio
Preços e Produtos: Atualize o arquivo script.js para alterar os combos, adicionais e valores do cardápio.

Número do WhatsApp: Edite o número de telefone no arquivo script.js e no rodapé do index.html para receber os pedidos na sua conta.

Identidade Visual: Altere as variáveis de cores no início do style.css (:root) para adaptar à paleta da sua marca.

Desenvolvido por Claudson Luciano 🥷


---

### Passo a passo para salvar no seu GitHub:

1. Na página do seu repositório no GitHub, clica no botão verde **"Add a README"**[cite: 1].
2. Apaga o texto padrão que aparecer lá e cola todo este bloco de texto acima.
3. No canto superior direito da página, clica no botão verde **"Commit changes..."** para guardar.
