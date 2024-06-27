import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { Header } from "@ui";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import TextArea from "antd/es/input/TextArea";
import useCreateStore from "../../store/create";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  job_location: Yup.string().required("Required"),
  label: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  salary: Yup.number().required("Required").positive("Must be positive"),
  summary: Yup.string().required("Required"),
  location: Yup.object().shape({
    city: Yup.string().required("Required"),
    countryCode: Yup.string().required("Required"),
    region: Yup.string().required("Required"),
  }),
  profiles: Yup.array().of(
    Yup.object().shape({
      network: Yup.string().required("Required"),
      url: Yup.string().url("Invalid URL").required("Required"),
      username: Yup.string().required("Required"),
    })
  ),
});

const MyForm = () => {
  const [img, setImg] = useState("");
  const { basic, postImg } = useCreateStore();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // Update the form values with the image URL
    values.image = img;
    const res = await basic(values);
    if (res.status === 200) {
      navigate("/main-create");
    }
  };

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
    const res = await postImg(formData);
    if (res && res.status === 200) {
      setImg(res.data);
      message.success("Upload successful");
    } else {
      message.error("Upload failed");
    }
    return false;
  };

  return (
    <>
      <Header />
      <h1 className="text-[34px] text-center mt-[50px] mb-10">
        Please enter data about you
      </h1>
      <div className="flex container mx-auto px-10 w-full  justify-start">
        <div className="w-[20%] flex flex-col items-center">
          {img ? (
            <img
              src={img}
              className="w-[160px] h-[160px] object-cover mb-5"
              alt=""
            />
          ) : (
            <div className="w-[120px] h-[160px] bg-white mb-5"></div>
          )}
          <Upload beforeUpload={beforeUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </div>
        <div className="w-[70%]">
          <Formik
            initialValues={{
              email: "",
              image: "",
              job_location: "",
              label: "",
              location: {
                city: "",
                countryCode: "",
                region: "",
              },
              name: "",
              phone: "",
              profiles: [
                {
                  network: "",
                  url: "",
                  username: "",
                },
              ],
              salary: 0,
              summary: "",
              url: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="Name"
                  validateStatus={touched.name && errors.name ? "error" : ""}
                  help={touched.name && errors.name ? errors.name : null}
                >
                  <Input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full h-[40px]"
                  />
                </Form.Item>
                <div className="flex justify-between mt-6 flex-wrap">
                  <Form.Item
                    label="Email"
                    validateStatus={
                      touched.email && errors.email ? "error" : ""
                    }
                    help={touched.email && errors.email ? errors.email : null}
                  >
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="w-[400px] h-[40px]"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    validateStatus={
                      touched.phone && errors.phone ? "error" : ""
                    }
                    help={touched.phone && errors.phone ? errors.phone : null}
                  >
                    <Input
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      className="w-[400px] h-[40px]"
                    />
                  </Form.Item>
                </div>
                <div className="flex justify-between">
                  <Form.Item
                    label="Job Type"
                    validateStatus={
                      touched.job_location && errors.job_location ? "error" : ""
                    }
                    help={
                      touched.job_location && errors.job_location
                        ? errors.job_location
                        : null
                    }
                  >
                    <Select
                      name="job_location"
                      defaultValue="Choose a type of work"
                      onChange={(value) => setFieldValue("job_location", value)}
                      className="w-[330px] h-[40px]"
                    >
                      <Select.Option value="offline">Offline</Select.Option>
                      <Select.Option value="online">Online</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Label Example:(Backend developer)"
                    validateStatus={
                      touched.label && errors.label ? "error" : ""
                    }
                    help={touched.label && errors.label ? errors.label : null}
                  >
                    <Input
                      name="label"
                      value={values.label}
                      onChange={handleChange}
                      className="w-[330px] h-[40px]"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Salary"
                    validateStatus={
                      touched.salary && errors.salary ? "error" : ""
                    }
                    help={
                      touched.salary && errors.salary ? errors.salary : null
                    }
                  >
                    <InputNumber
                      name="salary"
                      value={values.salary}
                      onChange={(value) =>
                        handleChange({ target: { name: "salary", value } })
                      }
                      className="h-[40px] py-1"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Summary"
                  validateStatus={
                    touched.summary && errors.summary ? "error" : ""
                  }
                  help={
                    touched.summary && errors.summary ? errors.summary : null
                  }
                >
                  <TextArea
                    rows={2}
                    name="summary"
                    value={values.summary}
                    onChange={handleChange}
                    className="w-full h-[80px]"
                  />
                </Form.Item>
                <div className="flex justify-between">
                  <Form.Item
                    label="Location - City"
                    validateStatus={
                      touched.location?.city && errors.location?.city
                        ? "error"
                        : ""
                    }
                    help={
                      touched.location?.city && errors.location?.city
                        ? errors.location?.city
                        : null
                    }
                  >
                    <Input
                      name="location.city"
                      value={values.location.city}
                      onChange={handleChange}
                      className="w-[250px] h-[40px]"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Location - Country Code"
                    validateStatus={
                      touched.location?.countryCode &&
                      errors.location?.countryCode
                        ? "error"
                        : ""
                    }
                    help={
                      touched.location?.countryCode &&
                      errors.location?.countryCode
                        ? errors.location?.countryCode
                        : null
                    }
                  >
                    <Input
                      name="location.countryCode"
                      value={values.location.countryCode}
                      onChange={handleChange}
                      className="w-[250px] h-[40px]"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Location - Region"
                    validateStatus={
                      touched.location?.region && errors.location?.region
                        ? "error"
                        : ""
                    }
                    help={
                      touched.location?.region && errors.location?.region
                        ? errors.location?.region
                        : null
                    }
                  >
                    <Input
                      name="location.region"
                      value={values.location.region}
                      onChange={handleChange}
                      className="w-[250px] h-[40px]"
                    />
                  </Form.Item>
                </div>
                <FieldArray
                  name="profiles"
                  render={(arrayHelpers) => (
                    <div>
                      {values.profiles.map((profile, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <Form.Item
                            label={`Profile ${index + 1} - Network`}
                            validateStatus={
                              touched.profiles?.[index]?.network &&
                              errors.profiles?.[index]?.network
                                ? "error"
                                : ""
                            }
                            help={
                              touched.profiles?.[index]?.network &&
                              errors.profiles?.[index]?.network
                                ? errors.profiles?.[index]?.network
                                : null
                            }
                          >
                            <Input
                              name={`profiles[${index}].network`}
                              value={profile.network}
                              onChange={handleChange}
                              className="w-[200px] h-[40px]"
                            />
                          </Form.Item>
                          <Form.Item
                            label={`Profile ${index + 1} - URL`}
                            validateStatus={
                              touched.profiles?.[index]?.url &&
                              errors.profiles?.[index]?.url
                                ? "error"
                                : ""
                            }
                            help={
                              touched.profiles?.[index]?.url &&
                              errors.profiles?.[index]?.url
                                ? errors.profiles?.[index]?.url
                                : null
                            }
                          >
                            <Input
                              name={`profiles[${index}].url`}
                              value={profile.url}
                              onChange={handleChange}
                              className="w-[200px] h-[40px]"
                            />
                          </Form.Item>
                          <Form.Item
                            label={`Profile ${index + 1} - Username`}
                            validateStatus={
                              touched.profiles?.[index]?.username &&
                              errors.profiles?.[index]?.username
                                ? "error"
                                : ""
                            }
                            help={
                              touched.profiles?.[index]?.username &&
                              errors.profiles?.[index]?.username
                                ? errors.profiles?.[index]?.username
                                : null
                            }
                          >
                            <Input
                              name={`profiles[${index}].username`}
                              value={profile.username}
                              onChange={handleChange}
                              className="w-[200px] h-[40px]"
                            />
                          </Form.Item>
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: "#ff445c",
                              borderColor: "#ff445c",
                            }}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#ff445c",
                          borderColor: "#ff445c",
                        }}
                        onClick={() =>
                          arrayHelpers.push({
                            network: "",
                            url: "",
                            username: "",
                          })
                        }
                      >
                        Add Profile
                      </Button>
                    </div>
                  )}
                />
                <Form.Item>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#ff445c",
                      borderColor: "#ff445c",
                    }}
                    htmlType="submit"
                    className="mt-5"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default MyForm;
