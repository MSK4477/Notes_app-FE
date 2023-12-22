import axios from "axios"
import url from "../config/url"


//register

export const registerUser = async(formData) => { 

    const response = await axios.post(`${url}/user/register`, formData)

    return response.data

}

//verify
export const  verifyUser = async (token) => {

    const response = await axios.get(`${url}/user/verify?token=${token}`)
    console.log(response)
    return response.data
    }
    
    //login   
    
    export const loginUser = async( data ) =>  { 
    
        const response = await axios.post(`${url}/user/login`, data, {
            withCredentials:true
        })
    
        console.log(response)              
    
        return response.data
    }
    
    //forgotpassword
    
    export const forgotpassword = async(email) => {
    
        const response = await axios.post(`${url}/user/forgotpassword`, email)
    
        console.log(response)
    
        return response.data
    
    }
    
    //resetpassword 
    
    export const resetPassword = async(password, token) =>  {
        const response = await axios.post(`${url}/user/resetpassword?token=${token}`, password)
        console.log(response)
        return response.data
    }
    
    //logout 
    export const logout = async() =>  {
        const response = await axios.get(`${url}/user/logout`)
        console.log(response)
        return response.data
    }

    //get user


export const getUser = async () => { 
    const response  = await axios.get(`${url}/user`, { 
        withCredentials: true
    })

    return response.data
}