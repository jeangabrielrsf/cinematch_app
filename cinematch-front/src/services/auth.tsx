import backApi from "@/services/backApi";
import { UserLoginData, UserRegisterData } from "@/utils/formUtils";

export async function login(userData: UserLoginData) {
    console.log(userData);
    try {
        const response = await backApi.post("auth/token", userData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        console.log(response);
        return response.data;
    } catch (err) {
        console.error("Erro no login: ", err);
        throw err;
    }
}

export async function register(userData: UserRegisterData) {
    try {
        const response = await backApi.post("/users/", userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
