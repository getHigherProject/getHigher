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
	Text,
} from '@chakra-ui/react';

import { AiOutlinePlus } from 'react-icons/ai';
import React from 'react';
import ReactQuill from 'react-quill';
import { useDisclosure } from '@chakra-ui/react';

const CreateJob = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = React.useState('outside');

	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
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
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				scrollBehavior={scrollBehavior}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent minW="750px" padding="32px">
					<ModalHeader fontSize="32px">Add a Job</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={7}>
						<FormControl>
							<FormLabel>Job Title</FormLabel>
							<Input ref={initialRef} placeholder="Enter Job Title" />
						</FormControl>

						<FormControl mt={7}>
							<FormLabel>Job Description</FormLabel>
							<ReactQuill theme="snow" />
						</FormControl>
						<FormControl mt={7}>
							<FormLabel>Hiring Location</FormLabel>
							<Input ref={initialRef} placeholder="Enter Hiring Location" />
						</FormControl>
						<Box mt={7}>
							<FormLabel htmlFor="url">Application URL</FormLabel>
							<InputGroup>
								<InputLeftAddon>http://</InputLeftAddon>
								<Input type="url" id="url" placeholder="Please enter domain" />
							</InputGroup>
						</Box>
						<Box mt={10}>
							<FormLabel>Annual Salary</FormLabel>
							<Divider />
							<HStack>
								<FormControl mt={7}>
									<FormLabel>Minimum Salary</FormLabel>
									<NumberInput>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
								<FormControl mt={7}>
									<FormLabel>Maximum Salary</FormLabel>
									<NumberInput>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</HStack>
						</Box>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="messenger" mr={3}>
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
