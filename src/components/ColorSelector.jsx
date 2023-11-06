import React from "react";
import { useData } from "../contexts/appContext";

function ColorSelector() {
  const { colorChange, formData, handleInputChange, handleColorsChange } =
    useData();
  console.log(formData.colors);
  return (
    <>
      <label className="block text-3xl py-2 font-medium text-gray-300">
        Color Selection
      </label>
      <div className="flex flex-col sm:flex-row items-start w-full sm:items-center align-middle">
        <div className="flex  sm:flex-row items-center">
          <label
            htmlFor="primaryColor"
            className="text-2xl px-2 text-slate-200"
          >
            Primary Color :
          </label>
          <input
            type="color"
            id="primaryColor"
            name="primaryColor"
            value={formData.colors.primary}
            onChange={(e) => handleColorsChange(e, "primary")}
            className="form-input "
          />
        </div>
        <div className="flex sm:flex-row items-center">
          <label
            htmlFor="secondaryColor"
            className="text-2xl px-2 text-slate-200"
          >
            Secondary Color :
          </label>
          <input
            type="color"
            id="secondaryColor"
            name="secondaryColor"
            value={formData.colors.secondary}
            onChange={(e) => handleColorsChange(e, "secondary")}
            className="form-input"
          />
        </div>
        <div className="flex sm:flex-row items-center">
          <label
            htmlFor="backgroundColor"
            className="text-2xl px-2 text-slate-200"
          >
            Background Color :
          </label>
          <input
            type="color"
            id="backgroundColor"
            name="backgroundColor"
            value={formData.colors.background}
            defaultValue="#ffaabb"
            onChange={(e) => handleColorsChange(e, "background")}
            className="form-input"
          />
        </div>
      </div>
    </>
  );
}

export default ColorSelector;
