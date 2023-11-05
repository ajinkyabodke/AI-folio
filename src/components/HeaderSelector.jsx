// @ts-check
import React from "react";
import { useData } from "../contexts/appContext";

const HeaderSelector = () => {
  const { headerStyle, handleHeaderStyle } = useData();
  return (
    <div className="mb-4">
      <label
        htmlFor="template"
        className="block text-sm font-medium text-gray-700"
      >
        Header Selection
      </label>
      <select
        name="template"
        id="template"
        className="form-select mt-1 block w-full"
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
