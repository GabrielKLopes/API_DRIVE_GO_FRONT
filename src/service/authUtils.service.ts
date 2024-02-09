import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; 

export const getLoggedUserPermissionId = () => {
  const token = Cookies.get('token');

  if (token) {
    const decodedToken = jwtDecode(token) as { permission: { permission_id: number }; email: string }; 

    if (decodedToken && decodedToken.permission && decodedToken.permission.permission_id) { 
      return decodedToken.permission.permission_id;
    }
  }

  return null;
};

export const getLoggedUserPermissionFiled = () => {
    const token = Cookies.get('token');
  
    if (token) {
      const decodedToken = jwtDecode(token) as { permissionsFile: { permissionFile_id: number }; email: string }; 
  
      if (decodedToken && decodedToken.permissionsFile && decodedToken.permissionsFile.permissionFile_id) { 
        return decodedToken.permissionsFile.permissionFile_id;
      }
    }
  
    return null;
  };

  export const getLoggedUserid = () => {
    const token = Cookies.get('token');
  
    if (token) {
      const decodedToken = jwtDecode(token) as { user_id: number, email: string }; 
      
      if (decodedToken && decodedToken.user_id && decodedToken.user_id) { 
        
        return decodedToken.user_id;
        
      }
    }
  
    return null;
  };