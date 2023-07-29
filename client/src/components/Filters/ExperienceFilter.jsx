import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Checkbox,
  CheckboxGroup
} from '@chakra-ui/react';

import { BsChevronDown } from 'react-icons/bs';

export default function ExperienceFilter() {
  return (
    <Menu>
      <>
        <MenuButton as={Button} bg="white" color="black" rightIcon={<BsChevronDown />}>
          Experience
        </MenuButton>
        <MenuList>
          <CheckboxGroup colorScheme="blue">
            <MenuItem>
              <Checkbox value="entry">Entry level</Checkbox>
            </MenuItem>
            <MenuItem>
              <Checkbox value="mid">Mid level</Checkbox>
            </MenuItem>
            <MenuItem>
              <Checkbox value="senior">Senior</Checkbox>
            </MenuItem>
          </CheckboxGroup>
        </MenuList>
      </>
    </Menu>
  );
}
