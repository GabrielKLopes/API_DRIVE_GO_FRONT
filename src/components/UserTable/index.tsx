import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { UserData } from "../User";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: UserData | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  user,
}) => {
  const [selectedPermissionFileId, setSelectedPermissionFileId] = useState<number>(0);
  const [selectedPermissionId, setSelectedPermissionId] = useState<number>(0);
  
  useEffect(() => {
    if (user) {
      setSelectedPermissionFileId(user.permissionsFile?.permissionFile_id as number);
      setSelectedPermissionId(user.permission?.permission_id as number);
    }
  }, [user]);

  if (!user) return null;

  const permissionsFileOptions = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Criador" },
    { id: 3, name: "Convidado" },
  ];
  const permissionsOptions = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Colaborador" },
  ];

  const handlePermissionFileChange = (event: SelectChangeEvent<number>) => {
    setSelectedPermissionFileId(event.target.value as number);
  };

  const handlePermissionChange = (event: SelectChangeEvent<number>) => {
    setSelectedPermissionId(event.target.value as number);
  };

  const handleSaveChanges = async () => {
    const userId = user.user_id;
    const token = Cookies.get("token");
  
    if (!token) {
      console.error("Token não encontrado. Usuário não autenticado.");
      return;
    }
  
    try {
      const updatedUserData = {
        user_id: userId,
        username: user.username,
        email: user.email,
        permissionFile_id: selectedPermissionFileId,
        permission_id: selectedPermissionId,
      };
  
      console.log("Dados do usuário a serem enviados:", updatedUserData);
  
      const response = await axios.put(`http://localhost:3000/session/user/${userId}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Dados do usuário atualizados com sucesso:", response.data);
      onClose(); 
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Usuário</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome de Usuário"
          defaultValue={user.username}
          fullWidth
          margin="normal"
          variant="outlined"
        />
         <TextField
          label="Email"
          defaultValue={user.email}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <InputLabel id="permissionFile-label">Permissão de Arquivo</InputLabel>
        <Select
          labelId="permissionFile-label"
          value={selectedPermissionFileId}
          onChange={handlePermissionFileChange}
          fullWidth
          variant="outlined"
        >
          {permissionsFileOptions.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="permission-label">Permissão Usuário</InputLabel>
        <Select
          labelId="permission-label"
          value={selectedPermissionId}
          onChange={handlePermissionChange}
          fullWidth
          variant="outlined"
        >
          {permissionsOptions.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSaveChanges} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
