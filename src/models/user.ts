export interface RegisterUser {
    email: string,
    password: string,
    firstLastName: string,
    secondLastName: string,
    phone: string,
    username: string,
    userType: string,
    terms: boolean,
    privacy: boolean,
}

export interface User {
    id: string;
    name: string;
    email: string;
}  