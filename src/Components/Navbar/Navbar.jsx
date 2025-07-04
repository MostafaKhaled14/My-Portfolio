import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  function handleDarkMode() {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (userTheme === "dark" || (!userTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <header className="p-3 pt-6 fixed right-0 top-0 h-screen z-[9999] flex flex-col justify-between items-center">
        <div onClick={() => handleDarkMode()} className="style3">
          <i className="fa-regular fa-moon"></i>
        </div>
        <nav className="style2">
          <NavLink to="/home" className="group">
            <div className="style4">
              <i className="fa-solid fa-house"></i>
            </div>
            <span className="style1">home</span>
          </NavLink>
          <NavLink to="/about" className="group">
            <div className="style4">
              <i className="fa-solid fa-user"></i>
            </div>
            <span className="style1">About</span>
          </NavLink>
          <NavLink to="/portfolio" className="group">
            <div className="style4">
              <i className="fa-solid fa-folder"></i>
            </div>
            <span className="style1">Portfolio</span>
          </NavLink>
          <NavLink to="/contact" className="group">
            <div className="style4">
              <i className="fa-solid fa-envelope-open"></i>
            </div>
            <span className="style1">Contact</span>
          </NavLink>
          <NavLink to="/blog" className="group">
            <div className="style4">
              <i className="fa-solid fa-comments"></i>
            </div>
            <span className="style1">Blog</span>
          </NavLink>
        </nav>
        <div></div>
      </header>
    </>
  );
}
