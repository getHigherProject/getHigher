import {
  Box,
  HStack,
  Spacer,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible
} from 'react-icons/ai';
import {
  IconContext
} from 'react-icons';
import React, {
  useState
} from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  Form,
  useForm,
} from 'react-hook-form';



const LoginContainer = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  
  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [validUser, setValidUser] = useState(null);

  const handleInputChange = (e) => {
    return setInput(e.target.value);
  };
  
  const handleShowPassword = () => {
    return setShow(!show);
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'An email address is required to log in.'
    } else if (/^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/i.test(value)) {
      error = 'Please enter a valid email address.'
    }

    return setEmailError(error);
  };

  const validatePassword = (value)  => {
    // doing it this way to allow for expanding errors
    let error = (value === '');

    return setPasswordError(error);
  };

  const validateUser = async ({ request }) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    const credentials = {
      email: values.email,
      password: values.password
    };
  
    // TODO: Link this with the backend
    const res = await fetch('http://localhost:8080/api/login/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      }
    )
    // we respond with a json object for routing afterwards
    let data = await res.json();
  
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
      <Box>
        <HStack spacing="24px">
          <Box>
            <Text>
              Welcome Back
            </Text>
            <Text>
              Please enter your details to lo in to getHigher
            </Text>
            <Spacer />
            <Form onSubmit={handleSubmit(validateUser)}>              
              {validUser ?
                (
                  <FormErrorMessage>
                    Invalid username/password.
                  </FormErrorMessage>
                ) : <></> 
              }
              <FormControl isRequired>
                <FormLabel>
                  Email address
                </FormLabel>
                
                {!emailError ?
                  (
                    <></>
                  ) : (
                    <FormErrorMessage>
                      You must include an email address to log in.
                    </FormErrorMessage>
                  )
                }
                <Input 
                  type='email'
                  name='email'
                  value={input}
                  onChange={handleInputChange}
                  placeholder='Enter your email'
                  variant='outline'
                  focusBorderColor='blue'
                  errorBorderColor='crimson'
                  onBlur={validateEmail}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>
                  Password
                </FormLabel>
                {!passwordError ?
                  (
                    <></>
                  ) : (
                    <FormErrorMessage>
                      You must include a password to log in.
                    </FormErrorMessage>
                  )
                }
                <InputGroup>
                  <Input
                    type={show ? 'text' : 'password'}
                    name='password'
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Enter your password'
                    variant='outline'
                    focusBorderColor='blue'
                    errorBorderColor='crimson'
                    onBlur={validatePassword}
                  />
                  <InputRightElement>
                    <Button size='sm' onClick={handleShowPassword}>
                      {show ?
                        <IconContext.Provider title='Hide Password'>
                          <AiOutlineEyeInvisible />
                        </IconContext.Provider>                      
                        :
                        <IconContext.Provider title='Show Password'>
                          <AiOutlineEye />
                        </IconContext.Provider>
                      }
                    </Button>
                  </InputRightElement>
                </InputGroup>
                
              </FormControl>

              <Link to='/forgotPassword'>
                Forgot password?
              </Link>
              <Button
                colorScheme='blue'
                type='submit'
              >
                Log In
              </Button>              
            </Form>
            <Text>
              Don't have an account?
              <Link to='/signUp'>
                Sign up
              </Link>
            </Text>
          </Box>
          {/* <Box id='sidebar'>
            <Text>
              Reach a large pool of creative
            </Text>
            <Text>
              On getHigher, a wonderful serenity has taken possession of my entire
              soul, like those sweet morning of spring which filled my childhood.
            </Text>
            <Box boxSize="md">
              <Image src='' alt='Spaceman' />
            </Box>
          </Box> */}
        </HStack>
      </Box>
    </>
  );
};

export default LoginContainer;
