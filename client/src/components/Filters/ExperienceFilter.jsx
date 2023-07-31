import {
	Button,
	Checkbox,
	CheckboxGroup,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';

import { BsChevronDown } from 'react-icons/bs';
import React from 'react';

export default function ExperienceFilter() {
	return (
		<Menu>
			<>
				<MenuButton
					as={Button}
					variant="outline"
					bg="white"
					color="black"
					fontSize="16px"
					rightIcon={<BsChevronDown />}
				>
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
