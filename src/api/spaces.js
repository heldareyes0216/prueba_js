const BASE_URL = 'http://localhost:3000';

export const spacesApi = {
    async getAll() {
        const response = await fetch(`${BASE_URL}/spaces`);
        if (!response.ok) throw new Error('Error al cargar espacios');
        return await response.json();
    }
};