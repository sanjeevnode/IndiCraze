import React, { useEffect, useState } from "react";
import Section from "./Section";

const Home = () => {
  const [vegetarian, setVegetarian] = useState([]);
  const [nonVegetarian, setNonVegetarian] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [breads, setBreads] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getfoodata = async () => {
      try {
        const res = await fetch(
          `https://server-indicraze.onrender.com/api/fooditem/getfooditem`
        );
        const data = await res.json();

        setVegetarian(await data.Vegetarian);
        setNonVegetarian(await data.NonVegetarian);
        setBeverages(await data.Beverages);
        setBreads(await data.Breads);
        setIsLoading(true);
      } catch (error) {
        alert(error.mssage);
      }
    };

    getfoodata();
  }, []);

  return (
    <div className="w-full h-screen ">
      {/* main container */}
      <div className="md:max-w-[90%] pt-[50px] mx-auto p-2 md:px-4 py-2 flex flex-col h-auto ">
        {/* container for category */}

        <div className="w-full h-auto p-1  md:p-4 my-6 flex flex-col  py-1">
          <div className="text-2xl font-light text-[#FFA41B] w-full">
            <p className="text-gray-500 text-2xl">Vegetarian</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 py-1   ">
              {vegetarian.map((ele, i) => {
                return <Section key={i} i={i} ele={ele} />;
              })}
            </div>
          ) : (
            <div className="w-full p-2 flex justify-center items-center">
              <p className="text-2xl text-gray-300">Loading....</p>
            </div>
          )}
        </div>

        <div className="w-full h-auto p-1  md:p-4 my-6 flex flex-col  py-1">
          <div className="text-2xl font-light text-[#FFA41B] w-full">
            <p className="text-gray-500 text-2xl">Non Vegetarian</p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 py-1   ">
              {nonVegetarian.map((ele, i) => {
                return <Section key={i} i={i} ele={ele} />;
              })}
            </div>
          ) : (
            <div className="w-full p-2 flex justify-center items-center">
              <p className="text-2xl text-gray-300">Loading....</p>
            </div>
          )}
        </div>

        <div className="w-full h-auto p-1  md:p-4 my-6 flex flex-col  py-1">
          <div className="text-2xl font-light text-[#FFA41B] w-full">
            <p className="text-gray-500 text-2xl">Beverages</p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 py-1   ">
              {beverages.map((ele, i) => {
                return <Section key={i} i={i} ele={ele} />;
              })}
            </div>
          ) : (
            <div className="w-full p-2 flex justify-center items-center">
              <p className="text-2xl text-gray-300">Loading....</p>
            </div>
          )}
        </div>

        <div className="w-full h-auto p-1  md:p-4 my-6 flex flex-col  py-1">
          <div className="text-2xl font-light text-[#FFA41B] w-full">
            <p className="text-gray-500 text-2xl">Breads</p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 py-1   ">
              {breads.map((ele, i) => {
                return <Section key={i} i={i} ele={ele} />;
              })}
            </div>
          ) : (
            <div className="w-full p-2 flex justify-center items-center">
              <p className="text-2xl text-gray-300">Loading....</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
