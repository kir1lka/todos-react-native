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

export interface Category {
  id: number;
  name: string;
  id_color: number;
  id_icon: number;
  id_user: number;
  isEditable: boolean;
  color_category: Color_category;
}
