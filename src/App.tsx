import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import NewEssayPage from "./pages/NewEssayPage";
import HeaderComponents from "./components/HeaderComponent"; 
import Sidebar from "./components/SideBar";
import "./styles/App.css";
import { Grid } from "@mui/material";
import HistoryPage from "./pages/User/HistoryPage";
import DraftsPage from "./pages/User/DraftPage";
import TestModel from "./pages/DataAnalysis/TestModel";
import TrainPage from "./pages/DataAnalysis/TrainPage";
import Dashboard from "./pages/DataAnalysis/Dashboard";

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  // Use useEffect to read sessionStorage when the component mounts
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("user");
    setUserName(storedUserName); // Set the username state
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: React.FC = () => {
  const location = useLocation();

  // Determine if Sidebar should be rendered (exclude signin and signup pages)
  const renderSidebar = !["/signin", "/signup", "/"].includes(location.pathname);

  return (
    <>
      <HeaderComponents />
      <Grid container spacing={2}>
        {renderSidebar && (
          <Grid size={2}>
            <Sidebar />
          </Grid>
        )}
    
        {/* Main Content */}
        <Grid size={renderSidebar ? 10 : 12}>
          <Routes>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/newEssay" element={<NewEssayPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/drafts" element={<DraftsPage />} />
            <Route path="/testmodel" element={<TestModel />} />
            <Route path="/train" element={<TrainPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
