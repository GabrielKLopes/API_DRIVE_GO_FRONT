import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "../sidebar";
import NavBar from "../navbar";
import SidebarRight from "../siderBarRight";
import EditIcon from '@mui/icons-material/Edit';
import EditUserModal from "../UserTable/index"; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar  } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

import "./style.css";
import AddUserModal from "../CreateUser";
import { getLoggedUserPermissionId } from "../../service/authUtils.service";


export interface UserData {
  user_id: number;
  username: string;
  email: string;
  password: string;
  permissionsFile?: {
    permissionFile_id: number;
    name: string;
  };
  permission?: {
    permission_id: number;
    name: string;
  };
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserTable = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [userPermissionId, setUserPermissionId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get<UserData[]>("http://localhost:3000/session/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);

       
        const permissionId = getLoggedUserPermissionId();
        console.log("Permission ID do usuário conectado:", permissionId);
        setUserPermissionId(permissionId);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          
          navigate("/");
        } else {
          console.error("Erro ao buscar dados de usuários:", error);
        }
      }
    };

    fetchUserData();
  }, [editModalOpen, navigate]); 

  const handleEditUser = (user: UserData) => {
    if (userPermissionId !== 2) {
      setSelectedUser(user);
      setEditModalOpen(true);
    } else {
      setSnackbarOpen(true); 
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseAddUserModal = () => {
    setAddUserModalOpen(false);
  };

  return (
    <div>
      <NavBar />
      <Sidebar />
      <SidebarRight />
      <div className="buttonAdd">
        <button onClick={() => setAddUserModalOpen(true)} className="add-button-container-user" disabled={userPermissionId === 2}>
          <AddIcon className="add-button-icon" />
          <span className="add-button-text">Novo Usuário</span>
        </button>
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome de Usuário</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Permissão de Arquivo</TableCell>
                  <TableCell>Permissão Usuário</TableCell>
                  <TableCell>Editar Usuário</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell>{user.user_id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.permissionsFile?.name}</TableCell>
                    <TableCell>{user.permission?.name}</TableCell>
                    <TableCell>
                      <IconButton 
                        aria-label="Opções" 
                        onClick={() => handleEditUser(user)} 
                        disabled={userPermissionId === 2}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <EditUserModal open={editModalOpen} onClose={handleCloseEditModal} user={selectedUser} />
      <AddUserModal open={addUserModalOpen} onClose={handleCloseAddUserModal} />
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          Você não tem permissão para editar este usuário.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserTable;
