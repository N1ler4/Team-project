import React from "react";
import { Form, Input, Button, Space, Divider, DatePicker } from "antd";
import { Formik, Field, FieldArray } from "formik";
import { getDataFromCookie } from "@token-service";
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
  main_redis_id:main_redis_id,
  meta: {
    lang: "en",
    template: template,
  },
  skills: [
    {
      keywords: [""],
      level: "",
      name: "",
    },
  ],
};


console.log(basic_redis_id)

const App = () => {
  const { FinalResume } = useCreateStore();
  const navigate = useNavigate()

  const onSubmit = async (values) => {

    try {
      const res = await FinalResume(values);
      if(res.status === 200){
        window.open(`${res.data}`, '_blank');
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
                    >
                      <Field
                        name={`certificates[${index}].title`}
                        as={Input}
                        placeholder="Title"
                        className="w-[250px]"
                      />
                      <Field
                        name={`certificates[${index}].issuer`}
                        as={Input}
                        placeholder="Issuer"
                        className="w-[250px]"
                      />
                      <Field
                        name={`certificates[${index}].date`}
                        className="w-[250px]"
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            placeholder="Select Date"
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
                        className="px-5"
                      />
                      <Field
                        name={`certificates[${index}].url`}
                        as={Input}
                        placeholder="URL"
                        className="w-[250px]"
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
                    >
                      <Field
                        name={`languages[${index}].language`}
                        as={Input}
                        placeholder="Language"
                      />
                      <Field
                        name={`languages[${index}].fluency`}
                        as={Input}
                        placeholder="Fluency"
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
