import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';

import React from 'react';

const Newsletter = () => {
	return (
		<VStack
			paddingX="24px"
			borderRadius="24px"
			py="22px"
			bg="blue.600"
			maxW="360px"
			color="white"
			alignItems="left"
			maxH="280px"
		>
			<Text fontSize="xl" fontWeight="semibold" marginTop="20px">
				Get Notified
			</Text>
			<Text fontSize="16px">
				Be the first to apply. Receive an email whenever similar jobs are posted
			</Text>
			<Input bg="white" placeholder="Enter your email address" size="lg" />
			<Button width={'100%'} size="lg" colorScheme="gray">
				Notify Me
			</Button>
		</VStack>
	);
};

export default Newsletter;
