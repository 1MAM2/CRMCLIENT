import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import CampaignsPage from "./Pages/CampaignsPage";
import Reminder from "./Pages/Reminder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-campaign" element={<CampaignsPage />} />
        <Route path="/reminder" element={<Reminder />} />
      </Routes>
    </>
  );
}

export default App;
