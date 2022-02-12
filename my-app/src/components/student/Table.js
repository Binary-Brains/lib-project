import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function DashboardTable({ rows, columns }) {
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        marginTop: "40px",
        "& .super-app-theme--header": {
          fontSize: "18px",
          color: "#9737D0",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
