import axios, {AxiosError} from 'axios';
import useErrorStore from '@/store/errorStore';
import { useAuthStore } from '@/store/tokenStore';
import {API_BASE_URL} from "@/utils/env.ts";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 600000
})
const token = useAuthStore.getState().token;
const whiteList: string[] = [
]

// request拦截器
api.interceptors.request.use(
    (config) => {
        console.log('Sending request:', config); // 添加日志
        let isToken = true
        whiteList.some((v) => {
            if (config.url && config.url == v) {
                return isToken = false
            }
        })
        if (token && isToken) {
            config.headers['token'] = 'Bearer ' + token;
        } else {
            window.location.href = '/login'
            return Promise.reject(new Error('No token'))
        }
        return config
    },
    (error: AxiosError) => {
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
api.interceptors.response.use(
    result => {
        const setError = useErrorStore.getState().setError;
        if (result.data.code === 1) {
            console.log('Response:', result.data); // for debug
            return result.data;
        } else {
            setError(result.data.msg)
        }
        return Promise.reject(result.data)
    },
    err => {
        console.log('Error:', err); // for debug
        const setError = useErrorStore.getState().setError;
        if (err.response?.status === 401) {
            useAuthStore.getState().logout();
            setError("Unauthorized access. Please log in again.");
            window.location.href = '/login';
        } else {
            setError(err.response?.data?.msg || "Network error");
        }
    }
)

export default api;
