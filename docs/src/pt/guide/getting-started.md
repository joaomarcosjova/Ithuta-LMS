# Introdução (Para Desenvolvedores)

Bem-vindo ao **Guia do Desenvolvedor Ithuta**. Esta seção fornece as etapas básicas para configurar o ambiente de desenvolvimento, entender a estrutura do projeto e contribuir para a plataforma.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- **Node.js** (recomendado v18+)
- **npm** ou **yarn**
- **MongoDB** (local ou na nuvem via MongoDB Atlas)
- **Git** para controle de versão

Recomendamos usar o **VS Code** com as seguintes extensões:
- ESLint
- Prettier
- Tailwind CSS IntelliSense

## Clonar o Repositório
```bash
git clone https://github.com/ithuta/ithuta-platform.git
cd ithuta-platform
```
## Instalar Dependências

### Para frontend
```bash
cd client
npm install
```

### Para backend
```bash
cd server
npm install
```

## Variáveis ​​de Ambiente

### Para frontend
``` bash
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CURRENCY = '$'
VITE_BACKEND_URL = ''

PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

### Para backend
``` bash
# Variáveis ​​de Ambiente Privadas
MONGODB_URI=''

CLERK_WEBHOOK_SECRET=''
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Cloudinary
CLOUDINARY_NAME =''
CLOUDINARY_API_KEY =''
CLOUDINARY_SECRET_KEY =''

# Stripe chaves
STRIPE_PUBLISHABLE_KEY=''
STRIPE_SECRET_KEY=''
STRIPE_WEBHOOK_SECRET=''

#Moeda
CURRENCY='USD'
```

## Executar o Projeto

### Executar frontend
```bash
cd cliente
npm executar dev
```

### Iniciar Servidor
```bash
cd servidor
npm iniciar
```