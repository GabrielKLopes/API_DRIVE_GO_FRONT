
import { api } from './api.service';
import Cookies from 'js-cookie';

export const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/session/authorization', credentials);
      Cookies.set('token', response.data.token);
      return response.data.username;
    } catch (error) {
      throw new Error('Falha no login');
    }
  },

  logout: async () => {
    Cookies.remove('token');
  },

  getToken: () => Cookies.get('token')
};
