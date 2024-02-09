import React, { useState } from "react";
import axios from "axios";
import { Dialog, TextField, Button, Select, MenuItem, InputLabel, DialogContent, DialogActions, DialogTitle, SelectChangeEvent } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddUserModal = ({ open, onClose }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPermissionFileId, setSelectedPermissionFileId] = useState<number>(0);
  const [selectedPermissionId, setSelectedPermissionId] = useState<number>(0);

  const permissionsFileOptions = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Criador" },
    { id: 3, name: "Convidado" },
  ];
  
  const permissionsOptions = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Colaborador" },
  ];

  const handleClose = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/register/user/", {
        username,
        email,
        password,
        permissionFile_id: selectedPermissionFileId,
        permission_id: selectedPermissionId,
      });
      handleClose();
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  const handlePermissionFileChange = (event: SelectChangeEvent<number>) => {
    setSelectedPermissionFileId(event.target.value as number);
  };

  const handlePermissionChange = (event: SelectChangeEvent<number>) => {
    setSelectedPermissionId(event.target.value as number);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Usuário</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome de Usuário"
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Passaword"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Button onClick={handleSubmit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
