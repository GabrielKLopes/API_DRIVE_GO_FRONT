import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "../sidebar";
import NavBar from "../navbar";
import SidebarRight from "../siderBarRight";
import { getLoggedUserid } from "../../service/authUtils.service";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { format, isValid } from "date-fns"; 

export interface SharedData {
  sharedFolder_id: number;
  folder?: {
    folder_id: number;
    foldername: string;
    created_at: string;
    updated_at: string;
  };
}

const SharedTableGet = () => {
  const [sharedData, setSharedData] = useState<SharedData[]>([]);
  const userId = getLoggedUserid(); 

  useEffect(() => {
    const fetchSharedData = async () => {
      if (!userId) return; 

      try {
        const token = Cookies.get("token");
        const response = await axios.get(`http://localhost:3000/session/shared-folder/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSharedData(response.data.sharedFolders);
      } catch (error) {
        console.error("Erro ao buscar dados compartilhados:", error);
      }
    };

    fetchSharedData();
  }, [userId]); 

  // Função para formatar a data para o formato dd/MM/yyyy
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ""; // Retorna uma string vazia se a data for undefined
    const date = new Date(dateString);
    if (!isValid(date)) return ""; // Retorna uma string vazia se a data for inválida
    return format(date, "dd/MM/yyyy");
  };

  return (
    <div>
      <NavBar />
      <Sidebar />
      <SidebarRight />
      <div className="table-container">
        <div className="table-wrapper">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome da Pasta</TableCell>
                  <TableCell>Data de Criação</TableCell>
                  <TableCell>Data de Atualização</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sharedData.map((data) => (
                  <TableRow key={data.sharedFolder_id}>
                    <TableCell>{data.sharedFolder_id}</TableCell>
                    <TableCell>{data.folder?.foldername}</TableCell>
                    <TableCell>{formatDate(data.folder?.created_at)}</TableCell>
                    <TableCell>{formatDate(data.folder?.updated_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default SharedTableGet;
