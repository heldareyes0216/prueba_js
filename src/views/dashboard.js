import { navbarComponent } from '../components/navbar.components.js';
import { myReservationsView } from '../views/myresevtarion.view.js';
import { adminReservationsView } from '../views/adminReservtaion.view.js';
import { storageService } from '../services/storage.services.js';
import { spacesApi } from '../api/spaces.js';
import { reservationsApi } from '../api/reservation.api.js';
import { validators } from '../utils/validators.js';

export const dashboardView = async (container) => {
    const user = storageService.get('user_session');

    
    const [allSpaces, allReservations] = await Promise.all([
        spacesApi.getAll(),
        reservationsApi.getAll()
    ]);

    
    const displayReservations = user.role === 'admin'
        ? allReservations
        : allReservations.filter(r => r.userId === user.id);

    container.innerHTML = `
        <div class="min-h-screen bg-slate-50 flex flex-col">
            ${navbarComponent(user)}
            <main class="flex-1 p-8" id="dashboard-content-area"></main>
        </div>
    `;

    const contentArea = document.getElementById('dashboard-content-area');

    
    if (user.role === 'admin') {
        contentArea.innerHTML = adminReservationsView(displayReservations, allSpaces, user);
    } else {
        contentArea.innerHTML = myReservationsView(displayReservations, allSpaces, user);
    }

    // Evento de Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
        storageService.clear();
        window.location.hash = '#/login';
    });

    // Evento exclusivo para envío de formularios de usuarios estándar
    const resForm = document.getElementById('form-reservation');
    if (resForm) {
        resForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const spaceId = document.getElementById('res-space').value;
            const date = document.getElementById('res-date').value;
            const startTime = document.getElementById('res-start').value;
            const endTime = document.getElementById('res-end').value;
            const reason = document.getElementById('res-reason').value.trim();

            if (startTime >= endTime) {
                alert('La hora de inicio debe ser anterior a la hora de salida.');
                return;
            }

           
            const hasConflict = validators.checkOverlap(allReservations, spaceId, date, startTime, endTime);
            if (hasConflict) {
                alert('⚠️ Conflicto detectado: El espacio ya se encuentra reservado en el rango de horario seleccionado.');
                return;
            }

            const payload = {
                userId: user.id,
                userName: user.name,
                spaceId,
                date,
                startTime,
                endTime,
                reason,
                status: 'Pending'
            };

            await reservationsApi.create(payload);
            alert('Reservación registrada con éxito.');
            dashboardView(container); // Recarga controlada de la SPA para actualizar tablas de forma reactiva
        });
    }


    container.addEventListener('click', async (e) => {
        const action = e.target.dataset.action;
        const id = e.target.dataset.id;

        if (!action || !id) return;

        if (action === 'approve' && user.role === 'admin') {
            await reservationsApi.update(id, { status: 'Approved' });
        } else if (action === 'reject' && user.role === 'admin') {
            await reservationsApi.update(id, { status: 'Rejected' });
        } else if (action === 'cancel') {
            await reservationsApi.update(id, { status: 'Cancelled' });
        } else if (action === 'delete' && user.role === 'admin') {
            if (confirm('¿Confirmas la eliminación permanente de este registro?')) {
                await reservationsApi.delete(id);
            }
        }

        dashboardView(container); // Actualización instantánea del DOM de la SPA
    });
};