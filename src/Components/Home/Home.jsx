import React, { useContext } from "react";
import MyModal from "../MyModal/MyModal";
import { motion } from "framer-motion";
import image from "../../assets/profile1.jpg";
import MyButton from "../MyButton/MyButton";
import { MyContext } from "../../context/MyContext";
import Layer from "../Layer/Layer";

export default function Home() {
  const { setIsSelected } = useContext(MyContext);
  return (
    <>
    <Layer /> 
      <main className="overflow-hidden">
        <motion.div initial={{ opacity: 0, translateY: 50 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <div className="flex flex-col justify-center lg:grid lg:grid-cols-2 grid-rows-3 lg:grid-rows-1 lg:gap-4 h-screen ">
            <div className="xl:w-[85%] h-fit lg:h-screen p-8 overflow-hidden relative z-10 lg:block flex justify-center items-top">
              <div className="w-2/3 h-full absolute top-0 hidden lg:block -left-28 -z-20 bg-gold skew-x-12"></div>
              <img src={image} className="w-[220px] sm:w-[300px] md:w-[460px] lg:w-full h-[300px] sm:h-[400px] md:h-[520px] lg:h-full rounded-2xl object-cover" alt="img" />
            </div>
            <div className="lg:pr-20 flex justify-center items-center">
              <div className="w-3/4 px-1 sm:px-4 md:px-0 dark:bg-myblack dark:text-whiteof lg:text-start text-center">
                <div className="flex justify-center lg:justify-start">
                  <p className="w-4 h-0.5 relative top-3.5 -left-2 bg-gold"></p>
                  <p className="text-gold uppercase text-lg sm:text-lg lg:text-2xl font-bold"> I'm Mostafa Khaled.</p>
                </div>
                <h2 className="uppercase text-lg sm:text-lg lg:text-2xl font-bold pt-2">Web Designer</h2>
                <p className="py-4">
                  I'm a Egyptian based web designer & front-end developer focused on craiting clean & user-friendly experiences, i am passionate about
                  building excellent software that improves the lives of those around me.
                </p>
                <div onClick={() => setIsSelected(true)}>
                  <MyButton btnName="more about me" iconName={"far fa-arrow-alt-circle-left"} />
                </div>
                <MyModal />
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
