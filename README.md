# ✨ Studio Cleidiane Vieira

<p align="center">
  <img src="./public/favicon.png" width="120" alt="Studio Cleidiane Vieira">
</p>

<h3 align="center">
  Experiência Digital Premium para Beleza, Autocuidado e Formação Profissional
</h3>

<p align="center">
  Uma experiência web cinematográfica criada para apresentar a essência do Studio Cleidiane Vieira,
  conectando design sofisticado, inteligência artificial e agendamento inteligente.
</p>

---

# 🌿 Sobre o Projeto

O **Studio Cleidiane Vieira** é uma plataforma digital premium desenvolvida para um estúdio de beleza especializado em transformação, estética e formação profissional.

O objetivo do projeto é transformar uma presença digital tradicional em uma experiência semelhante ao atendimento presencial:

- sofisticada;
- acolhedora;
- elegante;
- personalizada;
- tecnológica.

Mais do que um site institucional, a plataforma funciona como uma extensão digital da marca, permitindo que clientes conheçam os serviços, explorem procedimentos, conheçam os cursos e iniciem um atendimento inteligente.

---

# 🎯 Objetivos do Projeto

O projeto foi desenvolvido com foco em:

✨ Fortalecer a identidade digital do Studio  
✨ Criar uma experiência visual premium  
✨ Automatizar o primeiro atendimento  
✨ Facilitar agendamentos  
✨ Apresentar cursos profissionais  
✨ Melhorar a jornada do cliente  

---

# 🚀 Funcionalidades

## 🎬 Experiência Visual Cinematográfica

A plataforma possui uma interface criada para transmitir exclusividade através de:

- Hero section com vídeo;
- Animações cinematográficas;
- Transições suaves;
- Efeitos de movimento;
- Navegação elegante;
- Design responsivo;
- Experiência otimizada para dispositivos móveis.

---

# 💎 Apresentação do Studio

Inclui áreas para:

- História e filosofia do Studio;
- Apresentação da fundadora;
- Galeria de trabalhos;
- Procedimentos realizados;
- Diferenciais da marca;
- Experiência da cliente.

---

# 💇 Procedimentos

Estrutura preparada para apresentar serviços como:

- Alongamento de cílios;
- Design de sobrancelhas;
- Micropigmentação;
- Tratamentos capilares;
- Cuidados personalizados.

---

# 🎓 Área de Cursos

A plataforma possui uma área dedicada à formação profissional.

## Curso Profissional de Alongamento de Cílios

Formação completa:

- Do básico ao avançado;
- Técnicas profissionais;
- Preparação para atendimento;
- Prática profissional;
- Desenvolvimento de carreira.

---

## Curso Profissional de Cabeleireira

Formação voltada para:

- Fundamentos da profissão;
- Técnicas de cabelo;
- Atendimento profissional;
- Desenvolvimento técnico.

---

# 🤖 Inteligência Artificial

A plataforma conta com um Concierge inteligente utilizando IA.

O assistente foi desenvolvido para:

- Recepcionar visitantes;
- Responder dúvidas;
- Apresentar serviços;
- Explicar cursos;
- Auxiliar clientes;
- Direcionar para agendamento.

A experiência do atendimento foi criada com uma comunicação:

- humana;
- elegante;
- acolhedora;
- personalizada.

---

# 📅 Agendamento Inteligente

Integração com Google Calendar utilizando OAuth 2.0.

Funcionalidades:

- Criação automática de eventos;
- Organização da agenda;
- Controle de horários;
- Preparação para evitar conflitos;
- Base para atendimento automatizado.

---

# 🎨 Design e Experiência

A identidade visual foi construída pensando em uma marca premium.

Características:

- Interface sofisticada;
- Animações suaves;
- Microinterações;
- Tipografia elegante;
- Experiência cinematográfica;
- Navegação fluida.

---

# 🛠️ Tecnologias Utilizadas

## Front-end

- React 19
- TypeScript
- Vite
- TanStack Start
- TanStack Router
- Tailwind CSS
- Framer Motion
- GSAP
- Three.js
- React Three Fiber

---

## Back-end / Server Side

- Node.js
- SSR com TanStack Start
- API Routes
- Servidor HTTP personalizado
- dotenv

---

## Inteligência Artificial

- Google Gemini API
- AI SDK

---

## Integrações

- Google Calendar API
- OAuth 2.0
- Google APIs

---

# 📂 Estrutura do Projeto

studio-cleidiane-vieira/

