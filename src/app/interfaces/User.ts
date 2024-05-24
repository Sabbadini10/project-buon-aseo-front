export interface User {
  id: number;
  img: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  id_type_user: string;
  token: string;
}

export interface UserUpdate {
  id?: number;
  avatar?: string;
  name: string;
  email: string;
  password?: string;
  phone: number;
  dni?: number; 
  birthday?: Date;
  nationality?: string;
  postal_code?: string;
  address?: string;
  gender?: string;
  city?: string;
  id_type_user?: string;
  token?: string;
}

export interface UserRegister {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: number;
  id_type_user?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserType {
  _id: string;
  name: string;
}
