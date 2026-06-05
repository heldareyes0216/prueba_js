const BASE_URL = 'http://localhost:3000';

export const reservationsApi = {
    async getAll() {
        const response = await fetch(`${BASE_URL}/reservations`);
        if (!response.ok) throw new Error('Error al cargar reservaciones');
        return await response.json();
    },

    async create(reservationData) {
        const response = await fetch(`${BASE_URL}/reservations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationData)
        });
        if (!response.ok) throw new Error('Error al guardar la reservación');
        return await response.json();
    },

    async update(id, partialData) {
        const response = await fetch(`${BASE_URL}/reservations/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partialData)
        });
        if (!response.ok) throw new Error('Error al actualizar la reservación');
        return await response.json();
    },

    async delete(id) {
        const response = await fetch(`${BASE_URL}/reservations/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar la reservación');
        return true;
    }
};