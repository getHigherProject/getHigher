import { Box, Container, HStack, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import FilterContainer from './FilterContainer';
import Job from '../components/Job';
import { Link } from 'react-router-dom';
import Newsletter from '../components/Newsletter';
import jobStore from '../stores/jobStore';

const JobsContainer = () => {
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
			<Container maxW="1300px">
				<FilterContainer />
				<HStack gap="78px" my="56px" alignItems="top">
					<VStack spacing="24px">
						{store.jobs.map((job) => {
							return (
								<Link key={job._id} to={`jobs/${job._id}`}>
									<Job job={job} key={job._id} />
								</Link>
							);
						})}
					</VStack>
					<Newsletter />
				</HStack>
			</Container>
		</>
	);
};

export default JobsContainer;
