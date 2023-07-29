import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import MapImage from '../../public/MapBase.svg';
import GroupImage from '../../public/Group.svg';

const Hero = () => {
  return (
    <>
      <Box
        bg="white"
        w="100%"
        p={4}
        color="black"
        alignContent="center"
        overflow="hidden"
      >
        <GroupImage />
        <Text fontSize="5xl" as="b">
          Access top open roles, you'll love, in your field
        </Text>
        <MapImage />
      </Box>
    </>
  );
};

export default Hero;
