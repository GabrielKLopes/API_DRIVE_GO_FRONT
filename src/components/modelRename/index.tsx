

import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import './style.css'

interface FileItem {
    file_id: number;
    filename: string;
}

interface FolderItem {
    folder_id: number;
    foldername: string;
}

interface NewFolderRenameModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newName: string) => void;
    currentItem: FileItem | FolderItem | null;
}

const NewFolderRenameModal = ({ open, onClose, onSubmit, currentItem }: NewFolderRenameModalProps) => {
    const [newName, setNewName] = useState('');

    const handleSubmit = async () => {
        if (newName.trim() !== '') {
            onSubmit(newName);
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
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
                <h3>Renomear {currentItem && 'filename' in currentItem ? 'Arquivo' : 'Pasta'}</h3>
                <div className="input-folder">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={currentItem && 'filename' in currentItem ? 'Exemplo arquivo.doc' : 'Exemplo pasta'}
                    />
                </div>
                <div className="button">
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleSubmit}>Salvar</button>
                </div>
            </Box>
        </Modal>
    );
};

export default NewFolderRenameModal;
