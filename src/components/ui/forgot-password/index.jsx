import { Button, Input } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ReusableModal } from "@modals";
import useForgotStore from "../../../store/forgot-password";
import { getDataFromCookie } from "@token-service";

export default function Index() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { getByCode, getByEmail, updatePassword } = useForgotStore();

  const handleEmailModalCancel = () => {
    setIsEmailModalOpen(false);
  };

  const handleCodeModalCancel = () => {
    setIsCodeModalOpen(false);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalOpen(false);
  };

  const openEmailModal = () => {
    setIsEmailModalOpen(true);
  };

  const handleForgot = async (values) => {
    try {
      const res = await getByEmail(values.email);
      if (res.status === 200) {
        setIsEmailModalOpen(false);
        setIsCodeModalOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async (values) => {
    try {
      const res = await getByCode(values.email, values.code);
      if (res.status === 200) {
        setIsCodeModalOpen(false);
        setIsUpdateModalOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePassword = async (values) => {
    try {
      const res = await updatePassword(values.password , getDataFromCookie("email"));
      if (res.status === 200) {
        setIsUpdateModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <span onClick={openEmailModal} className="cursor-pointer mt-3">
        Forgot password?
      </span>
      <ReusableModal
        title="Forgot password"
        isModalOpen={isEmailModalOpen}
        handleCancel={handleEmailModalCancel}
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email")
              .required("Please enter an email"),
          })}
          onSubmit={handleForgot}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center"
            >
              <Field
                as={Input}
                type="text"
                name="email"
                placeholder="Email"
                className="mt-4"
              />
              <ErrorMessage
                name="email"
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
      <ReusableModal
        title="Verify"
        isModalOpen={isCodeModalOpen}
        handleCancel={handleCodeModalCancel}
      >
        <Formik
          initialValues={{ code: "", email: getDataFromCookie("email") }}
          validationSchema={Yup.object({
            code: Yup.string().required("Please enter a code"),
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
      <ReusableModal
        title="Update Password"
        isModalOpen={isUpdateModalOpen}
        handleCancel={handleUpdateModalCancel}
      >
        <Formik
          initialValues={{ password: "" }}
          validationSchema={Yup.object({
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("Please enter a password"),
          })}
          onSubmit={handleUpdatePassword}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center"
            >
              <Field
                as={Input}
                type="password"
                name="password"
                placeholder="New Password"
                className="mt-4"
              />
              <ErrorMessage
                name="password"
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
    </>
  );
}
