import { useContext, useState, useEffect } from "react";
import MyModal from "../MyModal/MyModal";
import { motion as Motion } from "framer-motion";
import images from "../Images/Images";
import MyButton from "../MyButton/MyButton";
import { MyContext } from "../../context/MyContext";
import Layer from "../Layer/Layer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Home() {
  const { setIsSelected } = useContext(MyContext);
  const [homeInfo, setHomeInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeInfo = async () => {
      try {
        const docRef = doc(db, "homeInfo", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHomeInfo(docSnap.data());
        } else {
          setHomeInfo({
            name: "I'm Mostafa Khaled.",
            jobTitle: "Web Designer",
            description:
              "I'm a Egyptian based web designer & front-end developer focused on craiting clean & user-friendly experiences, i am passionate about building excellent software that improves the lives of those around me.",
            imageUrl: "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeInfo();
  }, []);

  return (
    <>
      <main>
        <section className="overflow-hidden">
          <Layer />
          <Motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="flex flex-col justify-center lg:grid lg:grid-cols-2 grid-rows-3 lg:grid-rows-1 lg:gap-4 lg:h-screen bg-whiteof dark:bg-myblack text-black dark:text-white max-w-[1536px]">
              <div className="xl:w-[85%] min-[1537px]:w-[700px] h-fit lg:h-screen overflow-hidden relative z-10 lg:block flex justify-center items-top">
                <div className="w-[1000px] h-full absolute top-0 hidden lg:block -left-[650px] -z-20 bg-gold skew-x-[25deg]"></div>
                <img
                  src={homeInfo?.imageUrl || images.myPhoto2}
                  className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-full h-[300px] sm:h-[400px] md:h-[420px] lg:h-full rounded-[55px] object-cover p-8"
                  alt="profile"
                />
              </div>

              <div className="px-2 lg:pr-20 flex justify-center items-center">
                <div className="w-3/4 px-1 sm:px-4 md:px-0 dark:bg-myblack dark:text-whiteof lg:text-start text-center pb-8">
                  {loading || !homeInfo ? (
                    <p className="text-gold font-bold text-lg py-10">Loading...</p>
                  ) : (
                    <>
                      <div className="flex justify-center lg:justify-start">
                        <p className="w-4 h-0.5 relative top-3.5 -left-2 bg-gold"></p>
                        <p className="text-gold uppercase text-lg sm:text-lg lg:text-2xl font-bold">{homeInfo.name}</p>
                      </div>
                      <h2 className="uppercase text-lg sm:text-lg lg:text-2xl font-bold pt-2">{homeInfo.jobTitle}</h2>
                      <p className="py-4">{homeInfo.description}</p>
                      <div onClick={() => setIsSelected(true)}>
                        <MyButton btnName="more about me" iconName={"far fa-arrow-alt-circle-left"} />
                      </div>
                      <MyModal />
                    </>
                  )}
                </div>
              </div>
            </div>
          </Motion.div>
        </section>
      </main>
    </>
  );
}
