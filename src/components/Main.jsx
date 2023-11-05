// @ts-check
import React, { useState } from "react";
import Button from "../components/Button";
import { ColorPicker } from "../components/ColorPicker";
import { RadioInput } from "../components/Radio";
import RemoveButton from "../components/RemoveButton";
import TextBox from "../components/TextBox";
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
    (entry) => `\n- ${entry.jobTitle} at ${entry.company}`
  )}
  Education: ${formData.education.map(
    (entry) => `\n- ${entry.graduationYear} at ${entry.institutionName}`
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

      // const response = await fetch(`${API}/complete-text`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify({ prompt: generateGPTPrompt(formData) }),
      // });
      // if (!response.ok) {
      //   throw new Error("Something went wrong on server side");
      // }
      // const jsonResponse = await response.json();
      const HTML = "jsonResponse.output";
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

            <iframe className="w-full  h-[400px]" srcDoc={HTML} />
          </div>
          <div className="max-w-xl mx-auto bg-white p-4 shadow-md rounded-md">
            <h1 className="text-xl font-semibold mb-4">Code</h1>
            <pre className="bg-gray-200 p-4 rounded-md">
              <code className="text-sm font-mono">{HTML}</code>
            </pre>
          </div>
        </>
      ) : (
        <div className="">
          <div className="px-4">
            <TemplateSelector />
          </div>

          <Input
            value={personalData.name}
            onValueChange={(name) => {
              setPersonalData({ ...personalData, name });
            }}
            placeholder="Enter your Name"
            icon="job"
          />
          <div className="px-4">
            <HeaderSelectors />
          </div>

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
          <Input placeholder="Job Title" icon="job" />
          <Input placeholder="Company Name" icon="job" />
          <Input placeholder="Enter your skills" icon="job" />
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

          <div className="flex justify-center">
            <Button onClick={() => submitRequest(formData)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
