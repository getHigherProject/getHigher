import { Box } from '@chakra-ui/react';
import CompanyJobContainer from './CompanyJobContainer';
import CompanyNav from '../components/CompanyNav';
import CreateJobContainer from './CreateJobContainer';
import React from 'react';

const CompanyContainer = () => {
	return (
		<Box display="flex">
			<Box position="fixed" top="0" left="0" bottom="0">
				<CompanyNav />
			</Box>
			<Box marginLeft="250px" width="100%">
				<CompanyJobContainer />
			</Box>
		</Box>
	);
};

export default CompanyContainer;
