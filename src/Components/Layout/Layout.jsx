import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import CursorShadow from "../CursorShadow/CursorShadow";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <CursorShadow />
    </>
  );
}
