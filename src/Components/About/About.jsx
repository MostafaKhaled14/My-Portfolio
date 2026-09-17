import { useRef, useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import Title from "../Title/Title";
import MyButton from "../MyButton/MyButton";
import SkillCircle from "../SkillCircle/SkillCircle";
import "react-circular-progressbar/dist/styles.css";
import Layer from "../Layer/Layer";
import { collection, getDocs, doc, getDoc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function About({ withLayerAnimation = true }) {
  const pdfRef = useRef();

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    freelance: "",
    phone: "",
    nationality: "",
    language: "",
    email: "",
    address: "",
    yearsOfExperience: "0+",
    completedProjects: "0+",
    happyCustomers: "0+",
    awardsWon: "0+",
    cvUrl: "",
  });
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personalSnap = await getDoc(doc(db, "about", "personal"));
        if (personalSnap.exists()) {
          setPersonalInfo((prev) => ({ ...prev, ...personalSnap.data() }));
        }

        const skillsQuery = query(collection(db, "skills"), orderBy("order", "asc"));
        const skillsSnap = await getDocs(skillsQuery);
        setSkills(skillsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        const expQuery = query(collection(db, "experiences"), orderBy("order", "asc"));
        const expSnap = await getDocs(expQuery);
        setExperiences(expSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = () => {
    let cvLink = personalInfo.cvUrl || "/My-Portfolio/Mostafa_Khaled__CV.pdf";
    window.open(cvLink, "_blank");
  };

  return (
    <>
      <section>
        <Layer animateLayer={withLayerAnimation} />
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-whiteof text-myblack dark:bg-myblack dark:text-whiteof"
          ref={pdfRef}
        >
          <div className="container m-auto px-3 sm:px-10 lg:px-28 pb-6">
            <Title title1={"about"} title2={"me"} back={"resume"} />

            {loading ? (
              <p className="text-center text-gold font-bold text-lg py-20">Loading...</p>
            ) : (
              <>
                <div className="grid xl:grid-cols-2 gap-8 place-items-center">
                  <div>
                    <h2 className="uppercase font-bold text-xl text-start">personal infos</h2>
                    <div className="grid grid-cols-2 pr-10 sm:pr-0 gap-4 pt-4 pb-8 *:col-span-2 *:sm:col-span-1 text-start">
                      <p className="-order-2">
                        first name<span className="font-bold">: {personalInfo.firstName}</span>
                      </p>
                      <p>
                        age<span className="font-bold">: {personalInfo.age}</span>
                      </p>
                      <p>
                        freelance:
                        <span className="text-gren font-bold"> {personalInfo.freelance}</span>
                      </p>
                      <p>
                        phone<span className="font-bold">: {personalInfo.phone}</span>
                      </p>
                      <p className="-order-1">
                        last name<span className="font-bold">: {personalInfo.lastName}</span>
                      </p>
                      <p>
                        nationality<span className="font-bold">: {personalInfo.nationality}</span>
                      </p>
                      <p>
                        language<span className="font-bold">: {personalInfo.language}</span>
                      </p>
                      <p>
                        email
                        <span className="lowercase font-bold text-sm">: {personalInfo.email}</span>
                      </p>
                      <p>
                        address
                        <span className="font-bold text-sm">: {personalInfo.address}</span>
                      </p>
                    </div>
                    <div onClick={handleDownload} className="flex w-fit">
                      <MyButton btnName="download cv " iconName={"fa fa-download"} />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 uppercase py-6">
                    <div className="*:p-5 *:w-40 flex flex-col gap-5 *:border *:border-gold *:border-opacity-30">
                      <div>
                        <p className="text-gold text-3xl font-extrabold">{personalInfo.yearsOfExperience}</p>
                        <p className="w-4 h-0.5 relative top-3 bg-myblack dark:bg-white"></p>
                        <p className="pl-5">years of experience</p>
                      </div>
                      <div>
                        <p className="text-gold text-3xl font-extrabold">{personalInfo.completedProjects}</p>
                        <p className="w-4 h-0.5 relative top-3 bg-myblack dark:bg-white"></p>
                        <p className="pl-5">completed projects</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 *:p-5 *:w-40 *:border *:border-gold *:border-opacity-30">
                      <div>
                        <p className="text-gold text-3xl font-extrabold">{personalInfo.happyCustomers}</p>
                        <p className="w-4 h-0.5 relative top-3 bg-myblack dark:bg-white"></p>
                        <p className="pl-5">happy customers</p>
                      </div>
                      <div>
                        <p className="text-gold text-3xl font-extrabold">{personalInfo.awardsWon}</p>
                        <p className="w-4 h-0.5 relative top-3 bg-myblack dark:bg-white"></p>
                        <p className="pl-5">awards won</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dark:text-white">
                  <h2 className="uppercase font-bold text-xl text-center py-6">my skills</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {skills.map((skill) => (
                      <SkillCircle key={skill.id} percentage={skill.percentage} label={skill.label} />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="uppercase font-bold text-lg sm:text-xl text-center py-6">experience & education</h2>
                  <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 pr-10 sm:pr-0 *:flex *:gap-3 pb-12">
                    {experiences.map((expertise) => (
                      <div key={expertise.id}>
                        <div className="relative flex justify-center">
                          <div className="z-10 bg-gold w-8 h-8 rounded-full flex items-center justify-center">
                            <i className="fa fa-folder text-whiteof"></i>
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
              </>
            )}
          </div>
        </Motion.div>
      </section>
    </>
  );
}
