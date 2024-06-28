import React from "react";
import { Form, Input, Button, DatePicker, message } from "antd";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import TextArea from "antd/es/input/TextArea";
import useCreateStore from "../../store/create";
import { useNavigate } from "react-router-dom";
import { getDataFromCookie } from "@token-service";
import { Header } from "@ui";
import moment from "moment";

const validationSchema = Yup.object().shape({
  education: Yup.array().of(
    Yup.object().shape({
      area: Yup.string().required("Required"),
      courses: Yup.array()
        .of(Yup.string().required("Required"))
        .required("Required"),
      institution: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      score: Yup.string().required("Required"),
      startDate: Yup.string().required("Required"),
      studyType: Yup.string().required("Required"),
    })
  ),
  projects: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      url: Yup.string().url("Invalid URL").required("Required"),
    })
  ),
  work: Yup.array().of(
    Yup.object().shape({
      company: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      position: Yup.string().required("Required"),
      startDate: Yup.string().required("Required"),
      summary: Yup.string().required("Required"),
    })
  ),
});

const basic_redis_id = getDataFromCookie("basic-id");
const main_redis_id = getDataFromCookie("main-id");

const ExtendedForm = () => {
  const { postToMain } = useCreateStore();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    values.basic_redis_id = basic_redis_id;
    values.main_redis_id = main_redis_id;
    console.log(values);
    try {
      const res = await postToMain(values);
      console.log(res);
      if (res.status === 200) {
        console.log(res);
        console.log(res.data.basic_redis_id)
        if (res.data.main_redis_id === "" || res.data.basic_redis_id === "") {
          message.error("Error! Please Submit after 1 min");
          postToMain(values);
        } else {
          navigate("/generate");
        }
      } else {
        console.error("Submission failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-[34px] text-center mt-[50px] mb-10">
        Please enter your extended data
      </h1>
      <div className="container mx-auto px-10 w-full">
        <Formik
          initialValues={{
            basic_redis_id: "",
            main_redis_id: "",
            education: [
              {
                area: "",
                courses: [""],
                endDate: "",
                institution: "",
                location: "",
                score: "",
                startDate: "",
                studyType: "",
              },
            ],
            projects: [
              {
                description: "",
                name: "",
                url: "",
              },
            ],
            work: [
              {
                company: "",
                contract_type: "",
                endDate: "",
                location: "",
                position: "",
                skills: [""],
                startDate: "",
                summary: "",
              },
            ],
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
              <h2 className="text-[24px] mb-5">Education</h2>
              <div className="border-white border-2 p-5">
                {" "}
                <FieldArray name="education">
                  {({ remove, push }) => (
                    <div>
                      {values.education.map((edu, index) => (
                        <div key={index} className="mb-5">
                          <div className="flex justify-between items-center flex-wrap ">
                            <Form.Item
                              label="Area"
                              validateStatus={
                                touched.education?.[index]?.area &&
                                errors.education?.[index]?.area
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.education?.[index]?.area &&
                                errors.education?.[index]?.area
                                  ? errors.education?.[index]?.area
                                  : null
                              }
                            >
                              <Input
                                name={`education[${index}].area`}
                                value={edu.area}
                                onChange={handleChange}
                                className="w-[330px] h-[40px]"
                              />
                            </Form.Item>
                            <Form.Item
                              label="Institution"
                              validateStatus={
                                touched.education?.[index]?.institution &&
                                errors.education?.[index]?.institution
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.education?.[index]?.institution &&
                                errors.education?.[index]?.institution
                                  ? errors.education?.[index]?.institution
                                  : null
                              }
                            >
                              <Input
                                name={`education[${index}].institution`}
                                value={edu.institution}
                                onChange={handleChange}
                                className="w-[330px] h-[40px]"
                              />
                            </Form.Item>
                            <Form.Item
                              label="Study Type"
                              validateStatus={
                                touched.education?.[index]?.studyType &&
                                errors.education?.[index]?.studyType
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.education?.[index]?.studyType &&
                                errors.education?.[index]?.studyType
                                  ? errors.education?.[index]?.studyType
                                  : null
                              }
                            >
                              <Input
                                name={`education[${index}].studyType`}
                                value={edu.studyType}
                                onChange={handleChange}
                                className="w-[330px] h-[40px]"
                              />
                            </Form.Item>
                          </div>
                          <Form.Item
                            label="Location"
                            validateStatus={
                              touched.education?.[index]?.location &&
                              errors.education?.[index]?.location
                                ? "error"
                                : ""
                            }
                            help={
                              touched.education?.[index]?.location &&
                              errors.education?.[index]?.location
                                ? errors.education?.[index]?.location
                                : null
                            }
                          >
                            <Input
                              name={`education[${index}].location`}
                              value={edu.location}
                              onChange={handleChange}
                              className="w-full h-[40px]"
                            />
                          </Form.Item>

                          <div className="flex gap-5">
                            <Form.Item
                              label="Score"
                              validateStatus={
                                touched.education?.[index]?.score &&
                                errors.education?.[index]?.score
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.education?.[index]?.score &&
                                errors.education?.[index]?.score
                                  ? errors.education?.[index]?.score
                                  : null
                              }
                            >
                              <Input
                                name={`education[${index}].score`}
                                value={edu.score}
                                onChange={handleChange}
                                className="w-full"
                              />
                            </Form.Item>
                            <Form.Item
                              label="Start Date"
                              validateStatus={
                                touched.education?.[index]?.startDate &&
                                errors.education?.[index]?.startDate
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.education?.[index]?.startDate &&
                                errors.education?.[index]?.startDate
                                  ? errors.education?.[index]?.startDate
                                  : null
                              }
                            >
                              <DatePicker
                                name={`education[${index}].startDate`}
                                value={
                                  edu.startDate
                                    ? moment(edu.startDate, "YYYY-MM-DD")
                                    : null
                                }
                                onChange={(date, dateString) =>
                                  setFieldValue(
                                    `education[${index}].startDate`,
                                    dateString
                                  )
                                }
                                className="w-full"
                              />
                            </Form.Item>
                            <Form.Item
                              label="End Date"
                              validateStatus={
                                touched.education?.[index]?.endDate &&
                                errors.education?.[index]?.endDate
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.education?.[index]?.endDate &&
                                errors.education?.[index]?.endDate
                                  ? errors.education?.[index]?.endDate
                                  : null
                              }
                            >
                              <DatePicker
                                name={`education[${index}].endDate`}
                                value={
                                  edu.endDate
                                    ? moment(edu.endDate, "YYYY-MM-DD")
                                    : null
                                }
                                onChange={(date, dateString) =>
                                  setFieldValue(
                                    `education[${index}].endDate`,
                                    dateString
                                  )
                                }
                                className="w-full"
                              />
                            </Form.Item>
                          </div>
                          <FieldArray name={`education[${index}].courses`}>
                            {({ remove: removeCourse, push: pushCourse }) => (
                              <div className="flex gap-3 flex-wrap">
                                {edu.courses.map((course, cIndex) => (
                                  <div key={cIndex} className="mb-3">
                                    <Form.Item
                                      label={`Course ${cIndex + 1}`}
                                      validateStatus={
                                        touched.education?.[index]?.courses?.[
                                          cIndex
                                        ] &&
                                        errors.education?.[index]?.courses?.[
                                          cIndex
                                        ]
                                          ? "error"
                                          : ""
                                      }
                                      help={
                                        touched.education?.[index]?.courses?.[
                                          cIndex
                                        ] &&
                                        errors.education?.[index]?.courses?.[
                                          cIndex
                                        ]
                                          ? errors.education?.[index]
                                              ?.courses?.[cIndex]
                                          : null
                                      }
                                    >
                                      <Input
                                        name={`education[${index}].courses[${cIndex}]`}
                                        value={course}
                                        onChange={handleChange}
                                        className="w-full"
                                      />
                                    </Form.Item>
                                    <Button
                                      style={{
                                        backgroundColor: "#ff445c",
                                        borderColor: "#ff445c",
                                      }}
                                      type="primary"
                                      onClick={() => removeCourse(cIndex)}
                                    >
                                      Remove Course
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  style={{
                                    backgroundColor: "#ff445c",
                                    borderColor: "#ff445c",
                                  }}
                                  type="primary"
                                  onClick={() => pushCourse("")}
                                  className="mt-[30px] mb-5"
                                >
                                  Add Course
                                </Button>
                              </div>
                            )}
                          </FieldArray>

                          <Button
                            style={{
                              backgroundColor: "#ff445c",
                              borderColor: "#ff445c",
                            }}
                            type="primary"
                            onClick={() => remove(index)}
                          >
                            Remove Education
                          </Button>
                        </div>
                      ))}
                      <Button
                        style={{
                          backgroundColor: "#ff445c",
                          borderColor: "#ff445c",
                        }}
                        type="primary"
                        onClick={() =>
                          push({
                            area: "",
                            courses: [""],
                            endDate: "",
                            institution: "",
                            location: "",
                            score: "",
                            startDate: "",
                            studyType: "",
                          })
                        }
                      >
                        Add Education
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <h2 className="text-[24px] mt-5 mb-5">Projects</h2>
              <div className="border-white border-2 p-5">
                <FieldArray name="projects">
                  {({ remove, push }) => (
                    <div>
                      {values.projects.map((project, index) => (
                        <div key={index} className="mb-5">
                          <div className="flex justify-between flex-wrap">
                            <Form.Item
                              label="Name"
                              validateStatus={
                                touched.projects?.[index]?.name &&
                                errors.projects?.[index]?.name
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.projects?.[index]?.name &&
                                errors.projects?.[index]?.name
                                  ? errors.projects?.[index]?.name
                                  : null
                              }
                            >
                              <Input
                                name={`projects[${index}].name`}
                                value={project.name}
                                onChange={handleChange}
                                className="w-[550px] h-[40px]"
                              />
                            </Form.Item>
                            <Form.Item
                              label="URL"
                              validateStatus={
                                touched.projects?.[index]?.url &&
                                errors.projects?.[index]?.url
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.projects?.[index]?.url &&
                                errors.projects?.[index]?.url
                                  ? errors.projects?.[index]?.url
                                  : null
                              }
                            >
                              <Input
                                name={`projects[${index}].url`}
                                value={project.url}
                                onChange={handleChange}
                                className="w-[550px] h-[40px]"
                              />
                            </Form.Item>
                          </div>
                          <Form.Item
                            label="Description"
                            validateStatus={
                              touched.projects?.[index]?.description &&
                              errors.projects?.[index]?.description
                                ? "error"
                                : ""
                            }
                            help={
                              touched.projects?.[index]?.description &&
                              errors.projects?.[index]?.description
                                ? errors.projects?.[index]?.description
                                : null
                            }
                          >
                            <TextArea
                              name={`projects[${index}].description`}
                              value={project.description}
                              onChange={handleChange}
                              className="w-full"
                            />
                          </Form.Item>

                          <Button
                            style={{
                              backgroundColor: "#ff445c",
                              borderColor: "#ff445c",
                            }}
                            type="primary"
                            onClick={() => remove(index)}
                          >
                            Remove Project
                          </Button>
                        </div>
                      ))}
                      <Button
                        style={{
                          backgroundColor: "#ff445c",
                          borderColor: "#ff445c",
                        }}
                        type="primary"
                        onClick={() =>
                          push({
                            description: "",
                            name: "",
                            url: "",
                          })
                        }
                      >
                        Add Project
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <h2 className="text-[24px] mt-5 mb-5">Work Experience</h2>
              <div className="border-white border-2 p-5">
                <FieldArray name="work">
                  {({ remove, push }) => (
                    <div>
                      {values.work.map((work, index) => (
                        <div key={index} className="mb-5">
                          <div className="flex justify-between flex-wrap">
                            <Form.Item
                              label="Company"
                              validateStatus={
                                touched.work?.[index]?.company &&
                                errors.work?.[index]?.company
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.work?.[index]?.company &&
                                errors.work?.[index]?.company
                                  ? errors.work?.[index]?.company
                                  : null
                              }
                            >
                              <Input
                                name={`work[${index}].company`}
                                value={work.company}
                                onChange={handleChange}
                                className="w-[350px] h-[40px]"
                              />
                            </Form.Item>
                            <Form.Item
                              label="Location"
                              validateStatus={
                                touched.work?.[index]?.location &&
                                errors.work?.[index]?.location
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.work?.[index]?.location &&
                                errors.work?.[index]?.location
                                  ? errors.work?.[index]?.location
                                  : null
                              }
                            >
                              <Input
                                name={`work[${index}].location`}
                                value={work.location}
                                onChange={handleChange}
                                className="w-[350px] h-[40px]"
                              />
                            </Form.Item>
                            <Form.Item
                              label="Position Example: Backend Developer"
                              validateStatus={
                                touched.work?.[index]?.position &&
                                errors.work?.[index]?.position
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.work?.[index]?.position &&
                                errors.work?.[index]?.position
                                  ? errors.work?.[index]?.position
                                  : null
                              }
                            >
                              <Input
                                name={`work[${index}].position`}
                                value={work.position}
                                onChange={handleChange}
                                className="w-[350px] h-[40px]"
                              />
                            </Form.Item>
                          </div>
                          <div className="flex gap-5 flex-wrap">
                            <Form.Item
                              label="Start Date"
                              validateStatus={
                                touched.work?.[index]?.startDate &&
                                errors.work?.[index]?.startDate
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.work?.[index]?.startDate &&
                                errors.work?.[index]?.startDate
                                  ? errors.work?.[index]?.startDate
                                  : null
                              }
                            >
                              <DatePicker
                                name={`work[${index}].startDate`}
                                value={
                                  work.startDate
                                    ? moment(work.startDate, "YYYY-MM-DD")
                                    : null
                                }
                                onChange={(date, dateString) =>
                                  setFieldValue(
                                    `work[${index}].startDate`,
                                    dateString
                                  )
                                }
                                className="w-full"
                              />
                            </Form.Item>
                            <Form.Item
                              label="End Date"
                              validateStatus={
                                touched.work?.[index]?.endDate &&
                                errors.work?.[index]?.endDate
                                  ? "error"
                                  : ""
                              }
                              help={
                                touched.work?.[index]?.endDate &&
                                errors.work?.[index]?.endDate
                                  ? errors.work?.[index]?.endDate
                                  : null
                              }
                            >
                              <DatePicker
                                name={`work[${index}].endDate`}
                                value={
                                  work.endDate
                                    ? moment(work.endDate, "YYYY-MM-DD")
                                    : null
                                }
                                onChange={(date, dateString) =>
                                  setFieldValue(
                                    `work[${index}].endDate`,
                                    dateString
                                  )
                                }
                                className="w-full"
                              />
                            </Form.Item>
                          </div>

                          <Form.Item
                            label="Summary"
                            validateStatus={
                              touched.work?.[index]?.summary &&
                              errors.work?.[index]?.summary
                                ? "error"
                                : ""
                            }
                            help={
                              touched.work?.[index]?.summary &&
                              errors.work?.[index]?.summary
                                ? errors.work?.[index]?.summary
                                : null
                            }
                          >
                            <TextArea
                              name={`work[${index}].summary`}
                              value={work.summary}
                              onChange={handleChange}
                              className="w-full"
                            />
                          </Form.Item>
                          <Button
                            style={{
                              backgroundColor: "#ff445c",
                              borderColor: "#ff445c",
                            }}
                            type="primary"
                            onClick={() => remove(index)}
                          >
                            Remove Work Experience
                          </Button>
                        </div>
                      ))}
                      <Button
                        style={{
                          backgroundColor: "#ff445c",
                          borderColor: "#ff445c",
                        }}
                        type="primary"
                        onClick={() =>
                          push({
                            company: "",
                            contract_type: "",
                            endDate: "",
                            location: "",
                            position: "",
                            skills: [""],
                            startDate: "",
                            summary: "",
                          })
                        }
                      >
                        Add Work Experience
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <Button
                style={{
                  backgroundColor: "#ff445c",
                  borderColor: "#ff445c",
                }}
                type="primary"
                htmlType="submit"
                className="w-full mt-5"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ExtendedForm;
