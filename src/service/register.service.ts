import { api } from './api.service';

interface RegisterUser {
  username: string;
  email: string;
  password: string;
permission_id?:number
permissionFile_id?:number
}

export const RegisterUser = {
  register: async (registerUser: RegisterUser) => {
    try {
     

      const response = await api.post('/register/user', registerUser);

    

      return response.data;
    } catch (error) {
       
       
      
        throw new Error('Falha no registro');
    }
  },
};
