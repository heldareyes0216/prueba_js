export const navbarComponent = (user) => `
    <nav class="bg-slate-900 text-white py-4 px-8 flex justify-between items-center shadow-md">
        <div class="flex items-center space-x-4">
            <span class="text-xl font-bold tracking-wider text-indigo-400">CINE RIWI</span>
            <span class="bg-slate-800 text-indigo-300 text-xs px-2 py-0.5 rounded-full font-semibold uppercase">${user.role}</span>
        </div>
        <div class="flex items-center space-x-6">
            <div class="text-right">
                <p class="text-sm font-medium">${user.name}</p>
                <p class="text-xs text-slate-400">${user.email}</p>
            </div>
            <button id="btn-logout" class="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                Cerrar Sesión
            </button>
        </div>
    </nav>
`;