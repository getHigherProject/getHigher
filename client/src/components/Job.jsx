import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';

import { IoLocationOutline } from 'react-icons/io5';
import React from 'react';

const Job = () => {
	return (
		<>
			<HStack>
				<Box>
					<Avatar
						size="lg"
						name="Prosper Otemuyiwa"
						src="https://bit.ly/prosper-baba"
					/>
				</Box>
				<Box>
					<VStack>
						<Text>Software Engineer</Text>
						<Box>
							<Text>Netflix</Text>
							<Box>
								<IoLocationOutline />
								<Text>San Francisco</Text>
							</Box>
						</Box>
					</VStack>
				</Box>
			</HStack>
		</>
	);
};

export default Job;
