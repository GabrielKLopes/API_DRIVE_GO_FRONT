import React from "react";
import './style.css'; 
import calendar from '../../assets/calendar.svg';
import gkeep from '../../assets/gkeep.svg';
import task from '../../assets/task.svg';
import singleuser from '../../assets/singleuser.svg';

const SidebarRight = () => {
    return (
        <div className="sidebar-right-container">
            <div className="container">
                <img src={calendar} alt="" className="sidebar-image" />
                <img src={gkeep} alt="" className="sidebar-image" />
                <img src={task} alt="" className="sidebar-image" />
                <img src={singleuser} alt="" className="sidebar-image" />
            </div>
        </div>
    );
};

export default SidebarRight;
