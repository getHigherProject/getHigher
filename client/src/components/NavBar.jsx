import React from 'react';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  Button,
  Heading,
  Flex,
  Box,
  Spacer,
  ButtonGroup,
} from '@chakra-ui/react';

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
        alignItems="center"
        gap="2"
      >
        <Box p="2">
          <Heading size="lg">getHigher</Heading>
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
            <Link to={'signupcompany'}>
              <Button variant="messenger">sign up as an employer</Button>
            </Link>
            <Link to={'signupuser'}>
              <Button colorScheme="messenger">Sign Up</Button>
            </Link>
            <Link to={'login'}>
              <Button colorScheme="gray" variant="outline">
                Log in
              </Button>
            </Link>
          </ButtonGroup>
        )}
      </Flex>
    </div>
  );
};

export default NavBar;
