import React from "react";
import { HelpOutlineOutlined, SettingsOutlined, Apps, CheckCircleOutlineOutlined } from "@mui/icons-material";
import avatar from '../../assets/avatar.svg';
import './style.css'



const ButtonIcon = () => {
  return (
    <div className="button-icon-container ">
      <CheckCircleOutlineOutlined />
      <HelpOutlineOutlined />
      <SettingsOutlined />
      <Apps />
      <img src={avatar} alt="" />
       </div>
    
  );
};

export default ButtonIcon;
