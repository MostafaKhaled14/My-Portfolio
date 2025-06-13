import React from "react";
import Title from "../Title/Title";
import { motion } from "framer-motion";
import MyButton from "../MyButton/MyButton";
import { Link } from "react-router-dom";
import Layer from "../Layer/Layer";

export default function Contact() {
  return (
    <>
    <Layer />
      <section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="dark:bg-myblack dark:text-whiteof"
        >
          <div className="container m-auto sm:px-12 lg:px-28 pb-6">
            <Title title1={"get in"} title2={"touch"} back={"contact"} />
            <div className="w-full px-14 py-8 md:py-16 ">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2 *:pb-4">
                  <h2 className="text-3xl font-bold uppercase">don't be shy !</h2>
                  <p className="">
                    Feel free to get in touch with me. i am always open to discussing new projects, creative ideas or opporunities to be part of your
                    visions.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <i className="fas fa-map text-xl sm:text-3xl mt-1 text-gold" />
                      <div>
                        <h4 className="font-semibold uppercase">Address Point</h4>
                        <p>Egypt, Giza, October Gardens, Ebny Betak 2, Nile Delta Buildings</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <i className="fas fa-envelope-open text-xl sm:text-3xl mt-1 text-gold" />
                      <div>
                        <h4 className="font-semibold uppercase">mail me</h4>
                        <p className="text-sm sm:text-base">mostafa2061999z13@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <i className="fas fa-square-phone text-xl sm:text-3xl mt-1 text-gold" />
                      <div>
                        <h4 className="font-semibold uppercase">Phone</h4>
                        <p>+201159373701</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 *:text-whiteof *:duration-150 *:w-10 *:h-10 *:flex *:items-center *:justify-center *:rounded-full *:bg-myground hover:*:bg-gold *:cursor-pointer">
                    <Link target="_blank" to={"https://www.facebook.com/mstfy.khald.952685/"}>
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link target="_blank" to={"https://github.com/MostafaKhaled14"}>
                      <i className="fab fa-github" />
                    </Link>
                    <Link target="_blank" to={"https://www.linkedin.com/in/mostafa-khaled-7481a8285/"}>
                      <i className="fab fa-linkedin-in" />
                    </Link>
                    <Link target="_blank" to={"https://www.instagram.com/mostafa_141120/"}>
                      <i className="fab fa-instagram" />
                    </Link>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-6">
                  <form className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <input type="text" placeholder="Your Name" className="style5 md:w-1/2" />
                      <input type="email" placeholder="Your Email" className="style5 md:w-1/2" />
                    </div>
                    <input type="text" placeholder="Your Subject" className="style5" />
                    <textarea rows="5" placeholder="Your Message" className="resize-none h-[150px] !rounded-2xl style5"></textarea>
                    <div>
                      <MyButton btnName={"send message"} iconName={"fa-solid fa-paper-plane"} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
