import axios from "axios";
import type { User } from "../types/user";

export async function create(user: User) {
    
    const url = "http://172.20.10.4:42069/account"
    const options = {
        data: user
    }

    const res = await axios.post(url, options.data)
    return await res.data 
}