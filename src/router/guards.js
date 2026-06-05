import { storageService } from '../services/storage.services.js';

export const guards = {
    isAuthenticated() {
        const session = storageService.get('user_session');
        return session !== null;
    },

    isAdmin() {
        const session = storageService.get('user_session');
        return session && session.role === 'admin';
    }
};