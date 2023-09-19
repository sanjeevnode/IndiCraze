import { useContext, useEffect, useState } from "react";
import Section from "./Section";
import { Context } from "../../App";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  const { setIsLoading } = useContext(Context);
  const [vegetarian, setVegetarian] = useState([]);
  const [nonVegetarian, setNonVegetarian] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [breads, setBreads] = useState([]);

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
      setIsLoading(false);
    } catch (error) {
      alert(error.mssage);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getfoodata();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full h-screen ">
        {/* main container */}
        <div className="md:max-w-[90%] mx-auto p-2 md:px-4 py-2 flex flex-col h-auto ">
          {/* container for category */}

          <div className="w-full h-auto p-1  md:p-4 my-6 flex flex-col  py-1">
            <div className="w-full py-2">
              <p className="text-gray-500  text-2xl md:text-3xl">
                Best Vegetarian Foods
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 py-1 ">
              {vegetarian.map((ele, i) => {
                return <Section key={i} i={i} ele={ele} />;
              })}
            </div>
          </div>

          <div className="w-full h-auto p-1  md:p-4 my-6 flex flex-col  py-1">
            <div className="w-full py-2">
              <p className="text-gray-500  text-2xl md:text-3xl">
                Best Non Vegetarian Foods
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 py-1 ">
              {nonVegetarian.map((ele, i) => {
                return <Section key={i} i={i} ele={ele} />;
              })}
            </div>
          </div>

          <div className="w-full h-auto p-1  md:p-4 my-6 flex flex-col  py-1">
            <div className="w-full py-2">
              <p className="text-gray-500  text-2xl md:text-3xl">
                Best Beverages
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 py-1 ">
              {beverages.map((ele, i) => {
                return <Section key={i} i={i} ele={ele} />;
              })}
            </div>
          </div>

          <div className="w-full h-auto p-1  md:p-4 my-6 flex flex-col  py-1">
            <div className="w-full py-2">
              <p className="text-gray-500  text-2xl md:text-3xl">Best Breads</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 py-1 ">
              {breads.map((ele, i) => {
                return <Section key={i} i={i} ele={ele} />;
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
