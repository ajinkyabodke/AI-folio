import React from "react";
import LandingPageImage from "../assets/resume.svg";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main className="min-h-screen w-screen p-6 flex flex-col items-center justify-center sm:py-12 lg:py-30 lg:flex-row lg:justify-evenly dark:bg-gray-900 dark:text-gray-100">
      <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <h1 className="text-5xl font-bold leadi sm:text-6xl">
          AI
          <span className="dark:text-green-400"> Folio</span>
        </h1>
        <p className="mt-6 mb-8 text-4xl sm:mb-12">
          "Unlock Your Professional Potential with <b>AI-Powered </b>{" "}
          Portfolios"
          <br className="hidden md:inline lg:hidden" />
        </p>
        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
          <Link
            rel="noopener noreferrer"
            to="/app"
            className=" hover:bg-green-300 px-8 py-3 text-lg font-semibold rounded dark:bg-green-400 dark:text-gray-900"
          >
            Create Now
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
        <img
          src={LandingPageImage}
          alt="LandingPageImage"
          className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
        />
      </div>
    </main>
  );
}

export default LandingPage;
