import React from "react";
import "./HomeSidebar.css";
import CloseIcon from "@mui/icons-material/Close";
import { SibebarContainer } from "./HomeSidebarComp";
import { Link } from "@mui/material";

function HomeSidebar({ isNavOpen, toggle }) {
  return (
    <>
      <SibebarContainer isNavOpen={isNavOpen} onClick={toggle}>
        <div className="homeSideIcon" onClick={toggle}>
          <CloseIcon className="sideBarIcon" />
        </div>
        <div className="homeSidebarWrapper">
          <ul className="homeSidebarMenu">
            <Link href="#" sx={{ textDecoration: "none" }}>
              <li className="homeSidebarLink"> Home</li>
            </Link>
            <Link href="#aboutus" sx={{ textDecoration: "none" }}>
              <li className="homeSidebarLink"> About Us</li>
            </Link>
            <Link href="#features" sx={{ textDecoration: "none" }}>
              <li className="homeSidebarLink"> Features</li>
            </Link>
            <Link href="#team" sx={{ textDecoration: "none" }}>
              <li className="homeSidebarLink"> Team Members</li>
            </Link>
          </ul>

          <div className="homeSidebarBtnWrapper">
            <Link href="/student/signin" sx={{ textDecoration: "none" }}>
              <div className="homeSidebarBtnWrapperLink">Login as Student</div>
            </Link>
            <Link href="/admin/signin" sx={{ textDecoration: "none" }}>
              <div className="homeSidebarBtnWrapperLink">Login as Library</div>
            </Link>
          </div>
        </div>
      </SibebarContainer>
    </>
  );
}

export default HomeSidebar;
