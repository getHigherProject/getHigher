import {
	Avatar,
	Badge,
	Box,
	HStack,
	Spacer,
	Text,
	VStack,
} from '@chakra-ui/react';

import { BsCurrencyDollar } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import React from 'react';
import netflix from '../../public/netflix.png';

const Job = ({ job }) => {
	function timePast(curr, prev) {
		// Define the milliseconds in every time unit
		const msMin = 60 * 1000;
		const msHr = msMin * 60;
		const msDay = msHr * 24;
		const msMonth = msDay * 30;
		const msYr = msDay * 365;

		// Get elapsed time in milliseconds
		const elapsed = curr - prev;

		if (elapsed < msMin) {
			return Math.round(elapsed / 1000) + ' seconds ago';
		} else if (elapsed < msHr) {
			const elapsedMinutes = Math.round(elapsed / msMin);
			return elapsedMinutes === 1
				? elapsedMinutes + ' minute ago'
				: elapsedMinutes + ' minutes ago';
		} else if (elapsed < msDay) {
			const elapsedHours = Math.round(elapsed / msHr);
			return elapsedHours === 1
				? elapsedHours + ' hour ago'
				: elapsedHours + ' hours ago';
		} else if (elapsed < msMonth) {
			const elapsedDays = Math.round(elapsed / msDay);
			return elapsedDays === 1
				? elapsedDays + ' day ago'
				: elapsedDays + ' days ago';
		} else if (elapsed < msYr) {
			const elapsedMonths = Math.round(elapsed / msMonth);
			return elapsedMonths === 1
				? elapsedMonths + ' month ago'
				: elapsedMonths + ' months ago';
		} else {
			const elapsedYears = Math.round(elapsed / msYr);
			return elapsedYears === 1
				? elapsedYears + ' year ago'
				: elapsedYears + ' years ago';
		}
	}

	const createdOn = (created_on) => {
		const now = new Date();
		const parsedTime = Date.parse(created_on);
		return timePast(now, new Date(parsedTime));
	};

	return (
		<>
			<Box
				border="1px"
				borderColor="gray.300"
				padding="32px"
				borderRadius="24px"
				minW="850px"
				maxW="1000px"
			>
				<HStack spacing="24px">
					<Box>
						<Avatar size="xl" name="Prosper Otemuyiwa" src={netflix} />
					</Box>
					<Box w="100%">
						<VStack alignItems="left" spacing="12px" w="100%">
							<Box
								display="flex"
								alignItems="center"
								justifyItems="space-between"
							>
								<Text
									fontSize="24px"
									fontWeight="bold"
									justifyContent="space-between"
								>
									{job.title}
								</Text>
								<Spacer />
								<Text fontSize="16px" fontStyle="italic">
									{createdOn(job.created_on)}
								</Text>
							</Box>

							<HStack>
								<Text fontSize="18px" fontWeight="md" s>
									{job.company}
								</Text>
								<Box display="flex" alignItems="center">
									<IoLocationOutline />
									<Text>San Francisco</Text>
								</Box>
								<Box display="flex" alignItems="center">
									<BsCurrencyDollar />
									<Text>{job.min_salary}K</Text>
									<Text>-</Text>
									<Text>{job.max_salary}K</Text>
									<Text>USD</Text>
								</Box>
							</HStack>
						</VStack>
						<Box marginTop="32px">
							<Badge
								textTransform="capitalize"
								colorScheme="red"
								py="4px"
								px="12px"
								fontSize="14px"
								borderRadius="23px"
								marginRight="10px"
							>
								{job.experience}
							</Badge>
							<Badge
								textTransform="capitalize"
								colorScheme="yellow"
								fontSize="14px"
								py="4px"
								px="12px"
								borderRadius="23px"
							>
								{job.job_type}
							</Badge>
						</Box>
					</Box>
				</HStack>
			</Box>
		</>
	);
};

export default Job;
