# Estrutura do Projeto

Compreender a estrutura do projeto é fundamental para navegar e contribuir efetivamente com a **Plataforma Ithuta**. A base de código é organizada em um monorepo full-stack contendo pastas separadas para o front-end e o back-end, além de configuração e ferramentas compartilhadas.

A **Ithuta** segue uma arquitetura modular baseada em rotas para seu front-end, construída usando **React**. Esta seção descreve a estrutura, o propósito e as melhores práticas para trabalhar com páginas dentro do aplicativo.

## Visão Geral

### **Frontend (`client/`)**
```
client/
├── public/ # Arquivos estáticos (index.html, assets)
├── src/
│ ├── assets/ # Imagens, ícones e assets estáticos
│ ├── components/ # Componentes de UI reutilizáveis
│ ├── hooks/ # Hooks React personalizados
│ ├── pages/ # Visualizações de rota de nível superior
│ ├── services/ # Wrappers de serviços de API
│ ├── styles/ # Estilos globais e utilitários (Tailwind)
│ └── main.jsx # Ponto de entrada para React
├── .env # Variáveis ​​de ambiente (frontend)
└── package.json # Dependências e scripts específicos do frontend
```

A estrutura de páginas no frontend do Ithuta foi projetada intencionalmente para simplicidade e escalabilidade. Ao organizar as visualizações por rota, seguir convenções modulares e separar responsabilidades, garantimos que a plataforma permaneça amigável ao desenvolvedor à medida que evolui.

### **Backend (`server/`)**
```
server/
├── config/ # Configuração de banco de dados e ambiente
├── controllers/ # Lógica de negócios para lidar com rotas
├── models/ # Modelos e esquemas Mongoose
├── routes/ # Definições de rotas da API
├── middlewares/ # Funções de middleware personalizadas (autenticação, tratamento de erros)
├── utils/ # Utilitários e funções auxiliares
├── .env # Variáveis ​​de ambiente (backend)
├── app.js # Configuração expressa do aplicativo
└── server.js # Ponto de entrada para iniciar o servidor
```

## Estrutura Geral

```
📦 cliente
├── 📂 src
│ ├── 📂 ativos
│ ├── 📂 componentes
│ │ ├── 📂 educador
│ │ │ ├── Footer.jsx
│ │ │ ├── Navbar.jsx
│ │ │ ├── Sidebar.jsx
│ │ ├── 📂 aluno
│ │ │ ├── Logger.jsx
│ ├── 📂 contexto
│ │ ├── AppContext.jsx
│ ├── 📂 páginas
│ │ ├── 📂 educador
│ │ │ ├── AddCourse.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Educador.jsx
│ │ │ ├── MeusCursos.jsx
│ │ │ ├── AlunosMatriculados.jsx
│ │ ├── 📂 aluno
│ │ │ ├── DetalhesDoCurso.jsx
│ │ │ ├── ListaDeCursos.jsx
│ │ │ ├── Início.jsx
│ │ │ ├── MinhasMatrículas.jsx
│ │ │ ├── Jogador.jsx
│ │ ├── Aplicativo.jsx
│ │ ├── index.css
│ │ ├── principal.jsx
├── 📜 .env
├── 📜 .gitignore
├── 📜 package.json
├── 📜 tailwind.config.js
├── 📜 vite.config.js

```

```
📦 server
├── 📂 configs
│ ├── cloudinary.js
│ ├── mongodb.js
│ ├── multer.js
├── 📂 controllers
│ ├── courseController.js
│ ├── educatorController.js
│ ├── userController.js
│ ├── webhooks.js
├── 📂 middlewares
│ ├── authMiddleware.js
├── 📂 modelos
│ ├── Course.js
│ ├── CourseProgress.js
│ ├── Purchase.js
│ ├── User.js
├── 📂 rotas
│ ├── courseRoute.js
│ ├── educatorRoutes.js
│ ├── userRoutes.js
├── 📜 .env
├── 📜 .gitignore
├── 📜 package.json
├── 📜 server.js
├── 📜 vercel.json
```

## Melhores Práticas
Para manter o diretório pages/ limpo, sustentável e escalável, considere as seguintes convenções:

- Um Componente por Arquivo: Cada página deve ter seu próprio arquivo e exportar um único componente.

- Evite o Excesso de Lógica: Mova elementos de UI reutilizáveis ​​e lógica para os diretórios components/ ou hooks/.

- Use o Lazy Loading: Para aplicações grandes, considere usar React.lazy() e Suspense para divisão de código.

- Isolar estado da página: mantenha o gerenciamento de estado local na página quando possível ou use armazenamentos centralizados (por exemplo, Zustand, Redux) para estado compartilhado.