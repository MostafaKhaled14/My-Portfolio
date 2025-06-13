import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  function handleDarkMode() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <>
      <nav className={`p-2 fixed right-0 top-0 h-screen z-[9999]`}>
        <div className="flex flex-col h-full justify-between items-center py-3 px-1">
          <div onClick={() => handleDarkMode()} className="style3">
            <i className="fa-regular fa-moon"></i>
          </div>
          <div className="style2">
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
          </div>
          <div></div>
        </div>
      </nav>
    </>
  );
}
