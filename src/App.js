import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import EaterySearch from "./Components/EaterySearch";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  console.log(`currentPath >>> `, currentPath);

  const updateURL = (path) => {
    window.history.pushState("", "", `/search/:${path}`);
    const urlChange = new CustomEvent("urlchange", {});
    console.log(`urlChange >>> `, urlChange);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<EaterySearch />} />
        <Route path="/search/:result" element={<EaterySearch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
