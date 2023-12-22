import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../components/loader";
import { loginUser, getUser } from "../../services/auth_services";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [loader, setLoader] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setLoader(true);

    try {
      await loginUser(values);
      toast.success("Logged in successfully!");
      navigate("/notes")
      const res = await getUser();

        if(res.user) { 
        localStorage.setItem("user",JSON.stringify(res.user))
        }
    } catch (error) {
      toast.error( error.response.data.error);
    } finally {
      setLoader(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center w-full h-screen"> 
        <Loader />

        </div>
      ) : (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className=" flex justify-center bg-slate-200 items-center w-full h-screen flex-col">
            <div className="bg-white p-8 rounded-lg">
         

            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-[340px] bg-slate-100 border rounded-md  border-none outline-none border-gray-300 p-2 mb-4"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-4" />

            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-[340px] bg-slate-100 rounded-md border border-none outline-none border-gray-300 p-2 mb-4"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-4" />
            
        
<br />
          
           

              <div className="mt-4">
                <p className="text-gray-600">
                  {"Don't have an account ?" }{" "}
                  <Link to="/register" className="text-blue-500 hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
              
              <div className="mt-4">
                <Link to="/forgotPassword" className="text-blue-500 hover:underline">
                  Forgot Password ?
                </Link>
              </div>
              <br />
              <button
              type="submit"
              className="bg-blue-500 w-[340px] text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
              disabled={loader}
            >
              Login
            </button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default Login;
