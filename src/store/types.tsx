export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Auth {
  accessToken: string | null;
}

export interface Color_category {
  id: number;
  name: string;
  code: string;
}

export interface Icons {
  id: number;
  symbol: string;
  code: string;
}

export interface ICategory {
  id: number;
  name: string;
  id_color: number;
  id_icon: number;
  id_user: number;
  isEditable: boolean;
  color_category: Color_category | null;
  icon: Icons | null;
}

export interface ICategoryRequest {
  id: number;
  name: string;
  id_color: number;
  id_icon: number;
  id_user: number;
  isEditable: boolean;
}

export interface ITask {
  id: number;
  name: string;
  id_category: number;
  isCompleted: boolean;
  id_user: number;
  category: ICategory;
  created_at: number;
  updated_at: number;
}

export interface ITaskRequest {
  name: string;
  id_category: number;
  isCompleted: boolean;
  id_user: number;
  created_at: number;
  updated_at: number;
}
