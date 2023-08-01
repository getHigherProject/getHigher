import {
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiOutlinePlus,
} from 'react-icons/ai';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { IconContext } from 'react-icons';
// import Space from '../../public/Space.png';
// import Spaceman from '../../public/Spaceman.svg';
import { useForm } from 'react-hook-form';

export default function LoginContainer() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();
	const navigate = useNavigate();

	const [input, setInput] = useState('');
	const [show, setShow] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [validUser, setValidUser] = useState(null);

	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const handleInputChange = (e) => {
		return setInput(e.target.value);
	};

	const handleShowPassword = () => {
		return setShow(!show);
	};

	const validateUser = async (credentials) => {
		console.log(credentials);

		// TODO: Link this with the backend
		const res = await fetch('http://localhost:8080/api/log-in/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(credentials),
		});
		// we respond with a json object for routing afterwards
		let data = await res.json();
		console.log(data);

		if (res.ok) {
			// this should have conditional logic depending on if the user is
			// a company or an applicant
			return navigate('/');
		} else {
			return setValidUser(false);
		}
	};

	return (
		<>
			<Button colorScheme="gray" variant="messenger" onClick={onOpen}>
				Log in
			</Button>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent minW="1200px" padding="32px">
					<HStack>
						<Box w="50%">
							<ModalCloseButton />
							<ModalHeader fontSize="32px">Welcome Back</ModalHeader>
							<Text>Please enter your details to log in to getHigher</Text>
							<form onSubmit={handleSubmit(validateUser)}>
								<ModalBody pb={7}>
									{validUser ? (
										<FormErrorMessage>
											Invalid username/password.
										</FormErrorMessage>
									) : (
										<></>
									)}
									<FormControl isRequired mt={7}>
										<FormLabel>Email address</FormLabel>

										{!emailError ? (
											<></>
										) : (
											<FormErrorMessage>
												You must include an email address to log in.
											</FormErrorMessage>
										)}
										<Input
											type="email"
											name="email"
											defaultValue={input}
											onChange={handleInputChange}
											placeholder="Enter your email"
											variant="outline"
											focusBorderColor="blue"
											errorBorderColor="crimson"
											{...register('email', { required: true })}
										/>
									</FormControl>
									<FormControl isRequired mt={7}>
										<FormLabel>Password</FormLabel>
										{!passwordError ? (
											<></>
										) : (
											<FormErrorMessage>
												You must include a password to log in.
											</FormErrorMessage>
										)}
										<InputGroup>
											<Input
												type={show ? 'text' : 'password'}
												name="password"
												defaultValue={input}
												onChange={handleInputChange}
												placeholder="Enter your password"
												variant="outline"
												focusBorderColor="blue"
												errorBorderColor="crimson"
												{...register('password', { required: true })}
											/>
											<InputRightElement>
												<Button size="sm" onClick={handleShowPassword}>
													{show ? (
														<IconContext.Provider value="Hide Password">
															<AiOutlineEyeInvisible
																size="28px"
																className="icon"
															/>
														</IconContext.Provider>
													) : (
														<IconContext.Provider value="Show Password">
															<AiOutlineEye size="28px" className="icon" />
														</IconContext.Provider>
													)}
												</Button>
											</InputRightElement>
										</InputGroup>
									</FormControl>

									<Link to="/forgotPassword" mt={7}>
										Forgot password?
									</Link>
								</ModalBody>

								<ModalFooter display="flex" flexDirection="column">
									<Button colorScheme="messenger" type="submit" w="100%">
										Log In
									</Button>
									<Text mt={7}>
										Don't have an account?
										<Link to="/signupuser">Sign up</Link>
									</Text>
								</ModalFooter>
							</form>
						</Box>
						<Box
							id="sidebar"
							bg="blue.900"
							maxW="500px"
							h="100%"
							display="flex"
							flexDirection="column"
							alignItems="center"
							padding="48px"
							color="white"
							justifyContent="center"
							textAlign="center"
						>
							<Heading marginBottom="28px">
								Reach a large pool of creative
							</Heading>
							<Text>
								On getHigher, a wonderful serenity has taken possession of my
								entire soul, like those sweet morning of spring which filled my
								childhood.
							</Text>
						</Box>
					</HStack>
				</ModalContent>
			</Modal>
		</>
	);
}
