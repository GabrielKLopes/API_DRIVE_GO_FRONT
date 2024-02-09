import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import "./style.css"

interface NewFileModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (filename: string, path: string, size: string, fileType_id: number) => void;
}

const NewFileModal = ({ open, onClose, onSubmit }: NewFileModalProps) => {
  const [fileName, setFileName] = useState('');

  const handleClose = () => {
    setFileName('');
    onClose();
  };

  const handleSubmit = () => {
    if (fileName.trim() !== '') {
      const path = '/default/path'; 
      const size = '0KB'; 
      const fileType_id = 1; 
      onSubmit(fileName, path, size, fileType_id); 
      handleClose();
    }
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
        <h3>Novo Arquivo</h3>
        <div className="input-file">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Exemplo arquivo.doc"
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

export default NewFileModal;
