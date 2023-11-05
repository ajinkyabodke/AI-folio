// @ts-check
import React from "react";
import { useData } from "../contexts/appContext";

const TemplateSelector = () => {
  const { template, handleTemplateChange } = useData();
  return (
    <div className="mb-4">
      <label
        htmlFor="template"
        className="block text-sm font-medium text-gray-700"
      >
        Template Selection
      </label>
      <select
        name="template"
        id="template"
        className="form-select mt-1 block w-full"
        onChange={(e) => handleTemplateChange(e.target.value)}
        value={template}
      >
        <option value="Professional">Professional</option>
        <option value="Creative">Creative</option>
        <option value="Academic">Academic</option>
      </select>
    </div>
  );
};

export default TemplateSelector;
