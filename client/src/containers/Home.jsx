import Hero from '../components/Hero';
import JobsContainer from './JobsContainer';
import NavBar from '../components/NavBar';
import React from 'react';

const Home = () => {
	return (
		<div>
			<Hero />
			<JobsContainer />
		</div>
	);
};

export default Home;
