import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Input, Button, Row, Col } from "antd";

const { TextArea } = Input;

const initialValues = {
  basics: {
    email: "",
    image: "",
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
    summary: "",
    url: "",
  },
  certificates: [
    {
      date: "",
      issuer: "",
      score: "",
      title: "",
      url: "",
    },
  ],
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
  interests: [
    {
      keywords: [""],
      name: "",
    },
  ],
  labels: {
    education: "",
    experiences: "",
    interests: "",
    languages: "",
    profile: "",
    projects: "",
    since: "",
    skills: "",
    softSkills: "",
  },
  languages: [
    {
      fluency: "",
      language: "",
    },
  ],
  meta: {
    lang: "",
    template: "",
  },
  projects: [
    {
      description: "",
      highlights: [""],
      name: "",
      url: "",
    },
  ],
  skills: [
    {
      keywords: [""],
      level: "",
      name: "",
    },
  ],
  softSkills: [
    {
      keywords: [""],
      level: "",
      name: "",
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
};

const ResumeForm = () => {
  const handleSubmit = async (values) => {
    const response = await fetch("API_ENDPOINT_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form>
          {/* Basics Section */}
          <Row gutter={16}>
            <Col span={12}>
              <label>Email:</label>
              <Field as={Input} name="basics.email" />
            </Col>
            <Col span={12}>
              <label>Image URL:</label>
              <Field as={Input} name="basics.image" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <label>Label:</label>
              <Field as={Input} name="basics.label" />
            </Col>
            <Col span={12}>
              <label>City:</label>
              <Field as={Input} name="basics.location.city" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <label>Country Code:</label>
              <Field as={Input} name="basics.location.countryCode" />
            </Col>
            <Col span={12}>
              <label>Region:</label>
              <Field as={Input} name="basics.location.region" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <label>Name:</label>
              <Field as={Input} name="basics.name" />
            </Col>
            <Col span={12}>
              <label>Phone:</label>
              <Field as={Input} name="basics.phone" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <label>Profile Network:</label>
              <Field as={Input} name="basics.profiles[0].network" />
            </Col>
            <Col span={12}>
              <label>Profile URL:</label>
              <Field as={Input} name="basics.profiles[0].url" />
            </Col>
            <Col span={12}>
              <label>Profile Username:</label>
              <Field as={Input} name="basics.profiles[0].username" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <label>Summary:</label>
              <Field as={TextArea} name="basics.summary" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <label>URL:</label>
              <Field as={Input} name="basics.url" />
            </Col>
          </Row>

          {/* Certificates Section */}
          <FieldArray name="certificates">
            {({ push, remove }) => (
              <>
                {values.certificates.map((certificate, index) => (
                  <div key={index}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Date:</label>
                        <Field
                          as={Input}
                          name={`certificates[${index}].date`}
                        />
                      </Col>
                      <Col span={12}>
                        <label>Issuer:</label>
                        <Field
                          as={Input}
                          name={`certificates[${index}].issuer`}
                        />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Score:</label>
                        <Field
                          as={Input}
                          name={`certificates[${index}].score`}
                        />
                      </Col>
                      <Col span={12}>
                        <label>Title:</label>
                        <Field
                          as={Input}
                          name={`certificates[${index}].title`}
                        />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <label>URL:</label>
                        <Field as={Input} name={`certificates[${index}].url`} />
                      </Col>
                    </Row>
                    <Button type="danger" onClick={() => remove(index)}>
                      Remove Certificate
                    </Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={() =>
                    push({
                      date: "",
                      issuer: "",
                      score: "",
                      title: "",
                      url: "",
                    })
                  }
                >
                  Add Certificate
                </Button>
              </>
            )}
          </FieldArray>

          {/* Education Section */}
          <FieldArray name="education">
            {({ push, remove }) => (
              <>
                {values.education.map((education, index) => (
                  <div key={index}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Area:</label>
                        <Field as={Input} name={`education[${index}].area`} />
                      </Col>
                      <Col span={12}>
                        <label>Institution:</label>
                        <Field
                          as={Input}
                          name={`education[${index}].institution`}
                        />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Location:</label>
                        <Field
                          as={Input}
                          name={`education[${index}].location`}
                        />
                      </Col>
                      <Col span={12}>
                        <label>Score:</label>
                        <Field as={Input} name={`education[${index}].score`} />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Start Date:</label>
                        <Field
                          as={Input}
                          name={`education[${index}].startDate`}
                        />
                      </Col>
                      <Col span={12}>
                        <label>End Date:</label>
                        <Field
                          as={Input}
                          name={`education[${index}].endDate`}
                        />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Study Type:</label>
                        <Field
                          as={Input}
                          name={`education[${index}].studyType`}
                        />
                      </Col>
                    </Row>
                    <FieldArray name={`education[${index}].courses`}>
                      {({ push, remove }) => (
                        <>
                          {values.education[index].courses.map(
                            (course, courseIndex) => (
                              <Row gutter={16} key={courseIndex}>
                                <Col span={24}>
                                  <label>Course:</label>
                                  <Field
                                    as={Input}
                                    name={`education[${index}].courses[${courseIndex}]`}
                                  />
                                  <Button
                                    type="danger"
                                    onClick={() => remove(courseIndex)}
                                  >
                                    Remove Course
                                  </Button>
                                </Col>
                              </Row>
                            )
                          )}
                          <Button type="primary" onClick={() => push("")}>
                            Add Course
                          </Button>
                        </>
                      )}
                    </FieldArray>
                    <Button type="danger" onClick={() => remove(index)}>
                      Remove Education
                    </Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={() =>
                    push({
                      area: "",
                      institution: "",
                      location: "",
                      score: "",
                      startDate: "",
                      endDate: "",
                      studyType: "",
                      courses: [""],
                    })
                  }
                >
                  Add Education
                </Button>
              </>
            )}
          </FieldArray>

          {/* Interests Section */}
          <FieldArray name="interests">
            {({ push, remove }) => (
              <>
                {values.interests.map((interest, index) => (
                  <div key={index}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Interest Name:</label>
                        <Field as={Input} name={`interests[${index}].name`} />
                      </Col>
                    </Row>
                    <FieldArray name={`interests[${index}].keywords`}>
                      {({ push, remove }) => (
                        <>
                          {values.interests[index].keywords.map(
                            (keyword, keywordIndex) => (
                              <Row gutter={16} key={keywordIndex}>
                                <Col span={24}>
                                  <label>Keyword:</label>
                                  <Field
                                    as={Input}
                                    name={`interests[${index}].keywords[${keywordIndex}]`}
                                  />
                                  <Button
                                    type="danger"
                                    onClick={() => remove(keywordIndex)}
                                  >
                                    Remove Keyword
                                  </Button>
                                </Col>
                              </Row>
                            )
                          )}
                          <Button type="primary" onClick={() => push("")}>
                            Add Keyword
                          </Button>
                        </>
                      )}
                    </FieldArray>
                    <Button type="danger" onClick={() => remove(index)}>
                      Remove Interest
                    </Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={() => push({ name: "", keywords: [""] })}
                >
                  Add Interest
                </Button>
              </>
            )}
          </FieldArray>

          {/* Labels Section */}
          <Row gutter={16}>
            <Col span={12}>
              <label>Education Label:</label>
              <Field as={Input} name="labels.education" />
            </Col>
            <Col span={12}>
              <label>Experiences Label:</label>
              <Field as={Input} name="labels.experiences" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <label>Interests Label:</label>
              <Field as={Input} name="labels.interests" />
            </Col>
            <Col span={12}>
              <label>Languages Label:</label>
              <Field as={Input} name="labels.languages" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <label>Profile Label:</label>
              <Field as={Input} name="labels.profile" />
            </Col>
            <Col span={12}>
              <label>Projects Label:</label>
              <Field as={Input} name="labels.projects" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <label>Since Label:</label>
              <Field as={Input} name="labels.since" />
            </Col>
            <Col span={12}>
              <label>Skills Label:</label>
              <Field as={Input} name="labels.skills" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <label>Soft Skills Label:</label>
              <Field as={Input} name="labels.softSkills" />
            </Col>
          </Row>

          {/* Languages Section */}
          <FieldArray name="languages">
            {({ push, remove }) => (
              <>
                {values.languages.map((language, index) => (
                  <div key={index}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Language:</label>
                        <Field
                          as={Input}
                          name={`languages[${index}].language`}
                        />
                      </Col>
                      <Col span={12}>
                        <label>Fluency:</label>
                        <Field
                          as={Input}
                          name={`languages[${index}].fluency`}
                        />
                      </Col>
                    </Row>
                    <Button type="danger" onClick={() => remove(index)}>
                      Remove Language
                    </Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={() => push({ language: "", fluency: "" })}
                >
                  Add Language
                </Button>
              </>
            )}
          </FieldArray>

          {/* Meta Section */}
          <Row gutter={16}>
            <Col span={12}>
              <label>Language:</label>
              <Field as={Input} name="meta.lang" />
            </Col>
            <Col span={12}>
              <label>Template:</label>
              <Field as={Input} name="meta.template" />
            </Col>
          </Row>

          {/* Projects Section */}
          <FieldArray name="projects">
            {({ push, remove }) => (
              <>
                {values.projects.map((project, index) => (
                  <div key={index}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Project Name:</label>
                        <Field as={Input} name={`projects[${index}].name`} />
                      </Col>
                      <Col span={12}>
                        <label>Project URL:</label>
                        <Field as={Input} name={`projects[${index}].url`} />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <label>Description:</label>
                        <Field
                          as={TextArea}
                          name={`projects[${index}].description`}
                        />
                      </Col>
                    </Row>
                    <FieldArray name={`projects[${index}].highlights`}>
                      {({ push, remove }) => (
                        <>
                          {values.projects[index].highlights.map(
                            (highlight, highlightIndex) => (
                              <Row gutter={16} key={highlightIndex}>
                                <Col span={24}>
                                  <label>Highlight:</label>
                                  <Field
                                    as={Input}
                                    name={`projects[${index}].highlights[${highlightIndex}]`}
                                  />
                                  <Button
                                    type="danger"
                                    onClick={() => remove(highlightIndex)}
                                  >
                                    Remove Highlight
                                  </Button>
                                </Col>
                              </Row>
                            )
                          )}
                          <Button type="primary" onClick={() => push("")}>
                            Add Highlight
                          </Button>
                        </>
                      )}
                    </FieldArray>
                    <Button type="danger" onClick={() => remove(index)}>
                      Remove Project
                    </Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={() =>
                    push({
                      name: "",
                      url: "",
                      description: "",
                      highlights: [""],
                    })
                  }
                >
                  Add Project
                </Button>
              </>
            )}
          </FieldArray>

          {/* Skills Section */}
          <FieldArray name="skills">
            {({ push, remove }) => (
              <>
                {values.skills.map((skill, index) => (
                  <div key={index}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Skill Name:</label>
                        <Field as={Input} name={`skills[${index}].name`} />
                      </Col>
                      <Col span={12}>
                        <label>Level:</label>
                        <Field as={Input} name={`skills[${index}].level`} />
                      </Col>
                    </Row>
                    <FieldArray name={`skills[${index}].keywords`}>
                      {({ push, remove }) => (
                        <>
                          {values.skills[index].keywords.map(
                            (keyword, keywordIndex) => (
                              <Row gutter={16} key={keywordIndex}>
                                <Col span={24}>
                                  <label>Keyword:</label>
                                  <Field
                                    as={Input}
                                    name={`skills[${index}].keywords[${keywordIndex}]`}
                                  />
                                  <Button
                                    type="danger"
                                    onClick={() => remove(keywordIndex)}
                                  >
                                    Remove Keyword
                                  </Button>
                                </Col>
                              </Row>
                            )
                          )}
                          <Button type="primary" onClick={() => push("")}>
                            Add Keyword
                          </Button>
                        </>
                      )}
                    </FieldArray>
                    <Button type="danger" onClick={() => remove(index)}>
                      Remove Skill
                    </Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={() => push({ name: "", level: "", keywords: [""] })}
                >
                  Add Skill
                </Button>
              </>
            )}
          </FieldArray>

          {/* Soft Skills Section */}
          <FieldArray name="softSkills">
            {({ push, remove }) => (
              <>
                {values.softSkills.map((softSkill, index) => (
                  <div key={index}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Soft Skill Name:</label>
                        <Field as={Input} name={`softSkills[${index}].name`} />
                      </Col>
                      <Col span={12}>
                        <label>Level:</label>
                        <Field as={Input} name={`softSkills[${index}].level`} />
                      </Col>
                    </Row>
                    <FieldArray name={`softSkills[${index}].keywords`}>
                      {({ push, remove }) => (
                        <>
                          {values.softSkills[index].keywords.map(
                            (keyword, keywordIndex) => (
                              <Row gutter={16} key={keywordIndex}>
                                <Col span={24}>
                                  <label>Keyword:</label>
                                  <Field
                                    as={Input}
                                    name={`softSkills[${index}].keywords[${keywordIndex}]`}
                                  />
                                  <Button
                                    type="danger"
                                    onClick={() => remove(keywordIndex)}
                                  >
                                    Remove Keyword
                                  </Button>
                                </Col>
                              </Row>
                            )
                          )}
                          <Button type="primary" onClick={() => push("")}>
                            Add Keyword
                          </Button>
                        </>
                      )}
                    </FieldArray>
                    <Button type="danger" onClick={() => remove(index)}>
                      Remove Soft Skill
                    </Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={() => push({ name: "", level: "", keywords: [""] })}
                >
                  Add Soft Skill
                </Button>
              </>
            )}
          </FieldArray>

          {/* Work Section */}
          <FieldArray name="work">
            {({ push, remove }) => (
              <>
                {values.work.map((work, index) => (
                  <div key={index}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Company:</label>
                        <Field as={Input} name={`work[${index}].company`} />
                      </Col>
                      <Col span={12}>
                        <label>Contract Type:</label>
                        <Field
                          as={Input}
                          name={`work[${index}].contract_type`}
                        />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Start Date:</label>
                        <Field as={Input} name={`work[${index}].startDate`} />
                      </Col>
                      <Col span={12}>
                        <label>End Date:</label>
                        <Field as={Input} name={`work[${index}].endDate`} />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <label>Location:</label>
                        <Field as={Input} name={`work[${index}].location`} />
                      </Col>
                      <Col span={12}>
                        <label>Position:</label>
                        <Field as={Input} name={`work[${index}].position`} />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <label>Summary:</label>
                        <Field as={TextArea} name={`work[${index}].summary`} />
                      </Col>
                    </Row>
                    <FieldArray name={`work[${index}].skills`}>
                      {({ push, remove }) => (
                        <>
                          {values.work[index].skills.map(
                            (skill, skillIndex) => (
                              <Row gutter={16} key={skillIndex}>
                                <Col span={24}>
                                  <label>Skill:</label>
                                  <Field
                                    as={Input}
                                    name={`work[${index}].skills[${skillIndex}]`}
                                  />
                                  <Button
                                    type="danger"
                                    onClick={() => remove(skillIndex)}
                                  >
                                    Remove Skill
                                  </Button>
                                </Col>
                              </Row>
                            )
                          )}
                          <Button type="primary" onClick={() => push("")}>
                            Add Skill
                          </Button>
                        </>
                      )}
                    </FieldArray>
                    <Button type="danger" onClick={() => remove(index)}>
                      Remove Work
                    </Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={() =>
                    push({
                      company: "",
                      contract_type: "",
                      startDate: "",
                      endDate: "",
                      location: "",
                      position: "",
                      summary: "",
                      skills: [""],
                    })
                  }
                >
                  Add Work
                </Button>
              </>
            )}
          </FieldArray>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResumeForm;
