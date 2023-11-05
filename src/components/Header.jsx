import React from "react";
import { useState } from "react";
import reactIcon from "../assets/react.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  function handleClick(e) {
    setToggle(!toggle);
  }
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-full">
      <div className="flex flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <img src={reactIcon} className="h-8 mr-3" alt="React Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-green-400">
            AI Folio
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
