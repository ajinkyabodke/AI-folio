import React, { useState } from "react";
import { useData } from "../contexts/appContext";

function Button({ text = "Submit", ...rest }) {
  const { handleSubmit } = useData();
  const { formData } = useData();
  // const [portfolioHTML, setportfolioHTML] = useState("");
  // const [isLoading, setisLoading] = useState(false);
  // const [isSuccess, setisSuccess] = useState(false);
  // const { resHTML, setresHTML } = useData();
  // function generateGPTPrompt() {
  //   console.log("gpt:", formData);
  //   // Create a GPT prompt using the updated user input
  //   const promptTemplate = `Give me markup for portfolio in the form of website, with the following details:
  // Template: ${formData.template}
  // Header Position: ${formData.headerPosition}
  // Include Photo: ${formData.includePhoto ? "Yes" : "No"}
  // Professional Summary: ${formData.professionalSummary}
  // Experience: ${formData.experience.map(
  //   (entry) => `\n- ${entry.jobTitle} at ${entry.company}`
  // )}
  // Education: ${formData.education.map(
  //   (entry) => `\n- ${entry.graduationYear} at ${entry.institutionName}`
  // )}
  // Skills: ${formData.skills.join(", ")}
  // Contact: GitHub - ${formData.contact.githubURL}, LinkedIn - ${
  //     formData.contact.linkedinURL
  //   }, Twitter - ${formData.contact.twitterURL}
  // Colors: Primary - ${formData.colors.primary}, Secondary - ${
  //     formData.colors.secondary
  //   }, Background - ${formData.colors.background}
  // Font: ${formData.font}
  // Font Size: ${formData.fontSize}
  // ...`;
  //   return promptTemplate;
  // }

  // const submitRequest = async (formData) => {
  //   try {
  //     setisLoading(true);
  //     setisSuccess(false);
  //     console.log(generateGPTPrompt(formData));

  //     const response = await fetch(`${API}/complete-text`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify({ prompt: generateGPTPrompt(formData) }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Something went wrong on server side");
  //     }
  //     const jsonResponse = await response.json();
  //     const HTML = jsonResponse.output;

  //     setportfolioHTML(HTML);
  //     setisSuccess(true);
  //     console.log("buttsucc", isSuccess);
  //     setresHTML(HTML);
  //     console.log("⚪️respone:", resHTML);
  //     return jsonResponse;
  //   } catch (error) {
  //     console.error(error);
  //     return error;
  //   } finally {
  //     setisLoading(false);
  //   }
  // };

  return (
    <button
      className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-gray-900 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
      {...rest}
    >
      <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-green-400 group-hover:h-full" />
      <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg
          className="w-5 h-5 text-gray-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>
      <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg
          className="w-5 h-5 text-gray-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>
      <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-gray-900">
        {text}
      </span>
    </button>
  );
}

export default Button;
