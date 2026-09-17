import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { motion as Motion } from "framer-motion";
import Title from "../Title/Title";
import Layer from "../Layer/Layer";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function Blog() {
  const { isSelected, setIsSelected } = useContext(MyContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (isSelected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSelected]);

  return (
    <>
      <section>
        <Layer />
        <Motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <div className="container m-auto px-12 lg:px-28 pb-6">
            <Title title1={"my"} title2={"blog"} back={"posts"} />

            {loading ? (
              <p className="text-center text-gold font-bold text-lg py-20">Loading blogs...</p>
            ) : blogs.length === 0 ? (
              <p className="text-center text-lg py-20">No blogs yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div key={blog.id} className="group cursor-pointer max-h-[415px] overflow-hidden pr-4" onClick={() => setIsSelected(blog)}>
                    <div className="overflow-hidden rounded-t-md">
                      <img src={blog.image} alt={blog.title} className="w-full duration-300 group-hover:scale-110" />
                    </div>
                    <span className="w-full h-1.5 rounded-xl bg-gold block"></span>
                    <div className="p-5 min-h-[220px] rounded-b-md *:pb-4 bg-myblack text-whiteof dark:bg-pale">
                      <h2 className="font-extrabold text-lg capitalize group-hover:text-gold duration-300">{blog.title}</h2>
                      <p className="font-semibold text-sm">{blog.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isSelected && (
              <div
                onClick={() => setIsSelected(false)}
                className="bg-whiteof dark:bg-black fixed inset-0 flex justify-center items-center z-[99999999999999]"
              >
                <Motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-myblack max-w-3xl w-[90%] max-h-[90vh] overflow-y-auto rounded-xl p-6 relative"
                >
                  <button onClick={() => setIsSelected(false)} className="absolute top-4 right-4 text-2xl font-bold text-gold">
                    ×
                  </button>

                  <img src={isSelected.image} alt={isSelected.title} className="w-full rounded-lg mb-6 max-h-80 object-cover" />

                  <h2 className="text-2xl font-bold mb-4 text-gold">{isSelected.title}</h2>

                  <div className="flex gap-4 text-sm text-gray-500 mb-6">
                    <span>{isSelected.info?.names}</span>
                    <span>{isSelected.info?.date}</span>
                    <span>{isSelected.info?.keywords}</span>
                  </div>

                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {isSelected.details?.p1 && <p>{isSelected.details.p1}</p>}
                    {isSelected.details?.p2 && <p>{isSelected.details.p2}</p>}
                    {isSelected.details?.p3 && <p>{isSelected.details.p3}</p>}
                  </div>
                </Motion.div>
              </div>
            )}
          </div>
        </Motion.div>
      </section>
    </>
  );
}
