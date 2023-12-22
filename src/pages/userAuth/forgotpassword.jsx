import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../components/loader";
import { forgotpassword } from "../../services/auth_services";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setLoader(true);

    try {
      await forgotpassword(values);
      toast.success("Password reset email sent successfully!");
      setMailSent(true);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send password reset email. Please try again.");
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
      ) : mailSent ? (
        <div className="flex justify-center bg-slate-200  items-center w-full h-screen">

       
        <h3 className="text-3xl text-gray-600">Mail Sent Succesfully</h3> 
    
        
        </div>      ) : (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="flex justify-center bg-slate-200 items-center w-full h-screen flex-col">
            <div className="bg-white p-8 rounded-lg">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-[340px] bg-slate-100 border rounded-md border-none outline-none border-gray-300 p-2 mb-4"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-4" />
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

export default ForgotPassword;
