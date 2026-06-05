import { loginFormComponent } from '../components/loginForm.components.js';
import { authApi } from '../api/auth.js';
import { storageService } from '../services/storage.services.js';

export const loginView = async (container) => {
    container.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div class="text-center">
                    <h2 class="text-2xl font-extrabold text-slate-800">Riwi Workspace Booking</h2>
                    <p class="text-sm text-slate-500 mt-1">Ingresa tus credenciales autorizadas</p>
                </div>
                <div id="container-form-login"></div>
            </div>
        </div>
    `;

    document.getElementById('container-form-login').innerHTML = loginFormComponent();

    const form = document.getElementById('form-login');
    const errorBox = document.getElementById('login-error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        try {
            const user = await authApi.login(email, password);
            if (user) {
                storageService.set('user_session', user);
                window.location.hash = '#/dashboard';
            } else {
                errorBox.textContent = 'Credenciales incorrectas. Intenta nuevamente.';
                errorBox.classList.remove('hidden');
            }
        } catch (error) {
            errorBox.textContent = 'Error al conectar con la base de datos.';
            errorBox.classList.remove('hidden');
        }
    });
};