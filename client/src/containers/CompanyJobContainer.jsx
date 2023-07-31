import { Box, Button, HStack, Heading, Spacer } from '@chakra-ui/react';

import { AiOutlinePlus } from 'react-icons/ai';
import CreateJobContainer from './CreateJobContainer';
import Job from '../components/Job';
import JobsContainer from './JobsContainer';
import React from 'react';

const CompanyJobContainer = () => {
	return (
		<>
			<Box w="100%" p="32px">
				<HStack>
					<Heading>Your Jobs</Heading>
					<Spacer />
					<CreateJobContainer />
				</HStack>
				<Box my="64px" px="136px">
					<Job />
				</Box>
			</Box>
		</>
	);
};

export default CompanyJobContainer;
