import { motion as Motion } from "framer-motion";

export default function Layer({ animateLayer = true }) {
  return (
    <>
      {animateLayer ? (
        <Motion.div
          animate={{ translateY: 5000 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-layer z-[999999999999999999999]"
        ></Motion.div>
      ) : (
        <div />
      )}
    </>
  );
}
