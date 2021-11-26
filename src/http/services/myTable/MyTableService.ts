import http from '../../http';

export interface IUser {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  age: number;
  created_at: Date;
  updated_at: Date;
}

export type TItem = {
  surname: string;
  name: string;
  patronymic: string;
  age: number;
};

class myTableService {
  getAllUsers() {
    return http.get<IUser[]>('/consta-my-tables');
  }

  removeItem(id: string) {
    return http.delete<IUser>(`/consta-my-tables/${id}`);
  }

  postItem(item: TItem) {
    return http.post<IUser>('/consta-my-tables', item);
  }
}

export default new myTableService();
