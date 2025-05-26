/* eslint-disable no-unused-vars */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/Dashboard";
import My_List from "./pages/My_List";
import Series from "./pages/Series";
import Film from "./pages/Film";
import Profile from "./pages/Profile";
import Subscription from "./pages/PackageSubscription";
import Payment from "./components/Payment";
import PayFinish from "./components/PayFinish";
import VideoPage from "./pages/VideoPage";
import ListView from "./components/ListView";
import Add from "../store/redux/Add";
import Edit from "../store/redux/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/listview" element={<ListView />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<DashBoard />} />
        <Route path="/MyList" element={<My_List />} />
        <Route path="/series" element={<Series />} />
        <Route path="/film" element={<Film />} />
        <Route path="/VideoPage/:id" element={<VideoPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscription package" element={<Subscription />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payFinish" element={<PayFinish />} />
      </Routes>
    </Router>
  );
}

export default App;
