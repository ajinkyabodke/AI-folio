import React from "react";
// Import the Input component
import { useData } from "../contexts/appContext";
import { Input } from "postcss";

function ExperienceForm() {
  const {
    formData,
    handleExperienceChange,
    handleAddExperience,
    handleRemoveExperience,
  } = useData();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Experience
      </label>
      {formData.experience.map((exp, index) => (
        <div key={index} className="flex items-center mb-2">
          <Input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={exp.jobTitle}
            onValueChange={(value) => handleExperienceChange(value, index)}
            className="form-input w-1/2 mr-2"
          />

          <Input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={exp.companyName}
            onValueChange={(value) => handleExperienceChange(value, index)}
            className="form-input w-1/2 mr-2"
          />

          <button
            type="button"
            onClick={() => handleRemoveExperience(index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddExperience}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Add Experience
      </button>
    </div>
  );
}

export default ExperienceForm;
