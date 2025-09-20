import React from "react";
import logo from "../assets/book-logo.png";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Header = ({ onAdd }) => {
  const navigate = useNavigate();
  function handleAddBook() {
    onAdd();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{bgcolor: "white", color:"black"}}>
        <Toolbar
          sx={{
            m: 0,
            py: 2,
            px: { xs: 1, sm: 2, md: 3, lg: 4 },
            mx: { xs: 0, sm: 2, md: 3, lg: 7.5 },
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <img
            src={logo}
            style={{ width: 100, cursor: "pointer" }}
            alt="Library Logo"
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h5"
            className="header-poppins"
            sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" } }}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Library Management
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{ fontWeight: "italic", cursor: "pointer" }}
              onClick={() => navigate("/about")}
            >
              About
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                px: { xs: 1, sm: 2, md: 3 },
              }}
              onClick={handleAddBook}
            >
              + Add Book
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
