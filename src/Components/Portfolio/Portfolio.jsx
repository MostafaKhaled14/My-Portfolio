import React, { useState } from "react";
import Title from "../Title/Title";
import { motion } from "framer-motion";
import { images } from "../Images/Images";
import { Link } from "react-router-dom";
import Layer from "../Layer/Layer";

export default function Portfolio() {
  const [isActive, setIsActive] = useState("all");

  const content = {
    all: [],
    projects: [{ id: 1, image: images.image1, url: "https://mostafakhaled14.github.io/E-Commerce-App/" }],
    businesswebsites: [
      { id: 2, image: images.image2, url: "https://mostafakhaled14.github.io/Mealify-Progect/" },
      { id: 3, image: images.image3, url: "https://mostafakhaled14.github.io/progect2/" },
      { id: 4, image: images.image4, url: "https://mostafakhaled14.github.io/elmeshkateb/" },
      { id: 5, image: images.image5, url: "https://mostafakhaled14.github.io/Q-And-S-project-/" },
    ],
    portfolios: [
      { id: 6, image: images.image6, url: "https://mostafakhaled14.github.io/Portfolio-task/" },
      { id: 7, image: images.image7, url: "https://mostafakhaled14.github.io/DevFolio-By-Bootstrap/" },
      { id: 8, image: images.image8, url: "https://mostafakhaled14.github.io/progect4-fokir/" },
      { id: 9, image: images.image9, url: "https://mostafakhaled14.github.io/progect-leon/" },
      { id: 10, image: images.image10, url: "https://mostafakhaled14.github.io/Portfolio-task/" },
    ],
    Smalltasks: [
      { id: 11, image: images.image11, url: "https://mostafakhaled14.github.io/Login-System-task/" },
      { id: 12, image: images.image12, url: "https://mostafakhaled14.github.io/APIs--Task/" },
      { id: 13, image: images.image13, url: "https://mostafakhaled14.github.io/bookmark-js-3/" },
      { id: 14, image: images.image14, url: "https://mostafakhaled14.github.io/Routing/" },
      { id: 15, image: images.image15, url: "https://mostafakhaled14.github.io/Random-Quote-Generatorr/" },
      { id: 16, image: images.image16, url: "https://mostafakhaled14.github.io/Navigate-tasck/" },
      { id: 17, image: images.image17, url: "https://mostafakhaled14.github.io/grid-test/" },
      { id: 18, image: images.image18, url: "https://mostafakhaled14.github.io/My-Test-1/" },
      { id: 19, image: images.image19, url: "https://mostafakhaled14.github.io/stupid-Task/" },
    ],
  };

  content.all = Object.entries(content).flatMap(([, items]) => items.map((item) => ({ ...item })));

  return (
    <>
      <Layer />
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
        <div className="container m-auto px-8 2xl:px-40 uppercase">
          <Title title1={"my"} title2={"portfolio"} back={"works"} />
          <div>
            <div className="flex flex-wrap justify-center mb-6">
              {Object.entries(content).map(([pName]) => (
                <button
                  key={pName}
                  onClick={() => setIsActive(pName)}
                  className={`py-2 px-3 font-semibold uppercase ${isActive === pName ? "text-gold" : "dark:text-whiteof"}`}
                >
                  {pName}
                </button>
              ))}
            </div>
            <div>
              {Object.entries(content).map(([pName, data]) => (
                <div key={pName} className="flex flex-wrap justify-center gap-8">
                  {pName === isActive &&
                    data.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -100 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.7 }}
                      >
                        <div className="relative max-w-[300px] min-h-[250px] flex">
                          <img className="rounded-md object-cover text-whiteof" src={item.image} loading="lazy" alt="image" />
                          <Link to={item.url} target="_blank">
                            <h2 className="absolute inset-0 opacity-0 hover:opacity-100 duration-300 font-bold text-lg bg-gold text-whiteof flex justify-center items-center rounded-md">
                              {item.url.split("/")[3]?.trim()}
                            </h2>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
