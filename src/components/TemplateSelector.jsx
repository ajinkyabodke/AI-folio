// @ts-check
import React from "react";
import { useData } from "../contexts/appContext";

const TemplateSelector = () => {
  const { template, handleTemplateChange } = useData();
  return (
    <div className="mb-4">
      <label
        htmlFor="template"
        className="block text-xl font-medium text-gray-300"
      >
        Template Selection
      </label>
      <select
        name="template"
        id="template"
        className="form-select mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
