import React from "react";
import { useData } from "../contexts/appContext";

export const ColorPicker = ({ colorOptions }) => {
  const { handleColorsChange, formData } = useData();
  // console.log("colorOptions",colorOptions)

  return (
    <div className="flex flex-col gap-4">
      {colorOptions.map((colorType, index) => (
        <div key={index}>
          <h3 className="text-gray-900 font-bold text-lg">{colorType} Color</h3>
          <div className="w-12 h-12">
            <input
              type="color"
              className="w-full h-full bg-transparent"
              onChange={(e) => handleColorsChange(e, colorType.toLowerCase())}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
