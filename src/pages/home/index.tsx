import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './style.css';
import Sidebar from '../../components/sidebar';
import NavBar from '../../components/navbar';
import SidebarRight from '../../components/siderBarRight';
import TableComponent from '../../components/table';
import { getData, getUserData } from '../../interface/getData'; 

interface FileItem {
  filename: string;
  path: string;
  size: number;
  updated_at: string;
  shared: boolean;
  user_id: number;
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
  user_id: number;
  user?: {
    username: string;
  };
}

interface UserData {
  username: string;
}

export type DriveItem = FileItem | FolderItem;

const Home = () => {
  const [data, setData] = useState<DriveItem[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const fetchedData = await getData(token);
      setData(fetchedData);
      console.log(fetchedData);
      if (fetchedData.length > 0 && fetchedData[0].user_id) {
        const firstUserId = fetchedData[0].user_id;
        const fetchedUserData = await getUserData(token, firstUserId);
        setUserData(fetchedUserData);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <NavBar />
      </header>
      <aside className="sidebar-left">
        <Sidebar />
      </aside>
      <aside className="sidebar-right">
        <SidebarRight />
      </aside>
      <main className="main-content">
        {userData && <p>Bem-vindo, {userData.username}!</p>}
        <div className="card">
          <TableComponent data={data} />
        </div>
      </main>
    </div>
  );
};

export default Home;
