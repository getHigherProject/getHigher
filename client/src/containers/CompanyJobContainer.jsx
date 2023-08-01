import { Box, HStack, Heading, Spacer, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import CreateJob from '../components/CreateJob';
import CreateJobContainer from './CreateJobContainer';
import Job from '../components/Job';
import JobsContainer from './JobsContainer';
import { Link } from 'react-router-dom';
import jobStore from '../stores/jobStore';

const CompanyJobContainer = () => {
	const store = jobStore();

	useEffect(() => {
		store.fetchJobs();
	}, []);

	if (store.error) {
		return <div>Error: {store.error.message}</div>;
	}

	if (store.jobs === null) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Box w="100%" p="32px">
				<HStack>
					<Heading>Your Jobs</Heading>
					<Spacer />
					<CreateJob />
				</HStack>
				<Box my="64px" px="136px">
					<VStack spacing="24px">
						{store.jobs.map((job) => {
							return (
								<Link key={job._id} to={`jobs/${job._id}`}>
									<Job job={job} key={job._id} />
								</Link>
							);
						})}
					</VStack>
				</Box>
			</Box>
		</>
	);
};

export default CompanyJobContainer;
