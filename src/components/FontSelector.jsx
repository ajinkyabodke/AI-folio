// @ts-check
import React from "react";
import { useData } from "../contexts/appContext";

const FontSelector = () => {
  const { fontStyle, handleFontStyle } = useData();
  return (
    <div className="mb-4">
      <label
        htmlFor="template"
        className="block text-3xl py-2 font-medium text-gray-300"
      >
        Font Selection
      </label>
      <select
        name="fontStyle"
        id="fontStyle"
        className="form-select text-xl mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => handleFontStyle(e.target.value)}
        value={fontStyle}
      >
        <option value="Roboto">Roboto</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Lato">Lato</option>
        <option value="Playfair Display">Playfair Display</option>
        <option value="Open Sans">Open Sans</option>
      </select>
    </div>
  );
};

export default FontSelector;
