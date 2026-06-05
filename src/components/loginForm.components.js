export const loginFormComponent = () => `
    <form id="form-login" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-slate-700">Correo Institucional</label>
            <input type="email" id="login-email" required class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
        </div>
        <div>
            <label class="block text-sm font-medium text-slate-700">Contraseña</label>
            <input type="password" id="login-password" required class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
        </div>
        <div id="login-error" class="hidden text-xs text-red-600 bg-red-50 p-2 rounded-lg font-medium text-center"></div>
        <button type="submit" class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition-colors shadow">
            Iniciar Sesión
        </button>
    </form>
`;