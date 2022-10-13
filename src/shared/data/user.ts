import { User } from "../types/user";

type GetUserData = () => User;
export const getUserData: GetUserData = () => {
    const user = {
        avatarUrl: localStorage.getItem('avatarUrl'),
        userName: localStorage.getItem('userName')
    } as User
    if(user.avatarUrl === null) user.avatarUrl = '';
    if(user.userName === null) user.userName = '';
    return user
}