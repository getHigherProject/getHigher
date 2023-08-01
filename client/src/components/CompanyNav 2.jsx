import {
	Avatar,
	Box,
	Divider,
	Flex,
	Heading,
	IconButton,
	Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function Sidebar() {
	const [navSize, changeNavSize] = useState('large');
	return (
		<Flex
			pos="sticky"
			h="100vh"
			bg="blue.900"
			paddingTop="28px"
			px="20px"
			color="white"
			boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
			minW="200px"
			maxW="200px"
			flexDir="column"
			justifyContent="space-between"
		>
			<Box p="2">
				<Heading fontSize="24px">getHighered</Heading>
			</Box>

			<Flex p="5%" flexDir="column" w="100%" mb={4}>
				<Divider display={navSize == 'small' ? 'none' : 'flex'} />
				<Flex mt={4} align="center">
					<Avatar size="sm" src="avatar-1.jpg" />
					<Flex
						flexDir="column"
						ml={4}
						display={navSize == 'small' ? 'none' : 'flex'}
					>
						<Heading as="h3" size="sm">
							Codesmith
						</Heading>
						<Text>Admin</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
