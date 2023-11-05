// @ts-check
import React from "react";
import { useData } from "../contexts/appContext";

const HeaderSelector = () => {
  const { headerStyle, handleHeaderStyle } = useData();
  return (
    <div className="mb-4">
      <label
        htmlFor="template"
        className="block text-3xl font-medium py-2 text-gray-300"
      >
        Header Selection
      </label>
      <select
        name="template"
        id="template"
        className="form-select mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => handleHeaderStyle(e.target.value)}
        value={headerStyle}
      >
        <option value="Top Header">Top Header</option>
        <option value="Side Header">Side Header</option>
      </select>
    </div>
  );
};

export default HeaderSelector;
