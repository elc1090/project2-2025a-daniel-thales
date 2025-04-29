# Projeto: Consumindo uma API pública

<img width="1510" alt="Screenshot 2025-04-29 at 11 05 43" src="https://github.com/user-attachments/assets/880b1f73-3db5-4026-8f4a-dd6792a3dac5" />

Acesso: https://project2-2025a-daniel-thales.vercel.app/

### Desenvolvedores

- Daniel Seitenfus
- Thales Stamm

### Nosso produto

Este projeto é uma aplicação web que consome a API pública do [wger.de](https://wger.de/en/software/api), uma plataforma voltada para gerenciamento de treinos e exercícios físicos. A aplicação permite visualizar diferentes exercícios, com descrição, imagens e categoria, além de marcar favoritos localmente. A interface é acessível e responsiva, promovendo o acesso ao conhecimento sobre práticas físicas e incentivando hábitos saudáveis.

### Desenvolvimento

O projeto foi desenvolvido utilizando o framework Next.js com React. A interface foi construída com componentes reutilizáveis usando a biblioteca shadcn/ui, focando em responsividade e boa experiência do usuário. 

Durante o desenvolvimento, decidimos armazenar os favoritos localmente no navegador usando `localStorage`, evitando a necessidade de autenticação e facilitando o uso. Também estruturamos a renderização dos cards de exercícios com tratamento de erros em caso de ausência de imagens ou dados.

#### Tecnologias

- HTML5
- CSS3 (via TailwindCSS)
- JavaScript (ES6+)
- React 19
- Next.js 14
- shadcn/ui
- API pública: [wger.de](https://wger.de/en/software/api)

#### Ambiente de desenvolvimento

- Visual Studio Code
  - Extensões: ESLint, Prettier, Tailwind CSS IntelliSense
- Git + GitHub
- Vercel (deploy contínuo)
- Navegadores para testes: Chrome, Firefox

#### Referências e créditos

- [API do wger.de](https://wger.de/en/software/api)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- Ícones via Lucide Icons (via shadcn/ui)
- [ChatGPT](https://chat.openai.com): auxílio em prompts para:
  - Construção de layout dos cards
  - Lógica de armazenamento em localStorage
  - Mensagens de erro e placeholders
- [Documentação oficial do React](https://react.dev/)

---

Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2025a) em 2025a
