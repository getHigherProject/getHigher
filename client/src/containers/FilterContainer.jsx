import {
	Button,
	ChevronDownIcon,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from '@chakra-ui/react';

import React from 'react';

export default function ExperienceFilter() {
	return (
		<Menu>
			<>
				<MenuButton as={Button}>Work</MenuButton>
				<MenuList>
					<MenuItem>Download</MenuItem>
					<MenuItem>Create a Copy</MenuItem>
				</MenuList>
			</>
		</Menu>
	);
}
