# Project Structure

Understanding the project structure is key to navigating and contributing effectively to the **Ithuta Platform**. The codebase is organized into a full-stack monorepo containing separate folders for the frontend and backend, along with shared configuration and tooling.

**Ithuta** follows a modular, route-based architecture for its frontend, built using **React**. This section outlines the structure, purpose, and best practices for working with pages within the application.


## Overview

### **Frontend (`client/`)**
```
client/
├── public/ # Static files (index.html, assets)
├── src/
│ ├── assets/ # Images, icons, and static assets
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Top-level route views
│ ├── services/ # API service wrappers
│ ├── styles/ # Global and utility styles (Tailwind)
│ └── main.jsx # Entry point for React
├── .env # Environment variables (frontend)
└── package.json # Frontend-specific dependencies and scripts
```

The page structure in the Ithuta frontend is intentionally designed for simplicity and scalability. By organizing views by route, adhering to modular conventions, and separating responsibilities, we ensure that the platform remains developer-friendly as it evolves.

### **Backend (`server/`)**
```
server/
├── config/ # Database and environment configuration
├── controllers/ # Business logic for handling routes
├── models/ # Mongoose models and schemas
├── routes/ # API route definitions
├── middlewares/ # Custom middleware functions (auth, error handling)
├── utils/ # Helper utilities and functions
├── .env # Environment variables (backend)
├── app.js # Express app configuration
└── server.js # Entry point for starting the server
```

## General Structure

```
📦 client
 ├── 📂 src
 │   ├── 📂 assets
 │   ├── 📂 components
 │   │   ├── 📂 educator
 │   │   │   ├── Footer.jsx
 │   │   │   ├── Navbar.jsx
 │   │   │   ├── Sidebar.jsx
 │   │   ├── 📂 student
 │   │   │   ├── Logger.jsx
 │   ├── 📂 context
 │   │   ├── AppContext.jsx
 │   ├── 📂 pages
 │   │   ├── 📂 educator
 │   │   │   ├── AddCourse.jsx
 │   │   │   ├── Dashboard.jsx
 │   │   │   ├── Educator.jsx
 │   │   │   ├── MyCourses.jsx
 │   │   │   ├── StudentsEnrolled.jsx
 │   │   ├── 📂 student
 │   │   │   ├── CourseDetails.jsx
 │   │   │   ├── CoursesList.jsx
 │   │   │   ├── Home.jsx
 │   │   │   ├── MyEnrollMents.jsx
 │   │   │   ├── Player.jsx
 │   │   ├── App.jsx
 │   │   ├── index.css
 │   │   ├── main.jsx
 ├── 📜 .env
 ├── 📜 .gitignore
 ├── 📜 package.json
 ├── 📜 tailwind.config.js
 ├── 📜 vite.config.js

```

```
📦 server
 ├── 📂 configs
 │   ├── cloudinary.js
 │   ├── mongodb.js
 │   ├── multer.js
 ├── 📂 controllers
 │   ├── courseController.js
 │   ├── educatorController.js
 │   ├── userController.js
 │   ├── webhooks.js
 ├── 📂 middlewares
 │   ├── authMiddleware.js
 ├── 📂 models
 │   ├── Course.js
 │   ├── CourseProgress.js
 │   ├── Purchase.js
 │   ├── User.js
 ├── 📂 routes
 │   ├── courseRoute.js
 │   ├── educatorRoutes.js
 │   ├── userRoutes.js
 ├── 📜 .env
 ├── 📜 .gitignore
 ├── 📜 package.json
 ├── 📜 server.js
 ├── 📜 vercel.json
```

## Best Practices
To keep the pages/ directory clean, maintainable, and scalable, consider the following conventions:

- One Component per File: Each page should have its own file and export a single component.

- Avoid Logic Bloat: Move reusable UI elements and logic into components/ or hooks/ directories.

- Use Lazy Loading: For large applications, consider using React.lazy() and Suspense for code-splitting.

- Isolate Page State: Keep state management local to the page when possible, or use centralized stores (e.g., Zustand, Redux) for shared state.