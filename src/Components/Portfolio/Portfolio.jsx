import React, { useState } from "react";
import Title from "../Title/Title";
import { motion } from "framer-motion";
import images from "../Images/Images";
import { Link } from "react-router-dom";
import Layer from "../Layer/Layer";

export default function Portfolio() {
  const [categoryActive, setcategoryActive] = useState("projects");
  const [technologyActive, setTechnologyActive] = useState("all");

  const content = {
    projects: {
      all: [],
      react_JS: [{ id: 1, image: images.image1, url: "https://mostafakhaled14.github.io/E-Commerce-App/" }],
      bootstrap: [{ id: 7, image: images.image7, url: "https://mostafakhaled14.github.io/DevFolio-By-Bootstrap/" }],
      css: [
        { id: 9, image: images.image9, url: "https://mostafakhaled14.github.io/progect-leon/" },
        { id: 2, image: images.image2, url: "https://mostafakhaled14.github.io/Mealify-Progect/" },
        { id: 8, image: images.image8, url: "https://mostafakhaled14.github.io/progect4-fokir/" },
        { id: 3, image: images.image3, url: "https://mostafakhaled14.github.io/progect2/" },
        { id: 4, image: images.image4, url: "https://mostafakhaled14.github.io/elmeshkateb/" },
        { id: 5, image: images.image5, url: "https://mostafakhaled14.github.io/Q-And-S-project-/" },
      ],
    },
    tasks: {
      all: [],
      react_JS: [
        { id: 100, image: images.image11, url: "https://mostafakhaled14.github.io/APIs--Task/" },
        { id: 16, image: images.image17, url: "https://mostafakhaled14.github.io/My-Test-1/" },
        { id: 12, image: images.image13, url: "https://mostafakhaled14.github.io/Routing/" },
      ],
      vanilla_JS: [
        { id: 6, image: images.image6, url: "https://mostafakhaled14.github.io/Portfolio-task/" },
        { id: 10, image: images.image10, url: "https://mostafakhaled14.github.io/Login-System-task/" },
        { id: 11, image: images.image12, url: "https://mostafakhaled14.github.io/bookmark-js-3/" },
        { id: 13, image: images.image14, url: "https://mostafakhaled14.github.io/Random-Quote-Generatorr/" },
        { id: 14, image: images.image15, url: "https://mostafakhaled14.github.io/Navigate-tasck/" },
        { id: 17, image: images.image18, url: "https://mostafakhaled14.github.io/stupid-Task/" },
      ],
      css: [
        { id: 15, image: images.image16, url: "https://mostafakhaled14.github.io/grid-test/" },
        { id: 24, image: images.image24, url: "https://mostafakhaled14.github.io/CSS-task-1/" },
        { id: 25, image: images.image25, url: "https://mostafakhaled14.github.io/CSS-task-2/" },
        { id: 26, image: images.image26, url: "https://mostafakhaled14.github.io/CSS-task-3/" },
        { id: 27, image: images.image27, url: "https://mostafakhaled14.github.io/CSS-task-4/" },
        { id: 28, image: images.image28, url: "https://mostafakhaled14.github.io/CSS-task-5/" },
      ],
      html: [
        { id: 19, image: images.image19, url: "https://mostafakhaled14.github.io/HTML-Task1/" },
        { id: 20, image: images.image20, url: "https://mostafakhaled14.github.io/HTML-Task-2/" },
        { id: 21, image: images.image21, url: "https://mostafakhaled14.github.io/HTML-Task-3/" },
        { id: 22, image: images.image22, url: "https://mostafakhaled14.github.io/HTML-Task-4/" },
        { id: 23, image: images.image23, url: "https://mostafakhaled14.github.io/HTML-Task-5/" },
      ],
    },
  };

  content.projects.all = Object.entries(content.projects).flatMap(([, items]) => items.map((item) => ({ ...item })));
  content.tasks.all = Object.entries(content.tasks).flatMap(([, items]) => items.map((item) => ({ ...item })));

  return (
    <>
      <section>
        <Layer />
        <motion.div
          className="container m-auto px-8 2xl:px-40 uppercase"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Title title1={"my"} title2={"portfolio"} back={"works"} />
          <div className="flex flex-col mb-6 *:flex *:flex-wrap *:justify-center">
            <div>
              {Object.entries(content).map(([CategoriesName]) => (
                <button
                  key={CategoriesName}
                  onClick={() => {
                    setcategoryActive(CategoriesName);
                    setTechnologyActive("all");
                  }}
                  className={`py-2 px-3 text-lg font-bold uppercase ${categoryActive === CategoriesName ? "text-gold" : "dark:text-whiteof"}`}
                >
                  {CategoriesName}
                </button>
              ))}
            </div>
            <div className="pb-6">
              {Object.entries(content).map(
                ([CategoriesName, CategoriesData]) =>
                  categoryActive === CategoriesName &&
                  Object.entries(CategoriesData).map(([technologiesName]) => (
                    <button
                      key={technologiesName}
                      onClick={() => setTechnologyActive(technologiesName)}
                      className={`py-2 px-3 font-semibold uppercase ${technologyActive === technologiesName ? "text-gren" : "dark:text-whiteof"}`}
                    >
                      {technologiesName}
                    </button>
                  ))
              )}
            </div>
            <div>
              {Object.entries(content).map(
                ([CategoriesName, CategoriesData]) =>
                  categoryActive === CategoriesName &&
                  Object.entries(CategoriesData).map(
                    ([technologiesName, technologiesData]) =>
                      technologyActive === technologiesName && (
                        <div key={technologiesName} className="flex flex-wrap justify-center gap-8 px-6">
                          {technologiesData.map((page) => (
                            <motion.div
                              key={page.id}
                              initial={{ opacity: 0, x: -100 }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ amount: 0.7 }}
                            >
                              <div className="relative max-w-[300px] min-h-[250px] flex">
                                <img className="rounded-md object-cover text-whiteof" src={page.image} loading="lazy" alt="image" />
                                <Link to={page.url} target="_blank">
                                  <h2 className="absolute inset-0 opacity-0 hover:opacity-100 duration-300 font-bold text-lg bg-gold text-whiteof flex justify-center items-center pages-center rounded-md">
                                    {page.url.split("/")[3]?.trim()}
                                  </h2>
                                </Link>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )
                  )
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
