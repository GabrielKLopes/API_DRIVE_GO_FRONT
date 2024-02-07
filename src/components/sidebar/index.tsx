import React, { useState } from "react";
import SidebarItem from "../sidebarItem"; 
import HomeIcon from '@mui/icons-material/Home';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import PhonelinkOutlinedIcon from '@mui/icons-material/PhonelinkOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import AddButton from "../buttonAdd";
import NewModal from "../modal";
import './style.css'; 

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleNewButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="sidebar-container">
            <AddButton onClick={handleNewButtonClick} />
            <div className="sidebarItem">
                <div className="container-1">
                    <SidebarItem icon={<HomeIcon/>} text="Pessoal" />
                    <SidebarItem icon={<BackupTableOutlinedIcon />} text="Meu Drive" />
                    <SidebarItem icon={<PhonelinkOutlinedIcon />} text="Computadores" />
                </div>

                <div className="container-2">
                    <SidebarItem icon={<PeopleOutlineOutlinedIcon/>} text="Compartilhados comigo" />
                    <SidebarItem icon={<WatchLaterOutlinedIcon />} text="Recentes" />
                    <SidebarItem icon={<StarBorderOutlinedIcon />} text="Com estrela" />
                </div>
                
                <div className="container-2">
                    <SidebarItem icon={<ReportGmailerrorredOutlinedIcon/>} text="Span" />
                    <SidebarItem icon={<DeleteOutlineOutlinedIcon />} text="Lixeira" />
                    <SidebarItem icon={<CloudOutlinedIcon />} text="Armazenamento" />
                    <LinearProgress className="progress-bar" variant="determinate" value={50} />
                </div>

                <div className="container-3">
                    <span>12.50 GB de 35 GB usados </span>
                    <button>Comprar mais armazenamento</button>
                </div>
            </div>
            <NewModal open={isModalOpen} onClose={handleCloseModal} anchorEl={anchorEl} />
        </div>
    );
};

export default Sidebar;
