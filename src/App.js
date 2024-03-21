import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  console.log(`here?`);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<eaterySearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;