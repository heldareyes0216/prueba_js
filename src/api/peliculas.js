export const peliculasApi = {
    async getAll() {
        const response = await fetch(`${BASE_URL}/peliculas`);
        if (!response.ok) throw new Error('Error al cargar las peliculas');
        return await response.json();
    }
};