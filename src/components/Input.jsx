//@ts-check
import React from "react";
import link from "../assets/link.svg";
import job from "../assets/job.svg";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import summary from "../assets/summary.svg";
import { useData } from "../contexts/appContext";
function Input({
  placeholder = "Github",
  type = "text",
  icon = "summary",
  onValueChange,
  value,
  ...rest
}) {
  const icons = {
    link: link,
    job: job,
    github: github,
    linkedin: linkedin,
    twitter: twitter,
  };

  return (
    <div className="p-2">
      <form className="flex items-center">
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon && <img className="w-4 h-4" src={icons[icon]} />}
          </div>
          <input
            type={type}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            onChange={(e) => onValueChange(e.target.value)}
            value={value}
            {...rest}
          />
        </div>
      </form>
    </div>
  );
}

export default Input;
