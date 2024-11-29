import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: { xs: "auto", md: "100vh" },
        padding: { xs: "1rem", md: "2rem" },
        backgroundColor: "#f7f7f7", // Background color for the container
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: "1rem", md: "1rem 4rem" },
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          overflow: "hidden",
          height: { xs: "auto", md: "100%" },
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          bgcolor: "#ffffff", // Paper background should be white for clarity
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem 0",
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#1a1a1a", // Dark grey for heading text
            fontSize: "1.6rem", // Slightly larger for emphasis
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{ height: "80%", backgroundColor: "#ffffff" }} // Ensure table background remains white
          sx={{
            border: "none",
            // ".table-header": { bgcolor: "#f7f7f7", color: "black" },
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
              fontSize: "1rem",
            },
            "& .MuiDataGrid-row": {
              ":hover": {
                backgroundColor: "#e3f2fd", // Selected item blue shade on hover
              },
            },
            "& .MuiDataGrid-cell": {
              color: "#1a1a1a", // Dark grey for cell text
              fontSize: "0.95rem",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#f7f7f7", // Footer matches header style
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
