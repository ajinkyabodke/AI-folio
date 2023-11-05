// @ts-check
import React, { useState } from "react";
import Button from "../components/Button";
import { ColorPicker } from "../components/ColorPicker";

import Input from "../components/Input";
import { useData } from "../contexts/appContext";
import { API } from "../../constants";
import Loader from "./Loader";
import TemplateSelector from "./TemplateSelector";
import HeaderSelectors from "./HeaderSelector";

const Main = () => {
  const radioOptions = ["professional", "creative", "academic"];
  const colorOptions = ["Primary", "Secondary", "Background"];

  const {
    formData,
    personalData,
    setPersonalData,
    template,
    headerStyle,
    professionalSummary,
    contactlinks,
    setContactLinks,
    jobSummary,
    setJobSummary,
    handleExperienceChange,
    handleRemoveExperience,
    handleAddExperience,
    handleAddEducation,
    handleRemoveEducation,
    handleEducationChange,
    education,
    setEducation,
    handleAddSkill,
    handleRemoveSkill,
    handleSkillChange,
  } = useData();
  const [portfolioHTML, setportfolioHTML] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);

  function generateGPTPrompt() {
    console.log("gpt:", formData);
    // Create a GPT prompt using the updated user input
    const promptTemplate = `Give me markup for portfolio in the form of website, with the following details:
    Template: ${template}
    Name: ${personalData.name}
    Header Position: ${headerStyle}
    Image URL : ${personalData.imageUrl}
    Professional Summary: ${personalData.professionalSummary}
     Experience: ${formData.experience.map(
       (entry) => `\n- ${entry.jobTitle} at ${entry.companyName}`
     )}
    education: ${education.map(
      (entry) =>
        `\n- ${entry.graduationYear} at ${entry.institutionName} and courses taken ${entry.relevantCourses}`
    )}
    Skills: ${formData.skills.join(", ")}
    Contact: GitHub - ${contactlinks.github}, LinkedIn - ${
      contactlinks.linkedin
    }, Twitter - ${contactlinks.twitter}
    Colors: Primary - ${formData.colors.primary}, Secondary - ${
      formData.colors.secondary
    }, Background - ${formData.colors.background}
    Font: ${formData.font}
    Font Size: ${formData.fontSize}
    ...`;
    return promptTemplate;
  }

  const submitRequest = async (formData) => {
    try {
      console.log("🎉Values submitted");
      setisLoading(true);
      setisSuccess(false);
      console.log(generateGPTPrompt());

      const response = await fetch(`${API}/complete-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ prompt: generateGPTPrompt() }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong on server side");
      }
      const jsonResponse = await response.json();
      const HTML = jsonResponse.output;
      setportfolioHTML(HTML);
      setisSuccess(true);
      console.log(HTML);
      return "jsonResponse";
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5 ">
      {isLoading ? (
        <div className="w-full ml-60 h-screen ">
          <Loader />
        </div>
      ) : isSuccess ? (
        <>
          <div className="w-full h-[400px] mx-auto bg-white p-4 shadow-md rounded-md">
            <h1 className="text-xl font-semibold mb-4">Preview</h1>

            <iframe className="w-full  h-[400px]" srcDoc={portfolioHTML} />
          </div>
          <div className="max-w-xl mx-auto bg-white p-4 shadow-md rounded-md">
            <h1 className="text-xl font-semibold mb-4">Code</h1>
            <pre className="bg-gray-200 p-4 rounded-md">
              <code className="text-sm font-mono">{portfolioHTML}</code>
            </pre>
          </div>
        </>
      ) : (
        <div className="">
          <div className="px-4">
            <TemplateSelector />
          </div>

          <div className="px-4">
            <HeaderSelectors />
          </div>

          <div className="px-2">
            <label className="block px-2 text-xl font-medium text-gray-300">
              Personal Details
            </label>

            <Input
              value={personalData.name}
              onValueChange={(name) => {
                setPersonalData({ ...personalData, name });
              }}
              placeholder="Enter your Name"
              icon="job"
            />

            <Input
              value={personalData.imageUrl}
              onValueChange={(imageUrl) => {
                setPersonalData({ ...personalData, imageUrl });
              }}
              placeholder="Enter your Image URL"
              icon="link"
            />

            <Input
              value={personalData.professionalSummary}
              onValueChange={(professionalSummary) => {
                setPersonalData({ ...personalData, professionalSummary });
              }}
              placeholder="Add Profile Summary"
            />
          </div>

          <div className="py-2">
            <label className="block px-4 text-xl font-medium text-gray-300">
              Experience
            </label>
            <div className="px-4 ">
              {formData.experience.map((exp, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="form-input w-1/3 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={exp.companyName}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="form-input w-1/3 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="text-red-600  hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddExperience}
                className="mt-2 bg-gray-400 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Experience
              </button>
            </div>
          </div>

          <div className="py-2">
            <label className="block px-4 text-xl font-medium text-gray-300">
              Education
            </label>
            <div className="px-4">
              {education.map((edu, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    name="graduationYear"
                    placeholder="Graduation Year"
                    value={edu.graduationYear}
                    onChange={(e) => handleEducationChange(e, index)}
                    className="form-input w-1/3 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="institutionName"
                    placeholder="Institution Name"
                    value={edu.institutionName}
                    onChange={(e) => handleEducationChange(e, index)}
                    className="form-input w-1/3 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="relevantCourses"
                    placeholder="Relevant Courses"
                    value={edu.relevantCourses}
                    onChange={(e) => handleEducationChange(e, index)}
                    className="form-input w-1/3 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEducation}
                className="mt-2 bg-gray-400 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Education
              </button>
            </div>
          </div>

          <div className="py-2">
            <label className="block px-4 text-xl font-medium text-gray-300">
              Skills
            </label>
            <div className="px-4">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    name="skill"
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) => handleSkillChange(e, index)}
                    className="form-input w-2/3 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSkill}
                className="mt-2 bg-gray-400 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Skill
              </button>
            </div>
          </div>

          <div>
            <label className="block px-4 py-2 text-xl font-medium text-gray-300">
              Socials
            </label>
            <Input
              value={contactlinks.github}
              onValueChange={(github) => {
                setContactLinks({ ...contactlinks, github });
              }}
              placeholder="Enter your Github URL"
              icon="github"
            />
            <Input
              value={contactlinks.linkedin}
              onValueChange={(linkedin) => {
                setContactLinks({ ...contactlinks, linkedin });
              }}
              placeholder="Enter your LinkedIn URL"
              icon="linkedin"
            />
            <Input
              value={contactlinks.twitter}
              onValueChange={(twitter) => {
                setContactLinks({ ...contactlinks, twitter });
              }}
              placeholder="Enter your Twitter URL"
              icon="twitter"
            />
          </div>

          <div className="flex justify-center py-4">
            <Button onClick={() => submitRequest(formData)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
