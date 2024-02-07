import React, { ReactNode } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

interface SidebarItemProps {
  icon: ReactNode; 
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text }) => {
  return (
    <ListItem button>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default SidebarItem;
