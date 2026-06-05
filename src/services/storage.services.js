export const storageService = {
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error leyendo localStorage en la clave ${key}:`, error);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error guardando en localStorage en la clave ${key}:`, error);
        }
    },

    clear() {
        localStorage.clear();
    }
};