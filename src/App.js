import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Components/Home";
import EaterySearch from './Components/EaterySearch';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/search/:Value" element={<EaterySearch />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;