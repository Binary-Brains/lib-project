import React from "react";
import "./HomeNav.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Menu, MenuItem } from "@mui/material";

function HomeNav({ toggle }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  console.log(mobileMoreAnchorEl)
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link href="/student/signin" sx={{ textDecoration: "none" }}>
        <MenuItem onClick={handleMenuClose}>Login as Student</MenuItem>
      </Link>
      <Link href="/admin/signin" sx={{ textDecoration: "none" }}>
        <MenuItem onClick={handleMenuClose}>Login as Library</MenuItem>
      </Link>
    </Menu>
  );

  return (
    <>
      <nav className="homeNav">
        <div className="homeNavCont">
          <div className="homeNavLogo" to="/">
            Library Desk
          </div>
          <div className="homeNavMobileView" onClick={toggle}>
            <MenuIcon />
          </div>
          <div className="homeNavMenu">
            <div className="homeNavItem">
              <Link href="#" sx={{ textDecoration: "none" }}>
                <div className="homeNavLink">HOME</div>
              </Link>
            </div>
            <div className="homeNavItem">
              <Link href="#aboutus" sx={{ textDecoration: "none" }}>
                <div className="homeNavLink">ABOUT US</div>
              </Link>
            </div>
            <div className="homeNavItem">
              <Link href="#features" sx={{ textDecoration: "none" }}>
                <div className="homeNavLink">FEATURES</div>
              </Link>
            </div>
            <div className="homeNavItem">
              <Link href="#team" sx={{ textDecoration: "none" }}>
                <div className="homeNavLink">TEAM MEMBERS</div>
              </Link>
            </div>
          </div>
          <div className="homeNavBtn">
            <div className="homeNavBtnLink" onClick={handleProfileMenuOpen}>
              Login
            </div>
          </div>
        </div>
        {renderMenu}
      </nav>
    </>
  );
}

export default HomeNav;
