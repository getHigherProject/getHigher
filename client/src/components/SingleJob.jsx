import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { BsCurrencyDollar } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import Newsletter from './Newsletter';
import React from 'react';

const SingleJob = ({ job }) => {
	const { id } = useParams();
	return (
		<>
			<Box bg="blue.800" py="90px" mx="auto">
				<VStack color="white" alignItems="left" maxW="1110px" mx="auto">
					<Box>
						<Text fontSize="48px" fontWeight="bold">
							{job.title}
						</Text>
					</Box>
					<HStack>
						<Text fontSize="18px" fontWeight="md" s>
							{job.company}
						</Text>
						<Box display="flex" alignItems="center">
							<IoLocationOutline />
							<Text>San Francisco</Text>
						</Box>
						<Box display="flex" alignItems="center">
							<BsCurrencyDollar />
							<Text>{job.min_salary}K</Text>
							<Text>-</Text>
							<Text>{job.max_salary}K</Text>
							<Text>USD</Text>
						</Box>
					</HStack>
				</VStack>
			</Box>
			<HStack gap="78px" alignItems="top" my="90px" maxW="1200px" mx="auto">
				<Box mx="auto" maxW="640px">
					<Text>{job.description}</Text>

					<Button
						as="a"
						href={job.application_url}
						w="100%"
						colorScheme="messenger"
						py="20px"
						marginTop="40px"
					>
						Apply Now
					</Button>
				</Box>
				<Newsletter />
			</HStack>
		</>
	);
};

export default SingleJob;
