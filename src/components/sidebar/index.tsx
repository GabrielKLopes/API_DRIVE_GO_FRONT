import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SidebarItem from "../sidebarItem";
import HomeIcon from "@mui/icons-material/Home";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import PhonelinkOutlinedIcon from "@mui/icons-material/PhonelinkOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import AddButton from "../buttonAdd";
import PersonIcon from "@mui/icons-material/Person";
import NewModal from "../modal";
import "./style.css";
import UserTable from "../User/index";
import { getLoggedUserPermissionFiled } from "../../service/authUtils.service";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showUserTable, setShowUserTable] = useState(false);
  const [permissionFileId, setPermissionFileId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermissionFileId = async () => {
      const permissionFileId = await getLoggedUserPermissionFiled();
      setPermissionFileId(permissionFileId);
      console.log("permissionFileId:", permissionFileId); 
    };

    fetchPermissionFileId();
  }, []);

  const handleNewButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUserButtonClick = () => {
    setShowUserTable(!showUserTable);
    navigate("/session/user");
  };
  const handleSharedButtonClick = () => {
    setShowUserTable(!showUserTable);
    navigate("/session/shared");
  };

  const handleMyDriveButtonClick = () => {
    setShowUserTable(!showUserTable);
    navigate("/home");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="sidebar-container">
      <AddButton
        onClick={handleNewButtonClick}
        disabled={permissionFileId === 3} 
      />
      <div className="sidebarItem">
        <div className="container-1">
          <SidebarItem icon={<HomeIcon />} text="Pessoal" />
          <button className="button-user" onClick={handleMyDriveButtonClick}>
            <SidebarItem
              icon={<BackupTableOutlinedIcon />}
              text="Meu Drive"
            />
          </button>
          <SidebarItem
            icon={<PhonelinkOutlinedIcon />}
            text="Computadores"
          />
        </div>

        <div className="container-2">
        <button className="button-user" onClick={handleSharedButtonClick}>
            <SidebarItem
              icon={<PeopleOutlineOutlinedIcon />}
              text="Compartilhados comigo"
            />
          </button>
        
          <SidebarItem icon={<WatchLaterOutlinedIcon />} text="Recentes" />
          <SidebarItem
            icon={<StarBorderOutlinedIcon />}
            text="Com estrela"
          />
        </div>

        <div className="container-2">
          <SidebarItem
            icon={<ReportGmailerrorredOutlinedIcon />}
            text="Span"
          />
          <SidebarItem
            icon={<DeleteOutlineOutlinedIcon />}
            text="Lixeira"
          />
          <SidebarItem
            icon={<CloudOutlinedIcon />}
            text="Armazenamento"
          />
          <button className="button-user" onClick={handleUserButtonClick}>
            <SidebarItem icon={<PersonIcon />} text="Usuários" />
          </button>
          <LinearProgress
            className="progress-bar"
            variant="determinate"
            value={50}
          />
        </div>

        <div className="container-3">
          <span>12.50 GB de 35 GB usados </span>
          <button>Comprar mais armazenamento</button>
        </div>
      </div>
      <NewModal open={isModalOpen} onClose={handleCloseModal} anchorEl={anchorEl} />
      {showUserTable && <UserTable />}
      <div>
      
      <button onClick={handleLogout}>Sair</button>
    </div>
    </div>
  );
};

export default Sidebar;
