import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../components/loader";
import { resetPassword } from "../../services/auth_services";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [loader, setLoader] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const [params] = useSearchParams()

  const [resetted, setResetted] = useState(false)
  const token = params.get("token")

  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setLoader(true);

    try {
   
      await resetPassword(values, token);
      setResetted(true)
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reset password. Please try again.");
    } finally {
      setLoader(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center flex-col w-full h-screen">
          <Loader />
        </div>
      ) : resetted ?
      (
        <div className="flex justify-center bg-slate-200  items-center w-full h-screen">

       
        <h3 className="text-3xl text-gray-600">Password Reset Succesfully Go To <Link to={"/login"} className="text-blue-500">Login</Link> Page</h3> 
    
        
        </div>      ) :
      
      (
        
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="flex justify-center bg-slate-200 items-center w-full h-screen flex-col">
            <div className="bg-white p-8 rounded-lg">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-[340px] bg-slate-100 border rounded-md border-none outline-none border-gray-300 p-2 mb-4"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-4" />

              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password:
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-[340px] bg-slate-100 border rounded-md border-none outline-none border-gray-300 p-2 mb-4"
                placeholder="Confirm your password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mb-4" />

              <br />
              <button
                type="submit"
                className="bg-blue-500 w-[340px] text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
                disabled={loader}
              >
                Reset Password
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default ResetPassword;
