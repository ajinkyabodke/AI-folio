import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { useData } from "../contexts/appContext";
import Loader from "../components/Loader";

const Home = () => {
  const { resHTML, setresHTML, isLoading, isSuccess } = useData();
 
  return (
    <>
      <Header />
      <div className="container mx-auto">
        {isLoading ? (
          <Loader />
        ) : isSuccess ? (
          <iframe srcDoc={portfolioHTML} frameBorder={0} />
        ) : (
          <Main />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
