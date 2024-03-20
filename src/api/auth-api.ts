import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

//API
export const AuthAPI = {
    getAuthData() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string,rememberMe:boolean) {
        return instance.post(`auth/login`, {email:email, password:password,rememberMe:rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

//TYPES
