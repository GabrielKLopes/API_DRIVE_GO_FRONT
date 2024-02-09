import React, { useState } from "react";
import folder from "../../assets/folder.svg";
import gdocs from "../../assets/gdocs.svg";
import gsheets from "../../assets/gsheets.svg";
import gslides from "../../assets/gslides.svg";
import pdf from "../../assets/pdf.svg";
import avatar from "../../assets/avatar.svg";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./style.css";
import NewModalOption from "../modalOptions";
import axios from "axios";
import Cookies from "js-cookie";

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

interface Props {
  data: (FileItem | FolderItem)[];
  setData: React.Dispatch<React.SetStateAction<(FileItem | FolderItem)[]>>;
}

const getFileIcon = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "doc":
      return gdocs;
    case "xlsx":
      return gsheets;
    case "ppt":
      return gslides;
    case "pdf":
      return pdf;
    default:
      return folder;
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

const TableComponent = ({ data, setData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<
    FileItem | FolderItem | null
  >(null);

  const handleNewButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: FileItem | FolderItem
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteItem = () => {
    const token = Cookies.get("token");
    if (!token || !selectedItem) return;

    let url;
    if ("file_id" in selectedItem) {
      // Se for um arquivo, construa a URL de exclusão de arquivo
      url = `http://localhost:3000/session/file/${selectedItem.file_id}`;
    } else {
      // Se for uma pasta, construa a URL de exclusão de pasta
      url = `http://localhost:3000/session/folder/${selectedItem.folder_id}`;
    }

    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Resposta do servidor:", response);
        console.log("Item excluído com sucesso:", selectedItem);

        setData((prevData) =>
          prevData.filter((dataItem) => {
            if ("file_id" in selectedItem && "file_id" in dataItem) {
              return dataItem.file_id !== selectedItem.file_id;
            } else if ("folder_id" in selectedItem && "folder_id" in dataItem) {
              return dataItem.folder_id !== selectedItem.folder_id;
            }
            return true;
          })
        );
      })
      .catch((error) => {
        console.error("Erro ao excluir item:", error);
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };


  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Nome</th>
            <th className="table-header">Proprietário</th>
            <th className="table-header">Data de Modificação</th>
            <th className="table-header">Tamanho do</th>
            <th className="table-header"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {"filename" in item ? (
                <>
                  <td className="table-cell">
                    <div className="position">
                      <img
                        src={getFileIcon((item as FileItem).filename)}
                        alt=""
                        className="icon"
                      />
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
                    {formatDate((item as FileItem).updated_at)}
                  </td>
                  <td className="table-cell">{(item as FileItem).size}</td>
                  <td className="table-cell">
                    <button
                      onClick={(event) => handleNewButtonClick(event, item)}
                      className="button-options"
                    >
                      <IconButton aria-label="Opções">
                        <MoreVertIcon />
                      </IconButton>
                    </button>
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
                  <td className="table-cell">-</td>
                  <td className="table-cell">
                    <button
                      onClick={(event) => handleNewButtonClick(event, item)}
                      className="button-options"
                    >
                      <IconButton aria-label="Opções">
                        <MoreVertIcon />
                      </IconButton>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <NewModalOption
        open={isModalOpen}
        onClose={handleCloseModal}
        anchorEl={anchorEl}
        onDelete={handleDeleteItem}
        currentItem={selectedItem}
        setData={setData}
        data={data}
      />
    </div>
  );
};

export default TableComponent;
