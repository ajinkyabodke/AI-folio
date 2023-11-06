//@ts-check
import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [formData, setFormData] = useState({
    experience: [],

    skills: [],

    colors: {
      primary: "#FF6B6B",
      secondary: "#54D1DB",
      background: "#F7F7F7",
    },
  });

  const templates = ["Professional", "Creative", "Academic"];
  const [template, setTemplate] = useState("Professional");

  const headerStyles = ["Top Header", "Side Header"];
  const [headerStyle, setheaderStyle] = useState("Top Header");

  const fontSizes = ["Small", "Medium", "Large"];
  const [fontSize, setFontSize] = useState("Medium");

  const fontStyles = [
    "Montserrat",
    "Roboto",
    "Open Sans",
    "Lato",
    "Playfair Display",
  ];
  const [fontStyle, setFontStyle] = useState("Montserrat");

  const [personalData, setPersonalData] = useState({
    name: "",
    imageUrl: "",
    professionalSummary: "",
  });

  const [education, setEducation] = useState([]);

  const [contactlinks, setContactLinks] = useState({
    github: "",
    twitter: "",
    linkedin: "",
  });

  const handleTemplateChange = setTemplate;
  const handleHeaderStyle = setheaderStyle;
  const handleFontSize = setFontSize;
  const handleFontStyle = setFontStyle;

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
    // @ts-ignore
    setEducation([
      // @ts-ignore
      ...education,
      // @ts-ignore
      {
        graduationYear: "",
        institutionName: "",
        relevantCourses: "",
      },
    ]);
  };
  const handleRemoveEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    // @ts-ignore
    setEducation(updatedEducation);
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = [...education];
    // @ts-ignore
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    // @ts-ignore
    setEducation(updatedEducation);
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
      // @ts-ignore
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
        handleFontSize,
        fontSize,
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
        handleFontStyle,
        fontStyle,
        template,
        headerStyle,
        personalData,
        setPersonalData,
        contactlinks,
        setContactLinks,
        education,
        setEducation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useData = () => useContext(AppContext);
