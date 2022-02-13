import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import StarsIcon from "@mui/icons-material/Stars";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navLinkss: {
    color: "#ffffff",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function HomeNavbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <>
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
        <Link
          href="/student/signin"
          sx={{
            color: "#000000",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>Login as Student</MenuItem>
        </Link>
        <Link
          href="/admin/signin"
          sx={{
            color: "#000000",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>Login as Library</MenuItem>
        </Link>
      </Menu>
    </>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link
        href="/"
        sx={{
          color: "#000000",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        }}
      >
        <MenuItem>
          <Badge color="error">
            <HomeIcon />
          </Badge>

          <Typography ml={3}>Home</Typography>
        </MenuItem>
      </Link>
      <Link
        href="#aboutus"
        sx={{
          color: "#000000",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        }}
      >
        <MenuItem>
          <Badge color="error">
            <InfoIcon />
          </Badge>

          <Typography ml={3}>About us</Typography>
        </MenuItem>
      </Link>
      <Link
        href="#features"
        sx={{
          color: "#000000",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        }}
      >
        <MenuItem>
          <Badge color="error">
            <StarsIcon />
          </Badge>

          <Typography ml={3}>Features</Typography>
        </MenuItem>
      </Link>

      <MenuItem onClick={handleProfileMenuOpen}>
        <Badge color="error">
          <LockOpenIcon />
        </Badge>

        <Typography ml={3}>Login</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            href="/"
            sx={{
              color: "#ffffff",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: "block" } }}
            >
              Library Desk
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              href="/"
              sx={{
                color: "#ffffff",
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  marginRight: "25px",
                }}
              >
                Home
              </Typography>
            </Link>
            <Link
              href="#aboutus"
              sx={{
                color: "#ffffff",
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  marginRight: "25px",
                }}
              >
                About us
              </Typography>
            </Link>
            <Link
              href="#features"
              sx={{
                color: "#ffffff",
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  marginRight: "25px",
                }}
              >
                Features
              </Typography>
            </Link>
            <Typography
              onClick={handleProfileMenuOpen}
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            >
              Login
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
