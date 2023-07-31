import { Box, Container, HStack, VStack } from '@chakra-ui/react';

import FilterContainer from './FilterContainer';
import Job from '../components/Job';
import { Link } from 'react-router-dom';
import Newsletter from '../components/Newsletter';
import React from 'react';

const JobsContainer = () => {
	return (
		<>
			<Container maxW="1300px">
				<FilterContainer />
				<HStack gap="78px" my="56px" alignItems="top">
					<VStack spacing="24px">
						<Job />
					</VStack>
					<Newsletter />
				</HStack>
			</Container>
		</>
	);
};

export default JobsContainer;
