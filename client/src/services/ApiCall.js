import axios from "axios"


export const commonRequest = async(methods,url,body,header) =>{

    // console.log(methods+""+url+""+body)

    let config = {
        method:methods,
        url,
        headers:header ? header : {
            "Content-Type":"application/json"
        },
        data:body,

    }
    return axios(config).then((data)=>{return data}).catch((err)=>{return err})
}