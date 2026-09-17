import { useState, useEffect } from "react";
import Title from "../Title/Title";
import { motion as Motion } from "framer-motion";
import MyButton from "../MyButton/MyButton";
import { Link } from "react-router-dom";
import Layer from "../Layer/Layer";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [contactInfo, setContactInfo] = useState({
    title: "don't be shy !",
    description:
      "Feel free to get in touch with me. i am always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
    address: "Egypt, Giza, October Gardens, Ebny Betak 2, Nile Delta Buildings",
    email: "mostafa2061999z13@gmail.com",
    phone: "+201159373701",
    facebook: "https://www.facebook.com/mstfy.khald.952685/",
    github: "https://github.com/MostafaKhaled14",
    linkedin: "https://www.linkedin.com/in/mostafa-khaled-7481a8285/",
    instagram: "https://www.instagram.com/mostafa_141120/",
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const docRef = doc(db, "contactInfo", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContactInfo((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setInfoLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false,
      });
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <Layer />

        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="dark:bg-myblack dark:text-whiteof"
        >
          <div className="container m-auto sm:px-12 lg:px-28 pb-6">
            <Title title1={"get in"} title2={"touch"} back={"contact"} />
            <div className="w-full px-14 py-8 md:py-16">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
                {/* Left Side */}
                <div className="md:w-1/2 *:pb-4">
                  {infoLoading ? (
                    <p className="text-gold font-bold text-lg py-10">Loading...</p>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold uppercase">{contactInfo.title}</h2>
                      <p>{contactInfo.description}</p>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <i className="fas fa-map text-xl sm:text-3xl mt-1 text-gold" />
                          <div>
                            <h4 className="font-semibold uppercase">Address Point</h4>
                            <p>{contactInfo.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <i className="fas fa-envelope-open text-xl sm:text-3xl mt-1 text-gold" />
                          <div>
                            <h4 className="font-semibold uppercase">mail me</h4>
                            <p className="text-sm sm:text-base">{contactInfo.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <i className="fas fa-square-phone text-xl sm:text-3xl mt-1 text-gold" />
                          <div>
                            <h4 className="font-semibold uppercase">Phone</h4>
                            <p>{contactInfo.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4 *:text-whiteof *:duration-150 *:w-10 *:h-10 *:flex *:items-center *:justify-center *:rounded-full *:bg-pale hover:*:bg-gold *:cursor-pointer">
                        <Link target="_blank" to={contactInfo.facebook}>
                          <i className="fab fa-facebook-f" />
                        </Link>
                        <Link target="_blank" to={contactInfo.github}>
                          <i className="fab fa-github" />
                        </Link>
                        <Link target="_blank" to={contactInfo.linkedin}>
                          <i className="fab fa-linkedin-in" />
                        </Link>
                        <Link target="_blank" to={contactInfo.instagram}>
                          <i className="fab fa-instagram" />
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Side - Form */}
                <div className="md:w-1/2 space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="style5 md:w-1/2"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="style5 md:w-1/2"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Your Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="style5"
                      required
                    />
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="resize-none h-[150px] !rounded-2xl style5"
                      required
                    ></textarea>

                    {success && <p className="text-green-500 font-semibold text-center">Message sent successfully!</p>}
                    {error && <p className="text-red-500 font-semibold text-center">{error}</p>}

                    <div>
                      <button type="submit" disabled={loading} className="w-full">
                        <MyButton btnName={loading ? "Sending..." : "send message"} iconName={"fa-solid fa-paper-plane"} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Motion.div>
      </section>
    </>
  );
}
