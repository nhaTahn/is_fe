import React from "react";
import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom"; // For navigation

const Sidebar: React.FC = () => {
  const location = useLocation(); // Get the current URL location
  
  // Helper function to determine if the link is active
  const isActive = (path: string) => {
    return location.pathname === path ? { backgroundColor: "#6f7bd8", color: "#fff" } : {};
  };
  // Render the Sidebar only if the user is logged in
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "90vh",
        borderTopStyle: "solid",
        borderWidth: "2px",
        alignItems: "flex-start",
        paddingTop: "20px", // Adjusted padding to bring buttons closer to the top
      }}
    >
       <Button
        component={Link}
        to="/newEssay"
        variant="text"
        sx={{
          marginBottom: "16px",
          borderRadius: "5px",
          padding: "10px",
          ...isActive("/newEssay"), // Highlight if active
        }}
      >
        New Essay
      </Button>

      <Button
        component={Link}
        to="/drafts"
        variant="text"
        sx={{
          marginBottom: "16px",
          borderRadius: "5px",
          padding: "10px",
          ...isActive("/drafts"), // Highlight if active
        }}
      >
        Drafts
      </Button>

       <Button
        component={Link}
        to="/history"
        variant="text"
        sx={{
          marginBottom: "16px",
          borderRadius: "5px",
          padding: "10px",
          ...isActive("/history"), // Highlight if active
        }}
      >
        History
      </Button>


      <Button
        component={Link}
        to="/testmodel"
        variant="text"
        sx={{
          marginBottom: "16px",
          borderRadius: "5px",
          padding: "10px",
          ...isActive("/testmodel"), // Highlight if active
        }}
      >
        Test Models
      </Button>


      <Button
        component={Link}
        to="/train"
        variant="text"
        sx={{
          marginBottom: "16px",
          borderRadius: "5px",
          padding: "10px",
          ...isActive("/train"), // Highlight if active
        }}
      >
        Train
      </Button>

      <Button
        component={Link}
        to="/dashboard"
        variant="text"
        sx={{
          marginBottom: "16px",
          borderRadius: "5px",
          padding: "10px",
          ...isActive("/dashboard"), // Highlight if active
        }}
      >
        Dashboard
      </Button>
    </Box>
  );
};

export default Sidebar;
