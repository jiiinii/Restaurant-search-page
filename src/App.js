import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import EaterySearch from './components/EaterySearch';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  console.log(`here?`);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/search" element={<EaterySearch />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;