import { commonRequest } from "./ApiCall";
import {BACKEND_URL} from "./helper";

export const registerFunction = async (data) =>{

    return await commonRequest("POST",`${BACKEND_URL}/user/register`,data)

}

export const sendOtpFunction = async (data) =>{

    return await commonRequest("POST",`${BACKEND_URL}/user/sendotp`,data)

}

