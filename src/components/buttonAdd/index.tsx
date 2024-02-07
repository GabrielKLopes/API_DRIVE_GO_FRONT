
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import './style.css';
interface AddButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  }


const AddButton = ({ onClick } : AddButtonProps) => {
  return (
    <button onClick={onClick} className="add-button-container">
      <AddIcon className="add-button-icon" />
      <span className="add-button-text">Novo</span>
    </button>
  );
};

export default AddButton;