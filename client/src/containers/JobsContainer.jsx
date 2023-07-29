import { Box, Container, HStack } from '@chakra-ui/react';

import Job from '../components/Job';
import Newsletter from '../components/Newsletter';
import React from 'react';

const JobsContainer = () => {
	return (
		<>
			<Container maxW="1300px">
				<HStack gap="78px">
					<Job />
					<Newsletter />
				</HStack>
			</Container>
		</>
	);
};

export default JobsContainer;
