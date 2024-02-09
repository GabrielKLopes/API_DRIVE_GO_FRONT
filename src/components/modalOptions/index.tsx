import React, { useState } from 'react';
import { Popover } from '@mui/material';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import './style.css';
import NewFolderRenameModal from '../modelRename';
import ShareFolderModal from '../sharedModal';
import axios from 'axios';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import Cookies from 'js-cookie';

interface DriveItemCommon {
    path: string;
    updated_at: string;
    shared: boolean;
    user_id: number;
    user?: {
        username: string;
    };
}

interface FileItem extends DriveItemCommon {
    file_id: number;
    filename: string;
    size: number;
    fileType?: {
        name: string;
    };
}

interface FolderItem extends DriveItemCommon {
    folder_id: number;
    foldername: string;
}

interface NewModalOptionsProps {
    open: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null;
    onDelete: () => void;
    currentItem: FileItem | FolderItem | null;
    data: (FileItem | FolderItem)[];
    setData: React.Dispatch<React.SetStateAction<(FileItem | FolderItem)[]>>;
}

const NewModalOption = ({ open, onClose, anchorEl, onDelete, currentItem, data, setData }: NewModalOptionsProps) => {
    const [renameModalOpen, setRenameModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);

    const handleRenameClick = () => {
        setRenameModalOpen(true);
        onClose();
    };

    const handleShareClick = () => {
        if (currentItem && 'folder_id' in currentItem) {
            setShareModalOpen(true); 
        }
        onClose();
    };

    const handleRenameSubmit = async (newName: string) => {
        if (currentItem) {
            let endpoint: string;
            let fieldName: string;
            const token = Cookies.get("token");

            if ('file_id' in currentItem) {
                endpoint = `http://localhost:3000/session/file/${currentItem.file_id}`;
                fieldName = 'filename';
            } else if ('folder_id' in currentItem) {
                endpoint = `http://localhost:3000/session/folder/${currentItem.folder_id}`;
                fieldName = 'foldername';
            } else {
                console.error("Item inválido:", currentItem);
                setRenameModalOpen(false);
                return;
            }

            try {
                const response = await axios.put(endpoint, { [fieldName]: newName }, { headers: { Authorization: `Bearer ${token}` } });
                console.log("Resposta do servidor:", response.data);


                const updatedData = data.map(item => {
                    if ('file_id' in item && 'file_id' in currentItem && item.file_id === currentItem.file_id) {
                        return { ...item, [fieldName]: newName };
                    } else if ('folder_id' in item && 'folder_id' in currentItem && item.folder_id === currentItem.folder_id) {
                        return { ...item, [fieldName]: newName };
                    }
                    return item;
                });


                setData(updatedData);
            } catch (error) {
                console.error("Erro ao enviar requisição:", error);
            }
        } else {
            console.error("Nenhum item selecionado para renomear.");
        }

        setRenameModalOpen(false);
    };


    return (
        <>
            <Popover
                open={open}
                onClose={onClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >

                <div className="new-modal">
                    <button className="modal-item">
                        <OpenWithIcon />
                        <span>Abrir com</span>
                    </button>
                    <hr className="modal-divider" />
                    <button className="modal-item" >
                        <SaveAltIcon />
                        <span>Fazer download</span>
                    </button>
                    <button className="modal-item" onClick={handleRenameClick}>
                        <DriveFileRenameOutlineIcon />
                        <span>Renomear</span>
                    </button>
                    <hr className="modal-divider" />
                    <button className="modal-item" >
                        <SaveAltIcon />
                        <span>Fazer download</span>
                    </button>
                    <button className="modal-item" disabled={currentItem && 'file_id' in currentItem ? true : false} onClick={handleShareClick}>
                        <PersonAddAltIcon />
                        <span>Compartilhar</span>
                    </button>

                    <button className="modal-item" >
                        <FolderCopyOutlinedIcon />
                        <span>Organizar</span>
                    </button>
                    <button className="modal-item" >
                        <InfoOutlinedIcon />
                        <span>Informações da pasta</span>
                    </button>
                    <hr className="modal-divider" />
                    <button className="modal-item" onClick={onDelete}>
                        <DeleteOutlineOutlinedIcon />
                        <span>Remover</span>
                    </button>
                </div>
            </Popover>
            {renameModalOpen && currentItem && (
                <NewFolderRenameModal
                    open={renameModalOpen}
                    onClose={() => setRenameModalOpen(false)}
                    onSubmit={handleRenameSubmit}
                    currentItem={currentItem}
                />

            )}
            {shareModalOpen && (
                <ShareFolderModal
                    open={shareModalOpen}
                    onClose={() => setShareModalOpen(false)}
                    currentItem={currentItem}
                />)}

        </>
    );
};

export default NewModalOption;
