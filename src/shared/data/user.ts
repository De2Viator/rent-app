import { User } from "../types/user.js";

export const getUserData = (): User => {
    const user = {
        avatarUrl: localStorage.getItem('avatarUrl'),
        userName: localStorage.getItem('userName')
    } as User
    if(user.avatarUrl === null) user.avatarUrl = '';
    if(user.userName === null) user.userName = '';
    return user
}