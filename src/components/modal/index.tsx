import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import gsheets from '../../assets/gsheets.svg';
import gdocs from '../../assets/gdocs.svg';
import gslides from '../../assets/gslides.svg';
import gforms from '../../assets/gforms.svg';
import Cookies from 'js-cookie';
import './style.css';
import NewFolderModal from '../modalFolder/index';
import axios from 'axios';
interface NewModalProps {
    open: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null;
}

const NewModal = ({ open, onClose, anchorEl }: NewModalProps) => {
    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

    const handleNewFolderClick = () => {
        setIsNewFolderModalOpen(true);
    };

    const handleNewFolderClose = () => {
        setIsNewFolderModalOpen(false);
    };

    const handleNewFolderSubmit = (folderName: string) => {
        const newFolderData = {
            name: folderName,
          
        };
    
        const token = Cookies.get('token'); 
    
        axios.post('http://localhost:3000/session/folder', newFolderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Resposta do servidor:', response.data);
                
            })
            .catch(error => {
                console.error('Erro ao criar nova pasta:', error);
            });
    };

    return (
        <Popover
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',  
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <div className="new-modal">
                <button className="modal-item" onClick={handleNewFolderClick}>
                    <CreateNewFolderOutlinedIcon />
                    <span>Nova Pasta</span>
                </button>
                <hr className="modal-divider" />
                <button className="modal-item" onClick={handleNewFolderClick}>
                    <UploadFileOutlinedIcon />
                    <span>Novo arquivo</span>
                </button>
                <button className="modal-item" onClick={handleNewFolderClick}>
                    <UploadFileOutlinedIcon />
                    <span>Upload de Pasta</span>
                </button>
                <hr className="modal-divider" />
                <button className="modal-item" onClick={handleNewFolderClick}>
                    <img src={gdocs} alt="Documentos Google" />
                    <span>Documentos Google</span>
                </button>
                <button className="modal-item" onClick={handleNewFolderClick}>
                    <img src={gsheets} alt="Planilas Google" />
                    <span>Planilhas Google</span>
                </button>
                <button className="modal-item" onClick={handleNewFolderClick}>
                    <img src={gslides} alt="Apresentações Google" />
                    <span>Apresentações Google</span>
                </button>
                <button className="modal-item" onClick={handleNewFolderClick}>
                    <img src={gforms} alt="Formulários Google" />
                    <span>Formulários Google</span>
                </button>
                <NewFolderModal
                open={isNewFolderModalOpen}
                onClose={handleNewFolderClose}
                onSubmit={handleNewFolderSubmit}
            />
            </div>
        </Popover>
    );
};

export default NewModal;
