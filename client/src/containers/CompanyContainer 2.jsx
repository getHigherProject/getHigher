import { Box } from '@chakra-ui/react';
import CompanyJobContainer from './CompanyJobContainer';
import CompanyNav from '../components/CompanyNav';
import CreateJobContainer from './CreateJobContainer';
import React from 'react';

const CompanyContainer = () => {
	return (
		<Box display="flex">
			<CompanyNav />
			<CompanyJobContainer />
		</Box>
	);
};

export default CompanyContainer;
