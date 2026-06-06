import { reservationTableComponent } from '../components/reservationTable.js';

// Para qué sirve: Define la interfaz exclusiva de supervisión para el administrador.
export const adminReservationsView = (reservations, spaces, user) => `
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <h3 class="text-base font-bold text-slate-700">Todas las Solicitudes Globales</h3>
            <span class="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs px-3 py-1 rounded-full font-semibold">Modo Supervisor</span>
        </div>
        ${reservationTableComponent(reservations, spaces, user)}
    </div>
`;