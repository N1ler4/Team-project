import React from "react";
import { Form, Input, Button, Space, Divider, DatePicker } from "antd";
import { Formik, Field, FieldArray } from "formik";
import { getDataFromCookie, deleteDataFromCookie } from "@token-service";
import useCreateStore from "../../store/create";
import { Header } from "@ui";
import { useNavigate } from "react-router-dom";

const basic_redis_id = getDataFromCookie("basic-id");
const main_redis_id = getDataFromCookie("main-id");
const template = getDataFromCookie("type");

const initialValues = {
  basic_redis_id: basic_redis_id,
  certificates: [
    {
      date: null,
      issuer: "",
      score: "",
      title: "",
      url: "",
    },
  ],
  interests: [
    {
      keywords: [""],
      name: "",
    },
  ],
  languages: [
    {
      fluency: "",
      language: "",
    },
  ],
  main_redis_id: main_redis_id,
  meta: {
    lang: "en",
    template: "",
  },
  skills: [
    {
      keywords: [""],
      level: "",
      name: "",
    },
  ],
};

const App = () => {
  const { FinalResume } = useCreateStore();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    values.meta.template = template;

    try {
      const res = await FinalResume(values);
      if (res.status === 200) {
        deleteDataFromCookie("basic-id");
        deleteDataFromCookie("main-id");
        deleteDataFromCookie("type");
        navigate("/");
        window.open(`${res.data}`, "_blank");
      }
      console.log(res);
      console.log(values);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, values, setFieldValue }) => (
        <Form layout="vertical" onFinish={handleSubmit}>
          <Header />
          <div className="container mx-auto px-10">
            {/* Certificates Section */}
            <FieldArray name="certificates">
              {({ push, remove }) => (
                <>
                  <Divider orientation="left">Certificates</Divider>
                  {values.certificates.map((_, index) => (
                    <Space
                      key={index}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                      className="flex-wrap"
                    >
                      <Field
                        name={`certificates[${index}].title`}
                        as={Input}
                        placeholder="Title"
                        className="w-[250px] h-[40px]"
                      />
                      <Field
                        name={`certificates[${index}].issuer`}
                        as={Input}
                        placeholder="Issuer"
                        className="w-[250px] h-[40px]"
                      />
                      <Field
                        name={`certificates[${index}].date`}
                        className="w-[250px] h-[40px]"
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            placeholder="Select Date"
                            className="h-[40px]"
                            onChange={(date) =>
                              setFieldValue(`certificates[${index}].date`, date)
                            }
                          />
                        )}
                      />
                      <Field
                        name={`certificates[${index}].score`}
                        as={Input}
                        placeholder="Score"
                        className="w-[250px] h-[40px]"
                      />
                      <Field
                        name={`certificates[${index}].url`}
                        as={Input}
                        placeholder="URL"
                        className="w-[250px] h-[40px]"
                      />
                      <Button
                        onClick={() => remove(index)}
                        type="primary"
                        style={{
                          backgroundColor: "#ff445c",
                          borderColor: "#ff445c",
                        }}
                        danger
                      >
                        Remove
                      </Button>
                    </Space>
                  ))}
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#ff445c",
                      borderColor: "#ff445c",
                    }}
                    onClick={() =>
                      push({
                        title: "",
                        issuer: "",
                        date: null,
                        score: "",
                        url: "",
                      })
                    }
                  >
                    Add Certificate
                  </Button>
                </>
              )}
            </FieldArray>

            {/* Languages Section */}
            <FieldArray name="languages">
              {({ push, remove }) => (
                <>
                  <Divider orientation="left">Languages</Divider>
                  {values.languages.map((_, index) => (
                    <Space
                      key={index}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                      className="flex-wrap"
                    >
                      <Field
                        name={`languages[${index}].language`}
                        as={Input}
                        placeholder="Language"
                        className="w-[250px] h-[40px]"
                      />
                      <Field
                        name={`languages[${index}].fluency`}
                        as={Input}
                        placeholder="Fluency"
                        className="w-[250px] h-[40px]"
                      />
                      <Button
                        onClick={() => remove(index)}
                        style={{
                          backgroundColor: "#ff445c",
                          borderColor: "#ff445c",
                        }}
                        type="primary"
                        danger
                      >
                        Remove
                      </Button>
                    </Space>
                  ))}
                  <Button
                    style={{
                      backgroundColor: "#ff445c",
                      borderColor: "#ff445c",
                    }}
                    type="primary"
                    onClick={() => push({ language: "", fluency: "" })}
                    className="mb-5 mt-3"
                  >
                    Add Language
                  </Button>
                </>
              )}
            </FieldArray>

            {/* Skills Section */}
            <FieldArray name="skills">
              {({ push, remove }) => (
                <>
                  <Divider orientation="left">Skills</Divider>
                  {values.skills.map((_, index) => (
                    <Space
                      key={index}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                      className="flex-wrap"
                    >
                      <Field
                        name={`skills[${index}].name`}
                        as={Input}
                        placeholder="Skill Name"
                        className="w-[250px] h-[40px]"
                      />
                      <Field
                        name={`skills[${index}].level`}
                        as={Input}
                        placeholder="Level"
                        className="w-[250px] h-[40px]"
                      />
                      <FieldArray name={`skills[${index}].keywords`}>
                        {({ push, remove }) => (
                          <div className="flex items-center">
                            {values.skills[index].keywords.map((_, kIndex) => (
                              <Space
                                key={kIndex}
                                style={{ display: "flex", marginBottom: 8 }}
                                align="baseline"
                              >
                                <Field
                                  name={`skills[${index}].keywords[${kIndex}]`}
                                  as={Input}
                                  placeholder="Keyword"
                                  className="w-[250px] h-[40px]"
                                />
                                <Button
                                  onClick={() => remove(kIndex)}
                                  type="primary"
                                  danger
                                  style={{
                                    backgroundColor: "#ff445c",
                                    borderColor: "#ff445c",
                                  }}
                                >
                                  Remove Keyword
                                </Button>
                              </Space>
                            ))}
                            <Button
                              type="primary"
                              className="mb-2 ml-2"
                              style={{
                                backgroundColor: "#ff445c",
                                borderColor: "#ff445c",
                              }}
                              onClick={() => push("")}
                            >
                              Add Keyword
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                      <Button
                        onClick={() => remove(index)}
                        type="primary"
                        style={{
                          backgroundColor: "#ff445c",
                          borderColor: "#ff445c",
                        }}
                        danger
                      >
                        Remove Skill
                      </Button>
                    </Space>
                  ))}
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#ff445c",
                      borderColor: "#ff445c",
                    }}
                    className="mb-5"
                    onClick={() =>
                      push({
                        name: "",
                        level: "",
                        keywords: [""],
                      })
                    }
                  >
                    Add Skill
                  </Button>
                </>
              )}
            </FieldArray>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#ff445c",
                  borderColor: "#ff445c",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default App;
