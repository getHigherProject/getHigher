import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';

import React from 'react';

const Newsletter = () => {
	return (
		<VStack
			paddingX="24px"
			borderRadius="24px"
			py="22px"
			bg="gray.300"
			maxW="360px"
			alignItems="left"
		>
			<Text fontSize="xl" fontWeight="semibold" marginTop="20px">
				Get Notified
			</Text>
			<Text fontSize="16px">
				Be the first to apply. Receive an email whenever similar jobs are posted
			</Text>
			<Input placeholder="Enter your email address" size="lg" />
			<Button width={'100%'} size="lg" colorScheme="gray">
				Notify Me
			</Button>
		</VStack>
	);
};

export default Newsletter;
