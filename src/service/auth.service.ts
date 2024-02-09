import { api } from './api.service';
import Cookies from 'js-cookie';

export const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/session/authorization', credentials);
      Cookies.set('token', response.data.token);
      const user = await getUserInfo(); 
     
      return user.permission_id; 
    } catch (error) {
      throw new Error('Falha no login');
    }
  },

  logout: async () => {
    Cookies.remove('token');
  },

  getToken: () => Cookies.get('token')
};

const getUserInfo = async () => {
  try {
    const token = Cookies.get('token');
    const response = await api.get('session/user', { headers: { Authorization: `Bearer ${token}` } });
 
    return response.data; 
  } catch (error) {
    throw new Error('Erro ao obter informações do usuário');
  }
};
