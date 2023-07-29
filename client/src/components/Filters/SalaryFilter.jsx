import React, { useState } from 'react';
import { Menu, MenuButton, MenuList, Button, Box } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/react';

const SalaryFilter = () => {
  const [salaryRange, setSalaryRange] = useState([0, 200000]);

  const handleSliderChange = (values) => {
    setSalaryRange(values);
  };

  return (
    <Menu>
      <>
        <MenuButton as={Button} bg="white" color="black" rightIcon={<BsChevronDown />}>
          Salary
        </MenuButton>
        <MenuList>
          <Box textAlign="center" my={2}>
            United States Dollar
          </Box>
          <Box display="flex" justifyContent="space-between" mx={4}>
            <Box>{`$${salaryRange[0].toFixed(0)}`}</Box>
            <Box>{`$${salaryRange[1].toFixed(0)}`}</Box>
          </Box>
          <RangeSlider
            aria-label={['min', 'max']}
            defaultValue={salaryRange}
            step={1000}
            min={0}
            max={200000}
            onChange={handleSliderChange}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </MenuList>
      </>
    </Menu>
  );
};

export default SalaryFilter;
