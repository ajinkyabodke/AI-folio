import React from "react";
import { useData } from "../contexts/appContext";

export const RadioInput = ({ options, onValueChange }) => {
  const { template, handleTemplateChange } = useData();

  return (
    <div>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {options.map((option, index) => (
          <li
            key={index}
            className={`w-full border-b border-gray-200 ${
              index < options.length - 1 ? "sm:border-r" : ""
            } dark:border-gray-600`}
          >
            <div className="flex items-center pl-3">
              <input
                id={`horizontal-list-radio-${option}`}
                defaultChecked={option === template}
                type="radio"
                value={option}
                name="list-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                onChange={() => onValueChange(option)}
              />
              <label
                htmlFor={`horizontal-list-radio-${option}`}
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
