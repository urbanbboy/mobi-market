import { USER_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios from "axios";

const BASE_URL = 'https://neobook.online/mobi-market'

export const $api = axios.create({
    baseURL: BASE_URL,
})

$api.interceptors.request.use((config) => {
    if(config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    }
    return config
})