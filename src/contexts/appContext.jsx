//@ts-check
import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [formData, setFormData] = useState({
    template: "Professional",
    headerPosition: "top",
    includePhoto: false,
    imageURL: "",
    professionalSummary: "",
    experience: [],
    education: [],
    skills: [],
    contact: {
      githubURL: "",
      linkedinURL: "",
      twitterURL: "",
    },
    colors: {
      primary: "",
      secondary: "",
      background: "",
    },
    font: "",
    fontSize: "",
  });

  const templates = ["Professional", "Creative", "Academic"];
  const [template, setTemplate] = useState("Professional");
  const headerStyles = ["Top Header", "Side Header"];
  const [headerStyle, setheaderStyle] = useState("Top Header");

  const [personalData, setPersonalData] = useState({
    name: "",
    imageUrl: "",
  });
  const [contactlinks, setContactLinks] = useState({
    github: "",
    twitter: "",
    linkedin: "",
  });

  const handleTemplateChange = setTemplate;
  const handleHeaderStyle = setheaderStyle;

  const [portfolioHTML, setportfolioHTML] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "includePhoto") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? e.target.checked : value,
      });
    }
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      //@ts-ignore
      experience: [...formData.experience, { jobTitle: "", companyName: "" }],
    });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...formData.experience];
    updatedExperience.splice(index, 1);
    //@ts-ignore
    setFormData({ ...formData, experience: updatedExperience });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };
    //@ts-ignore
    setFormData({ ...formData, experience: updatedExperience });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        //@ts-ignore
        ...formData.education,
        //@ts-ignore
        { graduationYear: "", institutionName: "", relevantCourses: "" },
      ],
    });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    //@ts-ignore
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    //@ts-ignore
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      //@ts-ignore
      skills: [...formData.skills, ""],
    });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    //@ts-ignore
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleSkillChange = (e, index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = e.target.value;
    //@ts-ignore
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contact: { ...formData.contact, [name]: value },
    });
  };

  const handleColorsChange = (e, colorType) => {
    const updatedColors = { ...formData.colors, [colorType]: e.target.value };
    setFormData({ ...formData, colors: updatedColors });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(formData); // Log the form data to the console for debugging
    // You can perform further actions here, such as sending the data to a server or processing it.
  };

  return (
    //@ts-ignore
    <AppContext.Provider
      //@ts-ignore
      value={{
        formData,
        setFormData,
        setisSuccess,
        isSuccess,
        isLoading,
        handleHeaderStyle,
        setisLoading,
        setportfolioHTML,
        handleTemplateChange,
        handleInputChange,
        handleAddExperience,
        handleRemoveExperience,
        handleExperienceChange,
        handleAddEducation,
        handleRemoveEducation,
        handleEducationChange,
        handleAddSkill,
        handleRemoveSkill,
        handleSkillChange,
        handleContactChange,
        handleColorsChange,
        handleSubmit,
        template,
        headerStyle,
        personalData,
        setPersonalData,
        contactlinks,
        setContactLinks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useData = () => useContext(AppContext);
