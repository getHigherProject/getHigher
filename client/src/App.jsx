import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import LoginContainer from './containers/LoginContainer';
import NoPage from './components/NoPage';
import React from 'react';
import SignUpCompanyContainer from './containers/SignUpCompanyContainer';
import SignUpUserContainer from './containers/SignUpUserContainer';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/" element={<Home />} />        
        <Route path="/signupcompany" element={<SignUpCompanyContainer />} />
        <Route path="/signupuser" element={<SignUpUserContainer />} />
        <Route path="/*" element={<NoPage />} />      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
