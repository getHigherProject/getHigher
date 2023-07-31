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

const WorkFilter = () => {
	return (
		<Menu>
			<>
				<MenuButton
					as={Button}
					variant="outline"
					bg="white"
					color="black"
					rightIcon={<BsChevronDown />}
				>
					Type of work
				</MenuButton>
				<MenuList>
					<CheckboxGroup colorScheme="blue">
						<MenuItem>
							<Checkbox value="fullTime">Full-time</Checkbox>
						</MenuItem>
						<MenuItem>
							<Checkbox value="partTime">Part-time</Checkbox>
						</MenuItem>
						<MenuItem>
							<Checkbox value="contractor">Contractor</Checkbox>
						</MenuItem>
						<MenuItem>
							<Checkbox value="temporary">Temporary</Checkbox>
						</MenuItem>
						<MenuItem>
							<Checkbox value="intern">Intern</Checkbox>
						</MenuItem>
						<MenuItem>
							<Checkbox value="volunteer">Volunteer</Checkbox>
						</MenuItem>
						<MenuItem>
							<Checkbox value="other">Other</Checkbox>
						</MenuItem>
					</CheckboxGroup>
				</MenuList>
			</>
		</Menu>
	);
};

export default WorkFilter;
