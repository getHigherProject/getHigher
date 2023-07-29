import React from 'react';
import { Flex } from '@chakra-ui/react'; 

import ExperienceFilter from './ExperienceFilter';
import WorkFilter from './WorkFilter';
import SalaryFilter from './SalaryFilter';

const FilterContainer = () => {
  return (
    <Flex direction="column" alignItems="center">
      <ExperienceFilter />
      <WorkFilter />
      <SalaryFilter />
    </Flex>
  );
};

export default FilterContainer;