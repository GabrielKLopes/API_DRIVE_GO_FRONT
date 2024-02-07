import Cookies from 'js-cookie';
import { api } from './api.service';

interface RegisterUser {
  username: string;
  email: string;
  password: string;
  permission_id?: number;
  permissionFile_id?: number;
}

export const RegisterUser = {
  register: async (registerUser: RegisterUser) => {
    try {
      const response = await api.post('/register/user', registerUser);

   
      if (response.data && response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7 }); 
      }

      return response.data;
    } catch (error) {
      throw new Error('Falha no registro');
    }
  },
};
