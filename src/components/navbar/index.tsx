import React from 'react';
import './style.css';
import SearchBar from '../search';
import ButtonIcon from '../buttonIcon';
import logo from '../../assets/logo.svg';

const NavBar = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>Drive</span>
        <div className="search">
        <SearchBar /> 
        </div>
      </div>
     
      
      <div className="icon-container">
        <ButtonIcon />
      </div>
    </div>
  );
};

export default NavBar;