├── public/
│ ├── studio/
│ │ └── gallery/
│ │ ├── 01.jpg
│ │ ├── 02.jpg
│ │ ├── 03.jpg
│ │ ├── 04.jpg
│ │ ├── 05.jpg
│ │ └── 06.jpg
│ │
│ ├── hero.mp4
│ ├── favicon.png
│ └── robots.txt
│
├── src/
│ ├── components/
│ ├── routes/
│ ├── lib/
│ ├── hooks/
│ └── styles/
│
├── dist/
│
├── server.js
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md


---

# ⚙️ Instalação

Clone o projeto:

```bash
git clone https://github.com/seu-usuario/studio-cleidiane-vieira.git

Entre na pasta:

cd studio-cleidiane-vieira

Instale as dependências:
npm install

🔐 Configuração do Ambiente

Crie um arquivo:
.env
na raiz do projeto.

Adicione suas variáveis:
GEMINI_API_KEY=sua_chave_gemini

GOOGLE_CLIENT_ID=seu_client_id

GOOGLE_CLIENT_SECRET=seu_client_secret

GOOGLE_REFRESH_TOKEN=seu_refresh_token

GOOGLE_CALENDAR_ID=primary

GOOGLE_REDIRECT_URI=http://localhost:5173/api/google/callback

▶️ Executando o Projeto
Desenvolvimento

Execute: npm run dev

A aplicação ficará disponível em:

http://localhost:5173

Build de Produção

Para gerar a versão otimizada:

npm run build

O processo cria a pasta:

dist/

com:

arquivos compilados;
assets otimizados;
servidor SSR;
bundle de produção.
Executando Produção

Após gerar o build:

npm start

O servidor será iniciado através do Node.js.

Exemplo:

Studio Cleidiane rodando na porta 3000
🌐 Deploy

O projeto foi preparado para ambiente de produção utilizando:

Node.js;
SSR;
Vite;
TanStack Start;
Variáveis de ambiente;
Integrações externas seguras.
🚀 Deploy na Hostinger

Configuração recomendada:

Requisitos
Hospedagem com suporte Node.js;
Node.js 20 ou superior;
Gerenciamento de aplicações Node;
Configuração de variáveis de ambiente.
Processo
Enviar o projeto para o servidor;
Instalar dependências:
npm install
Criar build:
npm run build
Configurar variáveis:
.env
Iniciar aplicação:
npm start
🔒 Segurança

Boas práticas aplicadas:

✅ Variáveis sensíveis protegidas
✅ Tokens OAuth fora do código
✅ Arquivos privados ignorados pelo Git
✅ Separação entre ambiente local e produção
✅ Controle de configurações externas

🧠 Arquitetura

Fluxo da aplicação:

Usuário
   |
   |
Interface React
   |
   |
TanStack Start SSR
   |
   |
Servidor Node.js
   |
   |
APIs Externas
   |
   ├── Google Gemini
   |
   └── Google Calendar
📈 Próximas Evoluções

O projeto possui uma base preparada para novas funcionalidades:

👥 Gestão de Clientes
Cadastro de clientes;
Histórico de procedimentos;
Preferências;
Observações de atendimento.
📅 Agenda Avançada
Calendário visual;
Bloqueio automático de horários;
Confirmação de atendimento;
Lembretes inteligentes.
💬 Atendimento Integrado

Possíveis integrações:

WhatsApp Business API;
Instagram;
CRM;
Automação de mensagens.
💳 Área Comercial

Evoluções planejadas:

Pagamento online;
Venda de cursos;
Área do aluno;
Checkout integrado.
📊 Painel Administrativo

Dashboard para:

Clientes;
Agenda;
Cursos;
Indicadores;
Relatórios.
🏆 Diferenciais Técnicos

O projeto une:

✨ Design premium
✨ Inteligência Artificial
✨ Automação
✨ Desenvolvimento moderno
✨ Experiência personalizada

Criando uma experiência digital que conecta:

Beleza + Tecnologia + Inovação

👩‍💼 Sobre o Studio Cleidiane Vieira

O Studio Cleidiane Vieira representa uma experiência de beleza focada em transformação, cuidado e desenvolvimento profissional.

A plataforma digital foi criada para transmitir os mesmos valores do atendimento presencial:

excelência;
confiança;
sofisticação;
proximidade.
👨‍💻 Desenvolvimento

Projeto desenvolvido por:

Diogenes Martins

Soluções digitais utilizando:

Desenvolvimento Web;
Inteligência Artificial;
Sistemas personalizados;
Automação empresarial.
📄 Licença

Projeto desenvolvido para fins institucionais e comerciais.

Todos os direitos reservados.

<p align="center"> ✨ Studio Cleidiane Vieira <br> Tecnologia criando experiências que transformam. </p> ```
