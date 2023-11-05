import React from "react";

const TextBox = () => {
  return (
    <div className="bg-gray-900 dark:bg-black p-4 rounded-lg shadow-lg">
      <div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-green-400 dark:text-green-400"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-green-400 bg-gray-800 dark:bg-gray-700 rounded-lg border border-green-400 focus:ring-blue-500 focus:border-blue-500 dark:border-green-600 dark:placeholder-green-400 dark:text-green-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          defaultValue={""}
        />
      </div>
    </div>
  );
};

export default TextBox;
