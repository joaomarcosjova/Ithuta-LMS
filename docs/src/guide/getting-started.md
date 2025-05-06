# Getting Started (For Developers)

Welcome to the **Ithuta Developer Guide**. This section provides the foundational steps for setting up the development environment, understanding the project structure, and contributing to the platform.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB** (local or cloud via MongoDB Atlas)
- **Git** for version control

We recommend using **VS Code** with the following extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense

## Clone the Repo
```bash
git clone https://github.com/ithuta/ithuta-platform.git
cd ithuta-platform
```
## Install Dependencies

### For frontend
```bash
cd client
npm install
```

### For backend
```bash
cd server
npm install
```

## Environment Variables

### For frontend
``` bash
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CURRENCY = '$'
VITE_BACKEND_URL = ''

PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

### For backend
``` bash
# Private Environment Variables
MONGODB_URI=''

CLERK_WEBHOOK_SECRET=''
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Cloudinary
CLOUDINARY_NAME =''
CLOUDINARY_API_KEY =''
CLOUDINARY_SECRET_KEY =''

#Stripe keys
STRIPE_PUBLISHABLE_KEY=''
STRIPE_SECRET_KEY=''
STRIPE_WEBHOOK_SECRET=''

#Currency
CURRENCY='USD'
```

## Run the Project

### Run frontend
```bash
cd client
npm run dev
```

### Start Server
```bash
cd server
npm start
```

