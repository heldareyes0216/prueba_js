import { guards } from '../router/guards.js';
import { loginView } from '../views/login.view.js';
import { dashboardView } from '../views/dashboard.js';

const routes = {
    '#/login': { view: loginView, private: false, adminOnly: false },
    '#/dashboard': { view: dashboardView, private: true, adminOnly: false }
};

export const router = async () => {
    const hash = window.location.hash || '#/login';
    const route = routes[hash];
    const appContainer = document.getElementById('app');

    
    if (!appContainer) return;

    // Manejo de error 404 si la URL no está registrada
    if (!route) {
        appContainer.innerHTML = `<h1 class="text-center text-2xl mt-10 text-red-500 font-bold">404 - Not Found</h1>`;
        return;
    }

    // Middleware Guard de Autenticación Privada
    if (route.private && !guards.isAuthenticated()) {
        window.location.hash = '#/login';
        return;
    }

    // Middleware Guard para Redirección de Usuarios ya Autenticados
    if (hash === '#/login' && guards.isAuthenticated()) {
        window.location.hash = '#/dashboard';
        return;
    }

    // Inyección de la vista correspondiente pasando el nodo raíz
    await route.view(appContainer);
};

// Escuchadores de eventos para la manipulación reactiva de la URL de la SPA
window.addEventListener('hashchange', router);