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
