import { Box, Container, Image, Text } from '@chakra-ui/react';

import GroupImage from '../../public/Group.svg';
import MapImage from '../../public/map.png';
import React from 'react';

const Hero = () => {
	return (
		<>
			<Box
				bg="white"
				p={4}
				color="black"
				mx="auto"
				textAlign="center"
				display="flex"
				flexDirection="column"
				alignItems="center"
				maxW="1440px"
				alignContent="center"
				overflow="hidden"
			>
				<GroupImage />
				<Text fontSize="5xl" as="b" marginBottom="60px" maxW="650px">
					Access top open roles, you'll love, in your field
				</Text>
				<img src={MapImage} alt="Example" />
			</Box>
		</>
	);
};

export default Hero;
