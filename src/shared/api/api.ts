import { USER_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios from "axios";


export const $api = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        Authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY)
    }
})