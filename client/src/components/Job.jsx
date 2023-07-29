import {
	Avatar,
	Badge,
	Box,
	HStack,
	Spacer,
	Text,
	VStack,
} from '@chakra-ui/react';

import { BsCurrencyDollar } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import React from 'react';

const Job = () => {
	return (
		<>
			<Box
				border="1px"
				borderColor="gray.300"
				padding="32px"
				borderRadius="24px"
				maxW="850px"
			>
				<HStack spacing="24px">
					<Box>
						<Avatar
							size="xl"
							name="Prosper Otemuyiwa"
							src="https://bit.ly/prosper-baba"
						/>
					</Box>
					<Box minW="650px">
						<VStack alignItems="left" spacing="12px">
							<Box
								display="flex"
								alignItems="center"
								justifyItems="space-between"
							>
								<Text
									fontSize="24px"
									fontWeight="bold"
									justifyContent="space-between"
								>
									Software Engineer
								</Text>
								<Spacer />
								<Text fontSize="16px" fontStyle="italic">
									6 hours ago
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
						<Box marginTop="32px">
							<Badge
								textTransform="capitalize"
								colorScheme="red"
								py="4px"
								px="12px"
								fontSize="14px"
								borderRadius="23px"
								marginRight="10px"
							>
								Hybrid
							</Badge>
							<Badge
								textTransform="capitalize"
								colorScheme="yellow"
								fontSize="14px"
								py="4px"
								px="12px"
								borderRadius="23px"
							>
								Senior
							</Badge>
						</Box>
					</Box>
				</HStack>
			</Box>
		</>
	);
};

export default Job;
