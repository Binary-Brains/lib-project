import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import FeedSharpIcon from "@mui/icons-material/FeedSharp";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import DashCard from "../../../components/student/DashCard";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import DashboardTable from "../../../components/student/Table";

const adminDashCards = [
  {
    desc: "Pending Requests",
    num: "40",
  },
  {
    desc: "Registered Students",
    num: "32",
  },
  {
    desc: "Added Books",
    num: "45",
  },
];

const pendingReq = [
  {
    "Student Name": "Sample Das",
    Accept: "Accept",
    Reject: "Reject",
  },
  {
    "Student Name": "Hello Das",
    Accept: "Accept",
    Reject: "Reject",
  },
];

export default function AdminDashboardDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const changeThePage = (url) => {};

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //uupdate this to just add a field in the drawer

  const drawerList = [
    {
      name: "Dashboard",
      icon: <DashboardSharpIcon></DashboardSharpIcon>,
      url: "/admin/dashboard",
    },
    {
      name: "My Feeds",
      icon: <FeedSharpIcon></FeedSharpIcon>,
      url: "/admin/feed",
    },
    {
      name: "Add a New Book",
      icon: <LocalLibraryIcon></LocalLibraryIcon>,
      url: "/admin/addbook",
    },
    {
      name: "Settings",
      icon: <SettingsApplicationsSharpIcon></SettingsApplicationsSharpIcon>,
      url: "/student/setting",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
        <DashCard data={adminDashCards} />
        <DashboardTable data={pendingReq} />
      </Box>
    </Box>
  );
}
