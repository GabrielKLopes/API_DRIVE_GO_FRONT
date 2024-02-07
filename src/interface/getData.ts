import axios from 'axios';

interface FileItem {
  filename: string;
  path: string;
  size: number;
  updated_at: string;
  shared: boolean;
  user_id: number;
  username: string;
}

interface FolderItem {
  foldername: string;
  path: string;
  updated_at: string;
  shared: boolean;
  user_id: number;
  username: string;
}

interface UserData {
  username: string;
}

export async function getData(token: string): Promise<(FileItem | FolderItem)[]> {
  try {
    const filesResponse = await axios.get<FileItem[]>('http://localhost:3000/session/file', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const foldersResponse = await axios.get<FolderItem[]>('http://localhost:3000/session/folder', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return [...filesResponse.data, ...foldersResponse.data];
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
}

export async function getUserData(token: string, user_id: number): Promise<UserData | null> {
  try {
    const response = await axios.get<UserData>(`http://localhost:3000/session/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return null;
  }
}
