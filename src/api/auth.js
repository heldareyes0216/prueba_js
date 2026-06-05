const BASE_URL = 'http://localhost:3000';

export const authApi = {
    async login(email, password) {
        const response = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`);
        if (!response.ok) throw new Error('Error en el servidor de autenticación');
        const users = await response.json();
        return users.length > 0 ? users[0] : null; 
    }
};
