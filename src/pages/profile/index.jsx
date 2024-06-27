import React, { useEffect, useState } from "react";
import { Header } from "@ui";
import useUserStore from "../../store/profile";
import { getDataFromCookie, deleteDataFromCookie } from "@token-service";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button, message, Input, Modal } from "antd";
import { ReusableModal } from "@modals";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [user, setUser] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { getUser, uploadImg, updateUser, deleteUser } = useUserStore();

  const navigate = useNavigate();

  const handleUpdateModalCancel = () => {
    setIsUpdateModalOpen(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const getData = async () => {
    const res = await getUser(getDataFromCookie("id"));
    if (res && res.status === 200) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return false;
    }
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadImg(formData);
    if (res && res.status === 200) {
      message.success("Upload successful");
      getData(); // Refresh user data after upload
    } else {
      message.error("Upload failed");
    }
    return false;
  };

  const handleUpdate = async (values) => {
    try {
      const res = await updateUser(values);
      if (res.status === 200) {
        message.success("Update successful");
        setIsUpdateModalOpen(false);
        getData();
      }
    } catch (err) {
      message.error("Update failed");
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const id = getDataFromCookie("id");
      const res = await deleteUser(id);
      if (res.status === 200) {
        message.success("Delete successful");
        deleteDataFromCookie("id");
        deleteDataFromCookie("token");
        deleteDataFromCookie("refresh-token");
        navigate("/");
      }
    } catch (err) {
      message.error("Delete failed");
      console.error(err);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-wrap justify-center items-center w-[50%] h-[50vh] bg-white mt-[90px] rounded-2xl">
        <div className="w-[40%] h-full border-r-2 flex-wrap flex flex-col justify-center items-center">
          <div>
            {user.image ? (
              <img
                src={user.image}
                alt=""
                className="w-[120px] h-[120px] rounded-full"
              />
            ) : (
              <img
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAh1BMVEX///8kHiAAAAD8/PwjHyDy8vL39/cgGhzq6uojHB4hHyAhHR8lICLf398ZERTj4+POzs7U1NQIAACJiYmUlJRFQ0TIyMijo6MaGBmzs7O8vLyqqqoVCw9iYGFlZWUeFhl1dHQTERJ+fn5YWFg5NDZKSkopKSk+OzwxLS5STlBubG0OAAYsJihlQLVvAAAOpUlEQVR4nO1diXLiOrM2Le82XvGKwQibPe//fFeLyeQkECTZJPnr8s2pysypINxq9d5qa9oLL7zwwgsvvPDCCy+88MILL7zwwgsUCPEfpmHYdshg24Zh/vJjKQLZ8zivq0W6XXenXZbtTqvzNl1UdRSHxm8/nAzMMK+KbXcIgOLSNAFBc0nYP2fZKi2qKES//ZSPQB/Qzpfp+kCeuimdGYNO/tD/ONrgApBk53QZ/XEOGXW6zixIgtmHx/8E+v8dQpG1Oy/qvyhEiAl8vOj64BJ4uv6JEO8WUVbQWH23mA8L/C4BH0Eexay6fRm0N5nh32GS0wbWcVWZ/ID+GZjF8VKW7sendhyLisd/0QSW4/yHnrKEY/FHThs7YMYCoHVmPj9euutZQduW7j7bEF08nxMDQ8zNPKqpati7bRuUpTcbzqLn+0TrLYzrWf1lcuwCwPq31y3Gbr87F3l4+/fDerHa9X4QfPhMCVDYv0+KZlc9OD7ZYKKm/FnbNMduU8TXB6M/+YYj9meAERWb07FprvS4ugeHyv6N57+CHrD6zPQwP14BOKu0usORz5hXaefAP40RJOfa+D1NgLQ43SfOIPVOAwdhSvjn59X2AM1VIXiwT+OnPez3T4I0c3kadpaIfgNdEUlrJXLeTu/k6C10y19hDdLCjY+Hx/AxdJWau0XY00FwtUeNv7F/w4LmWVIOlt6CrDaQ6kMguz68q8MWZ/kP21DyZQs3oG6W77oewHKk1TOXAK47KAJ38cPUGOdBWjwPwwZN8O1nwLMrn88/6k/HHVxlFu8iZrxHUUM/He1wy46t70I3n+pJH391ng20eLhfTOZXmYv+6hXALp9q1Ueo+2SQ1nI16Zfmq8Ht1olGmXLhu0DVvmF20g/0VMZGPlyYeAWpF3BnNemrCZe+i6Js2NfNLn01uaAayyPmWg3vq+frtAJzreNDFj0jQoy4POo6dp/Om8pi8b3uw2nKI/YBYQY+zYD4gV8/1xmo9oPnAZsnOexIs9fgc1V5fKpOy3t+xhzYPs1bR5qxAW5v8OGJXnS8awYbnT41aje24DKldtnNn7Vn9hkGZzB9sr9hb7HF7c1zTjOi+8USYFb5bFooNaWnU8/vMp2H8QEILRuLahkPP0v2PyI8c3vTutUzzll04IqsWf2IFzjvGp0qtSabWgkQdW+vuMDgww95tPGxZNSQgGBa3hBiUnC5Uo4mXfkb5INKg8W06yItAiowvg/LaVf+5iu1BTBPoMRT6+cgGFTlD4a06MSNJz5O69akg8D0PxjQEmNgtTNv5rlQTLeDSJtThhOtDz+apENaTTO/vu7BdMYAaSuaidFdULFgiBacaalZYXPN4URczvKfvYfKtXwa/XWhJLvNMK6LdLPqutU5Leo4lN2MedbQM2HtJ/OfDcIYQkz7JhMtEarDfLF6A4Dk0vBa89tqUctFQWhpldQkBOupvJrlG/X6nGQrJf3zYu3DZcjy89RnewF/XUjJnb1hDqF1nCiIttfU8deDTIbV9qLDlw/lJA7f9ZLmtJAR57ovmRM1UWKw2lN76eJUYmvqLmicz6RwFjkYdxLn1dxeGFOPk+Se7A1bDROHT5QaY7vHN0nh9LjYlQju8gM7qhe5Q35vMSIxRPybrdivE1sdrqC819JAz5rnW81KXBFsMA1t2ikSAgZX9W0vKLfomiz6HjxRJbRi3LOtUTJyn5fiXG42ooeM0PK5Q+MWkoPYThNOnzENBYLxgQ1a0ryPZ5WiEhPvwL/XkfGfwwY70YeLWqYWYXRS0F4lOjP+gr8frkGALfykrUXl5sRc9uQ81kOLmfT5IKgY0Rbcm20/N3mzFZSCigmhFYw8Z2jBxR8EBaaC+yr5CxzRSA9R55kQX4xzAgye9gNBvWyXWJwWItOl0MFBGktx6vg0ztTM+U4LxTFk27bCAsNBA1cRRCz77MG4XErBtiR4EwlbSQz3jd2/CQ+LPR6yuD5bjvI2T/yUpWKLnLEcLcThE4y6uOVuTmOIMcD1aYQpZmTm+y9u8krRbRYoMGqMyZtGDhfru5IDGpLyZHy7EieEfbI6xP1W1dRCtN7CkD7dG9ct3Hqdi7IqUJh3b3T9nmTk87evuoa77Ar3cXQ93RUBVzUczXV5T5csZnLFbFlxfZtu3Mx3ZmMZ4Zbf0Z5Ws+c6NeGpcdntGEmd5E+MuEcdh3sPPRL+jeF6X0O6VZ+vOGKppQ2v5HGl8asPaXj7s50iVP/ZCZ5OTFrZeH7nTNHcFbId4i/O4WkObqPxWH4es0mZYgsMOCYWegP/HffkGMfH++M9XX4i2LfTEXWhfH6ugvgrq6Hkw5e3uyT1MyefXBH38U4ehbx6lG0G7tLtst1eEnT9qOfHISZMBFhWB0X3jKP3AbCK1bZ5KXXnxwLMKviFyMDN4wXHK8RV0HzDUdRvms6+ipkR59g7HajG8bNZYv/7uy1j3J+pk7Uij+fsaJ8ld8enZBd0SmvRt9yppB8nxgMd/h2V64wodtY3D6qvn6H3OP32kV2OVfDs0Bqx0SmDmu09EawKrKNTTbSZoMXbrcOMcs9PPqNdf4P/j5scD15uH9U+xw9FhyX2O0kgn30U14VFNZL5XS4UtTtqSo1nrTTZo9kbBLpv9O9X4Yr2blTqx/SUyewXkN25wUvUcpzS1vDL8vnwkaF+iS/k68Ics/soH8b+6RHmXj1R73RX4J2o/OdxRJsgJSHL5M9fqX2JwQYHecjlmZfK8WjehzG/Ws18HDNcAfRdF7HU5Lk8fklv9Gv59NRvOZ7ROcl1O57oe+LgzA4OnGv9HNOxMqn17DTslZ+oJxOLwv64RQucDBO/GHKfJ4e/A5+A1C2fANBYcD3AAAAAElFTkSuQmCC"
                }
                alt="Profile"
              />
            )}
          </div>{" "}
          <Upload beforeUpload={beforeUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </div>

        <div className="w-[60%] h-full py-5 px-5 flex flex-wrap flex-col justify-center items-center relative">
          <div>
            <Button
              type="primary"
              style={{ backgroundColor: "#F07448", borderColor: "#F07448" }}
              className="absolute bottom-2 right-2"
              onClick={() => setIsUpdateModalOpen(true)}
            >
              Edit
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              className="absolute bottom-2 right-[70px]"
              style={{ backgroundColor: "#F07448", borderColor: "#F07448" }}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>
          </div>
          <div className="flex w-full justify-between border-b-2 border-[#444] mb-5 flex-wrap">
            <p>Name : </p>
            <p>{user.full_name}</p>
          </div>
          <div className="flex w-full justify-between border-b-2 border-[#444] mb-5">
            <p> Phone Number : </p>
            <p>{user.phone_number}</p>
          </div>
          <div className="flex w-full justify-between border-b-2 border-[#444]">
            <p>Email : </p>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
      <ReusableModal
        title="Update Data"
        isModalOpen={isUpdateModalOpen}
        handleCancel={handleUpdateModalCancel}
      >
        <Formik
          initialValues={{ phone_number: "", full_name: "" }}
          validationSchema={Yup.object({
            full_name: Yup.string().required(
              "Please enter your name and surname"
            ),
            phone_number: Yup.string().required(
              "Please enter your phone number"
            ),
          })}
          onSubmit={handleUpdate}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center flex-wrap"
            >
              <Field
                as={Input}
                type="text"
                name="full_name"
                placeholder="Name and Surname"
                className="mt-4"
              />
              <ErrorMessage
                name="full_name"
                component="div"
                className="text-red-700"
              />
              <Field
                as={Input}
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                className="mt-4"
              />
              <ErrorMessage
                name="phone_number"
                component="div"
                className="text-red-700"
              />
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#F07448", borderColor: "#F07448" }}
                className="mt-4"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </ReusableModal>
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalOpen}
        onOk={handleConfirmDelete}
        onCancel={handleDeleteModalCancel}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ style: { backgroundColor: '#F07448', borderColor: '#F07448' } }}
        cancelButtonProps={{ style: { backgroundColor: '#F07448', borderColor: '#F07448' , color : 'white' } }}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  );
}
