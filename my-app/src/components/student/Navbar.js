import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import { Grid, Link } from "@mui/material";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import FeedSharpIcon from "@mui/icons-material/FeedSharp";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
// import StudentPage from "../../pages/admin/studentPage/StudentPage";
import { StudentLogout } from "../../actions/student/auth";
import { useLocation } from "wouter";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// const useStyles = makeStyles((theme) => ({
//   form: {
//     width: "60%",
//     margin: "auto",
//     // ["@media (max-width:600px)"]: {
//     //   width: "100%",
//     // },
//   },
//   avatar: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// }));

export default function Navbar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const classes = useStyles();
  const [location, setLocation] = useLocation();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  console.log(location);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  //uupdate this to just add a field in the drawer
  const logout = () => {
    const res = window.confirm("Are you sure?");
    if (res) dispatch(StudentLogout());
  };

  const drawerList = [
    {
      name: "Dashboard",
      icon: <DashboardSharpIcon></DashboardSharpIcon>,
      url: "/student/dashboard",
    },
    {
      name: "My Feeds",
      icon: <FeedSharpIcon></FeedSharpIcon>,
      url: "/student/feed",
    },
    {
      name: "Library",
      icon: <LocalLibraryIcon></LocalLibraryIcon>,
      url: "/student/library",
    },
    {
      name: "Settings",
      icon: <SettingsApplicationsSharpIcon></SettingsApplicationsSharpIcon>,
      url: "/student/setting",
    },
    {
      name: "Logout",
      icon: <LogoutIcon></LogoutIcon>,
      url: "/student/signin",
      onClickFunc: logout,
    },
    // {
    //   name: "About Us",
    //   icon: <LocalLibraryIcon></LocalLibraryIcon>,
    //   url: "/student/aboutus",
    // },
  ];

  // const NotLoginList = [
  //   {
  //     name: "Login",
  //     icon: <DashboardSharpIcon></DashboardSharpIcon>,
  //     url: "/student/signin",
  //   },
  //   {
  //     name: "Signup",
  //     icon: <FeedSharpIcon></FeedSharpIcon>,
  //     url: "/student/signup",
  //   },
  //   {
  //     name: "About Us",
  //     icon: <LocalLibraryIcon></LocalLibraryIcon>,
  //     url: "/student/aboutus",
  //   },
  // ];

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
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

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
      <Link
        onClick={() => setLocation("/student/dashboard")}
        sx={{ textDecoration: "none" }}
      >
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>
      <Link
        onClick={() => setLocation("/student/setting")}
        sx={{ textDecoration: "none" }}
      >
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      </Link>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid
            container
            spacing={{ xs: 5, md: 3 }}
            columns={{ xs: 4, sm: 4, md: 12 }}
          >
            <Grid item xs={0} sm={0} md={10}>
              <Typography variant="h5" noWrap component="div">
                <b>Library Desk</b>
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerList.map(({ name, icon, url, onClickFunc }, index) => (
            <Link
              onClick={(e) => {
                e.preventDefault();
                setLocation(url);
                onClickFunc && onClickFunc();
              }}
              underline="none"
            >
              <ListItem button key={name}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
