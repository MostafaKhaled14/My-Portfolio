import React, { useContext } from "react";
import MyModal from "../MyModal/MyModal";
import { motion } from "framer-motion";
import images from "../Images/Images";
import MyButton from "../MyButton/MyButton";
import { MyContext } from "../../context/MyContext";
import Layer from "../Layer/Layer";

export default function Home() {
  const { setIsSelected } = useContext(MyContext);
  return (
    <>
      <main>
        <section className="overflow-hidden">
          <Layer />
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="flex flex-col justify-center lg:grid lg:grid-cols-2 grid-rows-3 lg:grid-rows-1 lg:gap-4 lg:h-screen bg-whiteof dark:bg-myblack text-black dark:text-white max-w-[1536px]">
              <div className="xl:w-[85%] min-[1537px]:w-[850px] h-fit lg:h-screen overflow-hidden relative z-10 lg:block flex justify-center items-top">
                <div className="w-[1000px] h-full absolute top-0 hidden lg:block -left-[650px] -z-20 bg-gold skew-x-[25deg]"></div>
                <img
                  src={images.image52}
                  className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-full h-[300px] sm:h-[400px] md:h-[420px] lg:h-full rounded-[55px] object-cover p-8"
                  alt="img"
                />
              </div>
              <div className="px-2 lg:pr-20 flex justify-center items-center">
                <div className="w-3/4 px-1 sm:px-4 md:px-0 dark:bg-myblack dark:text-whiteof lg:text-start text-center pb-8">
                  <div className="flex justify-center lg:justify-start">
                    <p className="w-4 h-0.5 relative top-3.5 -left-2 bg-gold"></p>
                    <p className="text-gold uppercase text-lg sm:text-lg lg:text-2xl font-bold"> I'm Mostafa Khaled.</p>
                  </div>
                  <h2 className="uppercase text-lg sm:text-lg lg:text-2xl font-bold pt-2">Web Designer</h2>
                  <p className="py-4">
                    I'm a Egyptian based web designer & front-end developer focused on craiting clean & user-friendly experiences, i am passionate
                    about building excellent software that improves the lives of those around me.
                  </p>
                  <div onClick={() => setIsSelected(true)}>
                    <MyButton btnName="more about me" iconName={"far fa-arrow-alt-circle-left"} />
                  </div>
                  <MyModal />
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
