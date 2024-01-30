export interface User {
    id:string;
    firstName:string|null;
    lastName:string|null;
    username:string|null;
    hasImage:boolean;
    imageUrl:string;
}

export interface AssignedUser {
    UserId:string;
    imageUrl:string;
}