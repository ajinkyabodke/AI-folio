import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useData } from "../contexts/appContext";
import { API } from "../../constants";
import Loader from "./Loader";
import TemplateSelector from "./TemplateSelector";
import HeaderSelectors from "./HeaderSelector";
import ColorSelector from "./ColorSelector";
import FontSizeSelector from "./FontSizeSelector";
import FontSelector from "./FontSelector";

const Main = () => {
  const {
    formData,
    personalData,
    setPersonalData,
    template,
    headerStyle,
    professionalSummary,
    handleInputChange,
    contactlinks,
    setContactLinks,
    jobSummary,
    setJobSummary,
    fontSize,
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
    fontStyle,
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
    Font: ${fontStyle}
    Font Size: ${fontSize}
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
        <div className="w-full flex justify-center items-center h-screen ">
          <Loader />
        </div>
      ) : isSuccess ? (
        <>
          <div className="flex-col justify-center items-center h-min">
            <div className=" p-4">
              <h1 className="text-2xl font-bold mb-4">Code Preview</h1>
              <div
                className="border rounded p-4 bg-gray-100"
                dangerouslySetInnerHTML={{ __html: portfolioHTML }}
              ></div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-4">HTML Code</h1>
              <textarea
                className="border rounded p-4 w-full h-64 bg-gray-100"
                value={portfolioHTML}
                onChange={(e) => setHtmlCode(e.target.value)}
              ></textarea>
            </div>
          </div>
        </>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitRequest(formData);
          }}
        >
          <div className="px-4">
            <TemplateSelector />
          </div>

          <div className="px-4">
            <HeaderSelectors />
          </div>
          <div className="px-4 pb-2">
            <ColorSelector />
          </div>
          <div className="px-4 pb-2">
            <FontSelector />
          </div>
          <div className="px-4 pb-2">
            <FontSizeSelector />
          </div>

          <div className="px-2">
            <label className="block p-2 text-3xl font-medium text-gray-300">
              Personal Details
            </label>

            <Input
              value={personalData.name}
              onValueChange={(name) => {
                setPersonalData({ ...personalData, name });
              }}
              placeholder="Enter your Name"
              icon="job"
              required
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
              required
            />
          </div>

          <div className="py-2">
            <label className="block px-4 text-3xl font-medium text-gray-300">
              Experience
            </label>
            <div className="px-4 ">
              {formData.experience.map((exp, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    required
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="form-input w-1/3 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <input
                    required
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
            <label className="block px-4 text-3xl font-medium text-gray-300">
              Education
            </label>
            <div className="px-4">
              {education.map((edu, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    required
                    type="number"
                    name="graduationYear"
                    placeholder="Graduation Year"
                    value={edu.graduationYear}
                    onChange={(e) => handleEducationChange(e, index)}
                    className="form-input w-1/3 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <input
                    required
                    type="text"
                    name="institutionName"
                    placeholder="Institution Name"
                    value={edu.institutionName}
                    onChange={(e) => handleEducationChange(e, index)}
                    className="form-input w-1/3 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <input
                    required
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
            <label className="block px-4 text-3xl font-medium text-gray-300">
              Skills
            </label>
            <div className="px-4">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    required
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
            <label className="block px-4 py-2 text-3xl font-medium text-gray-300">
              Socials
            </label>
            <Input
              value={contactlinks.github}
              onValueChange={(github) => {
                setContactLinks({ ...contactlinks, github });
              }}
              placeholder="Enter your Github URL"
              icon="github"
              required
            />
            <Input
              value={contactlinks.linkedin}
              onValueChange={(linkedin) => {
                setContactLinks({ ...contactlinks, linkedin });
              }}
              placeholder="Enter your LinkedIn URL"
              icon="linkedin"
              required
            />
            <Input
              value={contactlinks.twitter}
              onValueChange={(twitter) => {
                setContactLinks({ ...contactlinks, twitter });
              }}
              placeholder="Enter your Twitter URL"
              icon="twitter"
              required
            />
          </div>

          <div className="flex justify-center py-4">
            <Button />
          </div>
        </form>
      )}
    </div>
  );
};

export default Main;
