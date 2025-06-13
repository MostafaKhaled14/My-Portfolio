import React, { useContext } from "react";
import About from "../About/About";
import { motion } from "framer-motion";
import { MyContext } from "../../context/MyContext";

export default function MyModal() {
  const { isSelected, setIsSelected } = useContext(MyContext);
  return (
    <>
      {isSelected && (
        <div onClick={() => setIsSelected(false)} className="bg-black bg-opacity-40 fixed inset-0 z-[99999999] flex justify-center items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="max-w-[72%]">
            <div className="flex justify-end relative -top-1 -right-5">
              <button className="text-gold text-xl" onClick={() => setIsSelected(false)}>
                x
              </button>
            </div>
            <div onClick={(e) => e.stopPropagation()} className="custom-scroll-modal relative overflow-y-auto  max-h-[80vh]">
              <About withLayerAnimation={false} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
