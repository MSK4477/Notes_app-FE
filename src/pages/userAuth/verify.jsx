import { useEffect, useState } from "react";
import { verifyUser } from "../../services/auth_services";
import { useSearchParams } from "react-router-dom";
import  {Link} from "react-router-dom"
import Loader from "../../components/loader";

const Verify = () => { 


const [params] = useSearchParams()

const token = params.get("token")

const [success, setSuccess]  = useState(false)
useEffect( () => { 

    const fetch = async () => {

   const verify =  await verifyUser(token)

   if(verify.code == 1) { 
    setSuccess(true)
   }
   console.log(verify)

    }
    fetch()
})

return ( 
    <>
     {success ?
    <div className="flex justify-center bg-slate-200  items-center w-full h-screen">

       
    <h3 className="text-3xl text-gray-600">User Verified Successfully Go To <Link className="text-blue-500" to={"/login"}>Login</Link> </h3> 

    
    </div> :
    <Loader/>  
     }
    </>
)

}

export default Verify
