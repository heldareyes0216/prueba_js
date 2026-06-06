# ProjectFlow — Internal Project Manager

A Single Page Application for managing internal company projects, built with Vanilla JS, Vite, and Tailwind CSS v4.

---

## Description

ProjectFlow provides role-based project management with authentication, session persistence, and a full CRUD interface backed by `json-server`. Managers can create, edit, and delete any reservation; Collaborators can view their reservations and cancelled.

---

## Technologies

| Layer       | Tech                        |
|-------------|-----------------------------|
| Bundler     | Vite 6                      |
| Styling     | Tailwind CSS v4 (Vite plugin) |
| Language    | Vanilla JavaScript (ES Modules) |
| API         | json-server 0.17            |
| HTTP        | Fetch API (native)          |
| Persistence | localStorage                |
| Fonts       | Syne + DM Sans (Google Fonts) |

---

## Installation

```bash
# Clone or unzip the project
cd prueba_js

# Install dependencies
npm install
```

---

## Running the Project

You need **two terminals** running simultaneously:

### Terminal 1 — JSON Server (API)
```bash
npm run server
# Runs on http://localhost:3001
```

### Terminal 2 — Vite Dev Server (SPA)
```bash
npm run dev
# Runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The Vite dev server proxies `/api/*` → `http://localhost:3001/*` so CORS is never an issue.

---

## Test Users

| Role         | Email              | Password |
|--------------|--------------------|----------|
| Admi         | admin@test.com     | Admin123 |
| User         | user@test.com      | User123  |

---

## Project Structure

```
prueba_js/
├── db.json                   
├── index.html                
├── main.js                   
├── package.json
├── README.md
└── src/             
    ├── styles/
    │   └── styles.css          
    ├── router/
    │   └── router.js
    │   └── guards.js      
    ├── api/
    │   ├── reservatios.api.js           
    │   └── auth.js
    │   └── spaces.js
    │   └── peliculas.js           
    ├── components/
    │   ├── loginForm.components.js         
    │   ├── navbar.components.js    
    │   └── reservationForms.js
    │   └── reservationTable.js           
    ├── pages/
    │   ├── login.js          
    │   ├── dashboard.js      
    │   ├── projects.js       
    │   ├── projectForm.js    
    │   ├── projectDetail.js  
    │   └── notFound.js 
    └── views/
    │   ├── admiReservation.view.js 
    │   ├── myreservation.view.js
    │   └──dashboard.js
    └── services/
    │   ├── storage.services.js  
    └── utils/
        ├── helpers.js          
        └── validators.js         
```

---

## Role Permissions

| Action                        | Manager | Collaborator |
|-------------------------------|:-------:|:------------:|
| View all reversations         | ✅      | ❌           |
| Create reversations           | ✅      | ✅           |
| Edit any reversations         | ✅      | ✅           |
| Delete reversations           | ✅      | ❌           |
| Update status reversations    | ✅      | ✅           |
| View dashboard reversations   | ✅      | ❌           |
| View personal dashboard       | ✅      | ✅           |

---

## Technical Decisions

### Routing
A custom hash-free router using the **History API** (`pushState` / `popstate`). Routes are registered as either exact strings or RegExp patterns, which cleanly handles dynamic segments like `/projects/:id` without a library.

### Authentication
Credentials are validated against `json-server` (`GET /users?email=...`). On success, the user object (minus password) is stored in `localStorage` so the session persists across page refreshes and browser restarts. Guards in the router redirect unauthenticated users to `/login` and collaborators away from admin routes.

### Tailwind CSS v4
Uses the official `@tailwindcss/vite` plugin with the new `@theme` block for custom design tokens (colors, fonts). No `tailwind.config.js` needed — configuration lives entirely in `main.css`.

### Modularisation
Each concern lives in its own ES module: services handle data fetching, pages handle rendering, components are pure HTML-returning functions, and the router is completely decoupled from UI. All wired together in `main.js`.

