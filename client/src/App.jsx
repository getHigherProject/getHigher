import ExperienceFilter from './containers/FilterContainer';
import JobsContainer from './containers/JobsContainer';
import React from 'react';

const App = () => {
	return (
		<>
			<JobsContainer />
			<ExperienceFilter />
		</>
	);
};

export default App;
