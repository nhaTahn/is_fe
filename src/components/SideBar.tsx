import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom"; // For navigation

const Sidebar: React.FC = () => {
  const location = useLocation(); // Get the current URL location
  const [isDA, setIsDA] = useState(false);

  useEffect(() => {
    const daFlag = localStorage.getItem("isDA");
    setIsDA(daFlag === "true"); // or any truthy check depending on how you store it
  }, []);
  
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
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "90vh",
        borderTopStyle: "solid",
        borderWidth: "2px",
        alignItems: "flex-start",
        paddingTop: "20px",
      }}
    >
      {!isDA ? (
        <>
          <Button
            component={Link}
            to="/newEssay"
            variant="text"
            sx={{ mb: 2, borderRadius: "5px", p: "10px", width: "100%", ...isActive("/newEssay") }}
          >
            New Essay
          </Button>
          <Button
            component={Link}
            to="/drafts"
            variant="text"
            sx={{ mb: 2, borderRadius: "5px", p: "10px", width: "100%", ...isActive("/drafts") }}
          >
            Drafts
          </Button>
          <Button
            component={Link}
            to="/history"
            variant="text"
            sx={{ mb: 2, borderRadius: "5px", p: "10px", width: "100%", ...isActive("/history") }}
          >
            History
          </Button>
        </>
      ) : (
        <>
          <Button
            component={Link}
            to="/testmodel"
            variant="text"
            sx={{ mb: 2, borderRadius: "5px", p: "10px", width: "100%", ...isActive("/testmodel") }}
          >
            Test Models
          </Button>
          <Button
            component={Link}
            to="/train"
            variant="text"
            sx={{ mb: 2, borderRadius: "5px", p: "10px", width: "100%", ...isActive("/train") }}
          >
            Train
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            variant="text"
            sx={{ mb: 2, borderRadius: "5px", p: "10px", width: "100%", ...isActive("/dashboard") }}
          >
            Dashboard
          </Button>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
