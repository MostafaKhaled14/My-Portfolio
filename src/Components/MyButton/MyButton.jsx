import React, { useState } from "react";

export default function MyButton({ btnName, iconName }) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  function handlePosition(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    setPosition({ left, top });
    setIsHovered(true);
  }

  function handleState() {
    setIsHovered(false);
  }

  return (
    <>
      <button
        type="submit"
        className="uppercase relative border-2 border-gold overflow-hidden z-10 font-semibold rounded-full pl-3 cursor-pointer group"
        onMouseMove={(e) => handlePosition(e)}
        onMouseLeave={(e) => handleState(e)}
      >
        <span
          className={`${
            isHovered ? "w-[400px] h-[400px]" : "w-0 h-0 overflow-hidden"
          } absolute bg-gold rounded-full transition-all duration-700 ease-out -translate-x-1/2 -translate-y-1/2 -z-20`}
          style={{ top: position.top, left: position.left }}
        ></span>
        {btnName} <i className={`${iconName} bg-gold p-3 rounded-full`}></i>
      </button>
    </>
  );
}
