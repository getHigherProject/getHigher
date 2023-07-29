import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import LoginContainer from './containers/LoginContainer';
import SignUpCompanyContainer from './containers/SignUpCompanyContainer';
import SignUpUserContainer from './containers/SignUpUserContainer';
import NoPage from './components/NoPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<LoginContainer />} />
          <Route path="signupcompany" element={<SignUpCompanyContainer />} />
          <Route path="signupuser" element={<SignUpUserContainer />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
