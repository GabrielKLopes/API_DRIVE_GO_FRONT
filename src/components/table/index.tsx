import React from 'react';
import folder from '../../assets/folder.svg';
import gdocs from '../../assets/gdocs.svg';
import gsheets from '../../assets/gsheets.svg';
import gslides from '../../assets/gslides.svg';
import pdf from '../../assets/pdf.svg';
import avatar from '../../assets/avatar.svg';
import './style.css';


interface FileItem {
  filename: string;
  path: string;
  size: number;
  updated_at: string;
  shared: boolean;
  user?: {
    username: string;
  };
  fileType?: {
    name: string;
  };
}

interface FolderItem {
  foldername: string;
  path: string;
  updated_at: string;
  shared: boolean;
  user?: {
    username: string;
  };
}

interface Props {
  data: (FileItem | FolderItem)[];
}

const getFileIcon = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'doc':
      return gdocs;
    case 'xlsx':
      return gsheets;
    case 'ppt':
      return gslides;
    case 'pdf':
      return pdf;
    default:
      return folder;
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

const TableComponent =({ data } : Props) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Nome</th>
            <th className="table-header">Proprietário</th>
            <th className="table-header">Data de Modificação</th>
            <th className="table-header">Tamanho (em bytes)</th>
          </tr>
          
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {('filename' in item) ? (
                <>
                  <td className="table-cell">
                   <div className="position">
                   <img src={getFileIcon((item as FileItem).filename)} alt="" className="icon" />
                    {(item as FileItem).filename}
                   </div>
                  </td>
                  <td className="table-cell">
                    <div className="position">
                    <img src={avatar} alt="" />
                    {(item as FileItem).user?.username}
                    </div>
                 
                  </td>
                  <td className="table-cell">
                    {formatDate((item as FileItem).updated_at) }
                  </td>
                  <td className="table-cell">
                    {(item as FileItem).size}
                  </td>
              
                </>
              ) : (
                <>
                  <td className="table-cell">
                    <div className="position">
                    <img src={folder} alt="" className="icon" />
                    {(item as FolderItem).foldername}
                    </div>
                  </td>
                  <td className="table-cell">
                  <div className="position">
                  <img src={avatar} alt="" />
                    {(item as FolderItem).user?.username}
                  </div>
                  </td>
                  <td className="table-cell">
                    {formatDate((item as FolderItem).updated_at)}
                  </td>
                  <td className="table-cell">
                    -
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
