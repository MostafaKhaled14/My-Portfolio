import React from "react";

export default function Title({ title1, title2, back }) {
  return (
    <>
      <div className={`flex justify-center items-center uppercase relative font-extrabold h-[25vh] z-20 dark:text-white`}>
        <h2 className="text-2xl sm:text-3xl md-text-4xl -tracking-wide">
          {title1}
          <span className="text-gold">{title2}</span>
        </h2>
        <span className="absolute -z-20 text-4xl sm:text-5xl md:text-6xl text-opacity-15 -tracking-tighter text-myground dark:text-myground">
          {back}
        </span>
      </div>
    </>
  );
}
