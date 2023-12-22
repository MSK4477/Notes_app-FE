import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../components/loader";
import { registerUser } from "../../services/auth_services";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [loader, setLoader] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setLoader(true);

    try {
      await registerUser(values);
      toast.success("Registration successful!");
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
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-[340px] border bg-slate-100  border-none outline-none rounded-md border-gray-300 p-2 mb-4 "
              placeholder="Enter your name"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mb-4" />

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
<div>
  <p className="text-gray-500">Already Have an Account <Link className="text-blue-500" to={"/login"}>Login</Link></p>
</div>
<br />
            <button
              type="submit"
              className="bg-blue-500 w-[340px] text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
              disabled={loader}
            >
              Register
            </button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default Register;
