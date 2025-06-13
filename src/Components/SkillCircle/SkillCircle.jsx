import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useInView } from "react-intersection-observer";

export function SkillCircle({ percentage, label }) {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      setValue((rate) => {
        if (inView && rate < percentage) return rate + 1;
        if (!inView && rate > 0) return rate - 1;
        // clearInterval(interval);
        return inView ? percentage : 0;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [inView, percentage]);

  return (
    <>
      <div ref={ref} className="flex flex-col items-center">
        <div className="w-40 font-semibold">
          <CircularProgressbar
            value={value}
            text={`${value}%`}
            styles={buildStyles({
              pathTransition: "none",
              textColor: "#feb401",
              pathColor: "#46474b",
              trailColor: "#feb401",
            })}
          />
        </div>
        <h3 className="py-4 text-lg font-semibold uppercase text-myblack dark:text-white">{label}</h3>
      </div>
    </>
  );
}
