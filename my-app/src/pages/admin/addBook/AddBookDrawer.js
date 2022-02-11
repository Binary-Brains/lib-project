import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminNavbar from "../../../components/admin/AdminNavbar";

export default function MiniDrawerDash() {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
        <Typography
          variant="body1"
          color="textPrimary"
          align="center"
          fontSize={25}
        >
          Please add the list of books
        </Typography>

        <Typography variant="body1" color="textPrimary" align="center" mt={2}>
          <Link href="/admin/addbook/createbook">
            <Button type="submit" variant="contained" color="primary">
              <AddIcon /> Add Book
            </Button>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
