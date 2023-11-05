import React from "react";

import { useData } from "../contexts/appContext";

function FontSizeSelector() {
  const { fontSize, handleFontSize } = useData();
  return (
    <div className="mb-4">
      <label
        htmlFor="template"
        className="block text-3xl py-2 font-medium text-gray-300"
      >
        Font Size Selection
      </label>
      <select
        name="fontSize"
        id="fontSize"
        className="form-select text-xl mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => handleFontSize(e.target.value)}
        value={fontSize}
      >
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
    </div>
  );
}

export default FontSizeSelector;
