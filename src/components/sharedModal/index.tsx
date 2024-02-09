import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

import './style.css';
import Cookies from 'js-cookie';
import axios from 'axios'; 


interface FileItem {
    file_id: number;
    filename: string;
}

interface FolderItem {
    folder_id: number;
    foldername: string;
}


interface ShareFolderModalProps {
  open: boolean;
  onClose: () => void;
  currentItem: FolderItem | FileItem | null;
}

const ShareFolderModal = ({ open, onClose, currentItem }: ShareFolderModalProps) => {
    const [email, setEmail] = useState('');
  
    const handleShare = async () => {
      try {
        const token = Cookies.get("token");
        if (!currentItem || 'file_id' in currentItem) {
          console.error("Não é possível compartilhar um arquivo.");
          return;
        }
  
        const response = await axios.post(
          `http://localhost:3000/session/shared-folder/${currentItem.folder_id}`,
          { email: email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Compartilhamento realizado com sucesso:", response.data);
        onClose();
      } catch (error) {
        console.error("Erro ao compartilhar pasta:", error);
      }
    };
  
    const handleCancel = () => {
      onClose(); 
    };

  return (
    <Modal open={open}>
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
        <h3>Compartilhar</h3>
        <div className="input-file">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
          />
        </div>
        <div className="button">
          <button onClick={handleCancel}>Cancelar</button>
          <button onClick={handleShare}>Compartilhar</button>
        </div>
      </Box>
    </Modal>
  );
};

export default ShareFolderModal;
