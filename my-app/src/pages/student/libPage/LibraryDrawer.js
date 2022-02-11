import * as React from "react";
import Box from "@mui/material/Box";
import Navbar from "../../../components/student/Navbar";
import UnstyledTabsCustomized from "../../../components/student/TabsList";

export default function LibraryDrawer() {
  return (
    <Box sx={{ display: "flex" }} mt={8}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <UnstyledTabsCustomized />
      </Box>
    </Box>
  );
}
