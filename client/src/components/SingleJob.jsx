import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';

import { BsCurrencyDollar } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import Newsletter from './Newsletter';
import React from 'react';

const SingleJob = () => {
	return (
		<>
			<Box bg="blue.500" py="90px" mx="auto">
				<VStack color="white" alignItems="left" maxW="1110px" mx="auto">
					<Box>
						<Text fontSize="48px" fontWeight="bold">
							Software Engineer
						</Text>
					</Box>
					<HStack>
						<Text fontSize="18px" fontWeight="md" s>
							Netflix
						</Text>
						<Box display="flex" alignItems="center">
							<IoLocationOutline />
							<Text>San Francisco</Text>
						</Box>
						<Box display="flex" alignItems="center">
							<BsCurrencyDollar />
							<Text>80K</Text>
							<Text>-</Text>
							<Text>120K</Text>
							<Text>USD</Text>
						</Box>
					</HStack>
				</VStack>
			</Box>
			<HStack gap="78px" alignItems="top" my="90px" maxW="1200px" mx="auto">
				<Box mx="auto" maxW="640px">
					<Text>
						The Senior Producer is directly responsible for ensuring the team is
						delivering all work product at maximum velocity, to the highest
						quality and in line with the standards of the project/company. The
						Senior Producer will work across disciplines to help define goals
						for the project. Essential Functions/Responsibilities Lead multiple
						teams within a project to drive vision and execution to the highest
						degree of quality and predictability Work with product leads,
						producers, and stake holders to define goals and vision for a
						project Ensure team(s) have visibility on all tasks deadlines, and
						work with other leads, producers, teams to achieve desired results
						Manage teams to deliver on all set, goals, features, and product
						requirements to the highest possible quality within the allotted
						schedule Implement best practices for scheduling, dev methodologies,
						and tool set to ensure quality results Own deliverables and
						initiatives with acute attention to craft and detail Identify and
						recommend new tools and technologies to improve production Keep team
						and leadership updated on project status, changes, and larger
						picture Partner with other leads to help manage team members on an
						individual basis, providing guidance and performance management as
						needed Responsible for making sure the team is healthy and
						functioning as a cohesive unit Act decisively to remove roadblocks
						and smooth out interdisciplinary issues, facilitate collaboration
						among teams Partner with all stakeholders to gain alignment on
						outcomes and work product for the groups that fall under your prevue
						Exemplify reliability, accountability, and professionalism in all
						work-related interactions Skills and Abilities Ability to lead
						multiple teams or large portions of a product effectively Excellent
						written and verbal communication skills Highly organized and can
						help organize others Proven leadership and collaboration skills Able
						to implement drive more effective workflows for teams Ability to
						work in a highly collaborative environment Able to manage multiple,
						competing tasks and be self-directed in a quickly evolving
						environment and meet deadlines with little direction Education and
					</Text>
					<Button w="100%" colorScheme="messenger" py="20px" marginTop="40px">
						Apply Now
					</Button>
				</Box>
				<Newsletter />
			</HStack>
		</>
	);
};

export default SingleJob;
