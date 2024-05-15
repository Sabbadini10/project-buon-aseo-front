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

export interface UserType {
    _id: string;
    name: string;
   
}