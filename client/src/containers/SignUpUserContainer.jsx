import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
	Box,
	Button,
	Center,
	FormControl,
	FormLabel,
	HStack,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Spacer,
	Text,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { IconContext } from 'react-icons';
import Rectangle from '../../public/Rectangle.svg';
import Space from '../../public/Space.png';
import { useForm } from 'react-hook-form';

export default function SignUpUserContainer() {
	const { handleSubmit, register } = useForm();
	const navigate = useNavigate();

	const [input, setInput] = useState('');
	const [show, setShow] = useState(false);

	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const handleInputChange = (e) => {
		return setInput(e.target.value);
	};

	const handleShowPassword = () => {
		return setShow(!show);
	};

	const createUser = async (userData) => {
		console.log(userData);

		// TODO: Link this with the backend
		const res = await fetch('http://localhost:8080/api/applicant/sign-up', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(userData),
		});
		// we respond with a json object for routing afterwards
		let data = await res.json();
		console.log(data);

		if (res.ok) {
			// this should have conditional logic depending on if the user is
			// a company or an applicant
			return navigate('/jobs/');
		} else {
			return setValidUser(false);
		}
	};

	return (
		<>
			<HStack spacing="24px" w="100%" h="95vh">
				<Box padding="64px">
					<Heading fontSize="32px" mt={7}>
						Sign up to getHigher
					</Heading>
					<Text mt={7}>
						Create an account to start applying to creative jobs.
					</Text>
					<form onSubmit={handleSubmit(createUser)}>
						<HStack spacing="24px">
							<FormControl isRequired mt={7}>
								<FormLabel>First name</FormLabel>
								<Input
									type="text"
									name="first_name"
									defaultValue={input}
									onChange={handleInputChange}
									placeholder="Enter your first name"
									variant="outline"
									focusBorderColor="blue"
									errorBorderColor="crimson"
									{...register('first_name', { required: true })}
								/>
							</FormControl>
							<FormControl mt={7}>
								<FormLabel>Last name</FormLabel>
								<Input
									type="text"
									name="last_name"
									defaultValue={input}
									onChange={handleInputChange}
									placeholder="Enter your last name"
									variant="outline"
									focusBorderColor="blue"
									errorBorderColor="crimson"
									{...register('last_name')}
								/>
							</FormControl>
						</HStack>
						<FormControl isRequired mt={7}>
							<FormLabel>Email</FormLabel>
							<InputGroup>
								<Input
									type="email"
									name="email"
									defaultValue={input}
									onChange={handleInputChange}
									placeholder="Enter your work email address"
									variant="outline"
									focusBorderColor="blue"
									errorBorderColor="crimson"
									{...register('email', { required: true })}
								/>
							</InputGroup>
						</FormControl>
						<FormControl isRequired mt={7}>
							<FormLabel>Password</FormLabel>
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
												<AiOutlineEyeInvisible size="28px" className="icon" />
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
						<Spacer />
						<Text mt={7}>
							{' '}
							By clicking "Continue", you confirm that you agree with our
							<Link to="/terms">Terms of Service</Link>
							and <Link to="privacy"> Privacy Policy</Link>
						</Text>
						<Spacer />
						<Button colorScheme="messenger" w="100%" type="submit" mt={7}>
							{' '}
							Continue
						</Button>
						<Text textAlign="center" mt={7}>
							{' '}
							Already have an account?
							<Link to="/login">Sign up</Link>
						</Text>
					</form>
				</Box>
				<Box
					id="sidebar"
					bg="blue.900"
					h="100%"
					display="flex"
					flexDirection="column"
					alignItems="center"
					padding="48px"
					color="white"
					justifyContent="center"
					textAlign="center"
				>
					<Heading marginBottom="28px">Reach a large pool of creative</Heading>
					<Text>
						On getHigher, a wonderful serenity has taken possession of my entire
						soul, like those sweet morning of spring which filled my childhood.
					</Text>
				</Box>
			</HStack>
		</>
	);
}
