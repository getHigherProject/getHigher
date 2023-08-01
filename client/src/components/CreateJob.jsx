import 'react-quill/dist/quill.snow.css';

import {
	Box,
	Button,
	Divider,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Text,
	Textarea,
} from '@chakra-ui/react';
import { useController, useForm } from 'react-hook-form';

import { AiOutlinePlus } from 'react-icons/ai';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

const CreateJob = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = React.useState('outside');

	const defaultValues = {
		company: 'Netflix',
		company_id: 108,
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
		console.log(data);
	};

	return (
		<>
			<Button
				onClick={onOpen}
				leftIcon={<AiOutlinePlus />}
				colorScheme="messenger"
				variant="solid"
			>
				Add a Job
			</Button>
			<Modal isOpen={isOpen} scrollBehavior={scrollBehavior} onClose={onClose}>
				<ModalOverlay />
				<ModalContent minW="750px" padding="32px">
					<ModalHeader fontSize="32px">Add a Job</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={7}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl>
								<FormLabel>Company Name</FormLabel>
								<Input
									name="company"
									defaultValue={defaultValues.company}
									placeholder="Enter Company Name"
									{...register('company')}
								/>
							</FormControl>
							<FormControl mt={7}>
								<FormLabel>Job Title</FormLabel>
								<Input placeholder="Enter Job Title" {...register('title')} />
							</FormControl>

							<FormControl mt={7}>
								<FormLabel>Job Description</FormLabel>
								<Textarea
									name="description"
									placeholder="Enter a description"
									{...register('description')}
								/>{' '}
							</FormControl>
							<HStack mt={7}>
								<FormControl>
									<FormLabel htmlFor="experience">Experience</FormLabel>
									<Select
										id="owner"
										name="experience_id"
										defaultValue="1"
										{...register('experience_id')}
									>
										<option value="1">Entry Level</option>
										<option value="2">Mid Level</option>
										<option value="3">Senior</option>
									</Select>
								</FormControl>
								<FormControl>
									<FormLabel htmlFor="job_type_id">Job Type</FormLabel>
									<Select
										id="owner"
										name="job_type_id"
										defaultValue="1"
										{...register('job_type_id')}
									>
										<option value="1">Full - time</option>
										<option value="2">Part - time</option>
										<option value="3">Contractor</option>
										<option value="4">Temporary</option>
										<option value="5">Intern</option>
										<option value="6">Volunteer</option>
										<option value="7">Other</option>
									</Select>
								</FormControl>
							</HStack>
							<Box mt={7}>
								<FormLabel htmlFor="url">Application URL</FormLabel>
								<InputGroup>
									<InputLeftAddon>http://</InputLeftAddon>
									<Input
										type="url"
										id="url"
										name="application_url"
										placeholder="Please enter domain"
										{...register('application_url')}
									/>
								</InputGroup>
							</Box>
							<Box mt={10}>
								<FormLabel>Annual Salary</FormLabel>
								<Divider />
								<HStack>
									<FormControl mt={7}>
										<FormLabel>Minimum Salary</FormLabel>
										<NumberInput>
											<NumberInputField
												name="min_salary"
												{...register('min_salary')}
											/>
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									</FormControl>
									<FormControl mt={7}>
										<FormLabel>Maximum Salary</FormLabel>
										<NumberInput>
											<NumberInputField
												name="max_salary"
												{...register('max_salary')}
											/>
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									</FormControl>
								</HStack>
							</Box>
						</form>
					</ModalBody>

					<ModalFooter>
						<Button type="submit" colorScheme="messenger" mr={3}>
							Post Job
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateJob;
