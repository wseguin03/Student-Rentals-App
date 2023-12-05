import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPageComponent from './components/LandingPageComponent';
import HeaderComponent from './components/HeaderComponent';
import ShowingComponent from './components/ShowingComponent';
import LoginComponent from './components/LoginComponent';
import MessageComponent from './components/MessageComponent';
import RegisterComponent from './components/RegisterComponent';
function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<LandingPageComponent />} />
        <Route path="/showing" element={<ShowingComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />

        <Route path = '/message' element = {<MessageComponent/>}/>
        <Route path="/message/:propertyID" element={<MessageComponent/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;