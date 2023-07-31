import { Box, Flex, HStack } from '@chakra-ui/react';

import ExperienceFilter from '../components/Filters/ExperienceFilter';
import React from 'react';
import SalaryFilter from '../components/Filters/SalaryFilter';
import SearchBar from '../components/SearchBar';
import WorkFilter from '../components/Filters/WorkFilter';

const FilterContainer = () => {
	return (
		<Box>
			<SearchBar />
			<HStack spacing="20px" paddingY="12px" borderBottom="gray">
				<ExperienceFilter />
				<WorkFilter />
				<SalaryFilter />
			</HStack>
		</Box>
	);
};

export default FilterContainer;
