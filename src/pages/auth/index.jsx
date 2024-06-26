import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../store/auth";
import { ReusableModal } from "@modals";
import "./style.css";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Forgot } from "@ui";

const Index = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const { signup, signin, verify } = useAuthStore();
  const containerRef = useRef(null);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSignUpClick = () => {
    containerRef.current.classList.add("right-panel-active");
  };

  const handleSignInClick = () => {
    containerRef.current.classList.remove("right-panel-active");
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter a valid email address"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleSignUp = async (values) => {
    try {
      const res = await signup(values);
      if (res.status === 200) {
        setEmailCode(values.email);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async (values) => {
    try {
      const res = await signin(values);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async (values) => {
    try {
      const res = await verify(values.code, emailCode);
      if (res.status === 201) {
        handleCancel();
        handleSignInClick();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const codeInitialValue = {
    code: "",
  };

  return (
    <div className="body">
      <div className="auth-container" id="container" ref={containerRef}>
        <div className="form-container sign-up-container">
          <Formik
            initialValues={{ full_name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {() => (
              <Form>
                <h1 className="mb-4 h1">Create Account</h1>

                <Field type="text" name="full_name" placeholder="Name" as={Input} size="small"/>
                <ErrorMessage
                  name="full_name"
                  component="div"
                  className="text-red-700"
                />
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-700"
                />
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-700"
                />
                <button type="submit" className="button">Sign Up</button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="form-container sign-in-container">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Please enter a valid email address"),
              password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Please enter a valid password"),
            })}
            onSubmit={handleSignIn}
          >
            {() => (
              <Form>
                <h1 className="h1">Sign in</h1>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="mt-4"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-700"
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="mt-4"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-700"
                />
                <button type="submit" className="button">Sign In</button>
                <Forgot/>
              </Form>
            )}
          </Formik>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Welcome Back!</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost button" id="signIn" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Friend!</h1>
              <p className="p">Enter your personal details and start journey with us</p>
              <button className="ghost button" id="signUp" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-center items-center">
        <ReusableModal
          title="Verify"
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleSubmit={handleVerify}
        >
          <Formik
            initialValues={codeInitialValue}
            validationSchema={Yup.object({
              code: Yup.string().required("Required"),
            })}
            onSubmit={handleVerify}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
              >
                <Field
                  as={Input}
                  type="text"
                  name="code"
                  placeholder="Code"
                  className="mt-4"
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-700"
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#ff445c", borderColor: "#ff445c" }}
                  className="mt-4"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </ReusableModal>
      </div>
    </div>
  );
};

export default Index;
