import { useState, useEffect } from "react";
import Title from "../Title/Title";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layer from "../Layer/Layer";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function Portfolio() {
  const [categoryActive, setCategoryActive] = useState("projects");
  const [technologyActive, setTechnologyActive] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const content = {
    projects: {
      all: projects.filter((p) => p.category === "projects"),
      react_JS: projects.filter((p) => p.category === "projects" && p.technology === "react_JS"),
      bootstrap: projects.filter((p) => p.category === "projects" && p.technology === "bootstrap"),
      css: projects.filter((p) => p.category === "projects" && p.technology === "css"),
    },
    tasks: {
      all: projects.filter((p) => p.category === "tasks"),
      react_JS: projects.filter((p) => p.category === "tasks" && p.technology === "react_JS"),
      vanilla_JS: projects.filter((p) => p.category === "tasks" && p.technology === "vanilla_JS"),
      css: projects.filter((p) => p.category === "tasks" && p.technology === "css"),
      html: projects.filter((p) => p.category === "tasks" && p.technology === "html"),
    },
  };

  return (
    <>
      <section>
        <Layer />
        <Motion.div
          className="container m-auto px-8 2xl:px-40 uppercase"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Title title1={"my"} title2={"portfolio"} back={"works"} />

          {loading ? (
            <p className="text-center text-gold font-bold text-lg py-20">Loading projects...</p>
          ) : (
            <div className="flex flex-col mb-6 *:flex *:flex-wrap *:justify-center">
              <div>
                {Object.keys(content).map((CategoriesName) => (
                  <button
                    key={CategoriesName}
                    onClick={() => {
                      setCategoryActive(CategoriesName);
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
                    Object.keys(CategoriesData).map((technologiesName) => (
                      <button
                        key={technologiesName}
                        onClick={() => setTechnologyActive(technologiesName)}
                        className={`py-2 px-3 font-semibold uppercase ${technologyActive === technologiesName ? "text-gren" : "dark:text-whiteof"}`}
                      >
                        {technologiesName}
                      </button>
                    )),
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
                            {technologiesData.length === 0 ? (
                              <p className="text-center text-lg py-10">No projects yet in this category</p>
                            ) : (
                              technologiesData.map((page) => (
                                <Motion.div
                                  key={page.id}
                                  initial={{ opacity: 0, x: -100 }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ amount: 0.7 }}
                                >
                                  <div className="relative max-w-[300px] min-h-[250px] flex">
                                    <img
                                      className="rounded-md object-cover text-whiteof w-full"
                                      src={page.image}
                                      loading="lazy"
                                      alt={page.title || "project"}
                                    />
                                    <Link to={page.url} target="_blank">
                                      <h2 className="absolute inset-0 opacity-0 hover:opacity-100 duration-300 font-bold text-lg bg-gold text-whiteof flex justify-center items-center rounded-md">
                                        {page.title || page.url?.split("/")[3]?.trim()}
                                      </h2>
                                    </Link>
                                  </div>
                                </Motion.div>
                              ))
                            )}
                          </div>
                        ),
                    ),
                )}
              </div>
            </div>
          )}
        </Motion.div>
      </section>
    </>
  );
}
