import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

import CompanyContainer from './containers/CompanyContainer';
import Home from './containers/Home';
import LoginContainer from './containers/LoginContainer';
import NavBar from './components/NavBar';
import NoPage from './components/NoPage';
import SignUpCompanyContainer from './containers/SignUpCompanyContainer';
import SignUpUserContainer from './containers/SignUpUserContainer';
import SingleJob from './components/SingleJob';
import SingleJobContainer from './containers/SingleJobContainer';
import { jobStore } from './stores/jobStore';

const App = () => {
	const location = useLocation();
	const hideNavBar = location.pathname === '/company';
	return (
		<>
			{!hideNavBar && <NavBar />}
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/jobs/:id" element={<SingleJobContainer />}></Route>

				<Route path="/company" element={<CompanyContainer />} />
				<Route path="login" element={<LoginContainer />} />
				<Route path="signupcompany" element={<SignUpCompanyContainer />} />
				<Route path="signupuser" element={<SignUpUserContainer />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</>
	);
};

export default App;
