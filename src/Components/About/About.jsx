import React, { useRef } from "react";
import { motion } from "framer-motion";
import Title from "../Title/Title";
import MyButton from "../MyButton/MyButton";
import { SkillCircle } from "../SkillCircle/SkillCircle";
import "react-circular-progressbar/dist/styles.css";
import Layer from "../Layer/Layer";

export default function About({ withLayerAnimation = true }) {
  const pdfRef = useRef();

  const handleDownload = () => {
    window.open("../../../public/Mostafa_Khaled__CV.pdf", "_blank");
    const link = document.createElement("a");
    link.href = "../../../public/Mostafa_Khaled__CV.pdf";
    link.download = "Mostafa_Khaled__CV.pdf";
    link.click();
    console.log(link);
  };

  const experiences = [
    {
      id: 1,
      date: "Sep 2024 - Apr 2025",
      position: "Front-End Development Training",
      description:
        "I trained as a front-end developer at Route Academy, learning HTML, CSS, JavaScript, React, and more, and building real-world responsive projects.",
    },
    {
      id: 2,
      date: "Apr 2025 - Present",
      position: "React Training Program",
      description:
        "Currently training with Elmadrasah platform on React, learning components, props, hooks, routing, state management, performance optimization, ES6, DOM manipulation, APIs, asynchronous JavaScript, Git, GitHub, and problem-solving using ChatGPT.",
    },
    {
      id: 3,
      date: "Oct 2018 - Jun 2022",
      position: "Culture and Science city",
      description:
        "Studied economics at the Faculty of Economics and Political Science, City of Culture and Science city, with a focus on organization, analysis and management.",
    },
  ];

  return (
    <>
    <Layer animateLayer={withLayerAnimation} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-whiteof text-myblack dark:bg-myblack dark:text-whiteof"
        ref={pdfRef}
      >
        <div className="container m-auto px-3 sm:px-10 lg:px-28 pb-6">
          <Title title1={"about"} title2={"me"} back={"resume"} />
          <div className="grid xl:grid-cols-2 gap-8 place-items-center">
            <div>
              <h2 className="uppercase font-bold text-xl text-start">personal infos</h2>
              <div className="grid grid-cols-2  gap-4 pt-4 pb-8 *:col-span-2 *:sm:col-span-1 text-start">
                <p className="-order-2">
                  first name<span className="font-bold">: mostafa</span>
                </p>
                <p>
                  age<span className="font-bold">: 27 years old</span>
                </p>
                <p>
                  freelance:<span className="text-gren font-bold"> available</span>
                </p>
                <p>
                  phone<span className="font-bold">: +201159373701</span>
                </p>
                <p className="-order-1 ">
                  last name<span className="font-bold">: khaled</span>
                </p>
                <p>
                  nationality<span className="font-bold">: Egypt</span>
                </p>
                <p>
                  language<span className="font-bold">: arabic, english</span>
                </p>
                <p>
                  email<span className="lowercase font-bold text-sm">: mostafa2061999z13@gmail.com</span>
                </p>
                <p>
                  address
                  <span className="font-bold text-sm">: Egypt, Giza, October Gardens, Ebny Betak 2, Nile Delta Buildings </span>
                </p>
              </div>
              <div onClick={handleDownload} className="flex w-fit">
                <MyButton btnName="download cv " iconName={"fa fa-download"} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 uppercase py-6 ">
              <div className="*:p-5 *:w-40 flex flex-col gap-5 *:border *:border-gold *:border-opacity-30">
                <div>
                  <p className="text-gold text-3xl font-extrabold">1+</p>
                  <p className="w-4 h-0.5 relative top-3 bg-myblack dark:bg-white"></p>
                  <p className="pl-5">years of experience</p>
                </div>
                <div>
                  <p className="text-gold text-3xl font-extrabold">20+</p>
                  <p className="w-4 h-0.5 relative top-3 bg-myblack dark:bg-white"></p>
                  <p className="pl-5">completed projects</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 *:p-5 *:w-40 *:border *:border-gold *:border-opacity-30">
                <div>
                  <p className="text-gold text-3xl font-extrabold">20+</p>
                  <p className="w-4 h-0.5 relative top-3 bg-myblack dark:bg-white"></p>
                  <p className="pl-5">happy customers</p>
                </div>
                <div>
                  <p className="text-gold text-3xl font-extrabold">0+</p>
                  <p className="w-4 h-0.5 relative top-3 bg-myblack dark:bg-white"></p>
                  <p className="pl-5">awards won</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dark:text-white">
            <h2 className="uppercase font-bold text-xl text-center py-6">my skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <SkillCircle percentage={96} label="html" />
              <SkillCircle percentage={93} label="css" />
              <SkillCircle percentage={81} label="javascript" />
              <SkillCircle percentage={66} label="tipyscript" />
              <SkillCircle percentage={60} label="nextjs" />
              <SkillCircle percentage={84} label="tailwind" />
              <SkillCircle percentage={92} label="bootstrap" />
              <SkillCircle percentage={77} label="sass" />
            </div>
          </div>
          <div>
            <h2 className="uppercase font-bold text-xl text-center py-6">experience & education</h2>
            <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 *:flex *:gap-3 pb-12">
              {experiences.map((expertise) => (
                <div key={expertise.id}>
                  <div className="relative flex justify-center">
                    <div className="z-10 bg-gold w-8 h-8 rounded-full flex items-center justify-center">
                      <i className="fa fa-folder text-whiteof "></i>
                    </div>
                    <span className="inline-block bg-gold w-0.5 h-full opacity-50 absolute top-3"></span>
                  </div>
                  <div>
                    <p className="uppercase text-sm font-semibold bg-pale dark:bg-whiteoof rounded-full px-4 mb-2 w-fit">{expertise.date}</p>
                    <div className="text-left">
                      <h2 className="uppercase font-bold">{expertise.position}</h2>
                      <p>{expertise.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
