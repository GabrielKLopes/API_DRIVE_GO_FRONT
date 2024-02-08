import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import './style.css';


interface NewFolderModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (folderName: string) => void;
}

const NewFolderModal = ({ open, onClose, onSubmit }: NewFolderModalProps) => {
    const [folderName, setFolderName] = useState('');
  
    const handleClose = () => {
      setFolderName('');
      onClose();
    };
  
    const handleFocus = () => {
      if (folderName === 'Pasta sem nome') {
        setFolderName('');
      }
    };
  
    const handleSubmit = () => {
        const folderNameToSubmit = folderName.trim() !== '' ? folderName : 'Pasta sem nome';
        onSubmit(folderNameToSubmit);
        handleClose();
      };
  
    return (
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            backgroundColor: 'white',
            boxShadow: 24,
            padding: 4,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h3>Nova Pasta</h3>
          <div className="input-folder">
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onFocus={handleFocus}
              placeholder="Pasta sem nome"
            />
          </div>
          <div className="button">
            <button onClick={handleClose}>Cancelar</button>
            <button onClick={handleSubmit}>Criar</button>
          </div>
        </Box>
      </Modal>
    );
  };
  

export default NewFolderModal;
