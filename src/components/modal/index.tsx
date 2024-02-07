import React from 'react';
import Popover from '@mui/material/Popover';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import gsheets from '../../assets/gsheets.svg';
import gdocs from '../../assets/gdocs.svg';
import gslides from '../../assets/gslides.svg';
import gforms from '../../assets/gforms.svg';
import './style.css';

interface NewModalProps {
    open: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null;
}

const NewModal = ({ open, onClose, anchorEl }: NewModalProps) => {
    const handleItemClick = () => {
        onClose(); // Fechar o modal ao clicar em um item
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
                <button className="modal-item" onClick={handleItemClick}>
                    <CreateNewFolderOutlinedIcon />
                    <span>Nova Pasta</span>
                </button>
                <hr className="modal-divider" />
                <button className="modal-item" onClick={handleItemClick}>
                    <UploadFileOutlinedIcon />
                    <span>Novo arquivo</span>
                </button>
                <button className="modal-item" onClick={handleItemClick}>
                    <UploadFileOutlinedIcon />
                    <span>Upload de Pasta</span>
                </button>
                <hr className="modal-divider" />
                <button className="modal-item" onClick={handleItemClick}>
                    <img src={gdocs} alt="Documentos Google" />
                    <span>Documentos Google</span>
                </button>
                <button className="modal-item" onClick={handleItemClick}>
                    <img src={gsheets} alt="Planilas Google" />
                    <span>Planilhas Google</span>
                </button>
                <button className="modal-item" onClick={handleItemClick}>
                    <img src={gslides} alt="Apresentações Google" />
                    <span>Apresentações Google</span>
                </button>
                <button className="modal-item" onClick={handleItemClick}>
                    <img src={gforms} alt="Formulários Google" />
                    <span>Formulários Google</span>
                </button>
            </div>
        </Popover>
    );
};

export default NewModal;
