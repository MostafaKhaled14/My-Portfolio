import { useState, useEffect, useRef } from "react";

export default function CursorShadow() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const target = useRef({ left: 0, top: 0 });
  const current = useRef({ left: 0, top: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      target.current = { left: e.clientX, top: e.clientY };
    };

    const animate = () => {
      current.current.left += (target.current.left - current.current.left) * 0.1;
      current.current.top += (target.current.top - current.current.top) * 0.1;
      setPosition({ left: current.current.left, top: current.current.top });
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <div className="hidden min-[500px]:block">
        <div
          className="h-10 w-10 bg-gold opacity-25 rounded-full fixed z-[99999999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: position.left + 2,
            top: position.top + 5,
          }}
        ></div>
      </div>
    </>
  );
}
