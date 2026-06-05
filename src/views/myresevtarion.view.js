import { reservationFormComponent } from '../components/reservationForm.component.js';
import { reservationTableComponent } from '../components/reservationTable.component.js';

export const myReservationsView = (reservations, spaces, user) => `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
            ${reservationFormComponent(spaces)}
        </div>
        <div class="lg:col-span-2 space-y-4">
            <h3 class="text-base font-bold text-slate-700">Historial de Mis Reservaciones</h3>
            ${reservationTableComponent(reservations, spaces, user)}
        </div>
    </div>
`;