import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	Heading,
	Spacer,
} from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

import React from 'react';
import { useState } from 'react';

const NavBar = () => {
	// get log in state
	// get logged in user or company name or info
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<div id="navbar">
			<Flex
				paddingX="10px"
				paddingY="5px"
				minWidth="max-content"
				marginY="auto"
				alignItems="center"
				gap="2"
				justifyContent={'center'}
			>
				<Box p="2">
					<Heading size="lg">getHighered</Heading>
				</Box>
				<Spacer />
				{loggedIn ? (
					<ButtonGroup>
						<Link to={'logout'}>
							<Button colorScheme="blue" variant="ghost">
								Log out
							</Button>
						</Link>
					</ButtonGroup>
				) : (
					<ButtonGroup gap="2">
						<Link to={'login'}>
							<Button colorScheme="gray" variant="messenger">
								Log in
							</Button>
						</Link>
						<Link to={'signupcompany'}>
							<Button variant="outline">Post a job</Button>
						</Link>
						<Link to={'signupuser'}>
							<Button colorScheme="messenger">Sign Up</Button>
						</Link>
					</ButtonGroup>
				)}
			</Flex>
		</div>
	);
};

export default NavBar;
