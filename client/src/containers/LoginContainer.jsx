import {
  Box,
  Button,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus
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
  useForm,
} from 'react-hook-form';
import Space from '../../public/Space.svg';
import Spaceman from '../../public/Spaceman.svg';

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
    const res = await fetch('http://localhost:8080/api/log-in/',
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
      <Button
        onClick={onOpen}
        leftIcon={<AiOutlinePlus />}
        colorScheme="messenger"
        variant="solid"
      >
        Log In
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          minW='750px'
          padding='32px'
        >
          <HStack spacing='24px'>
            <Box>
              <ModalCloseButton /> 
              <ModalHeader fontSize='32px'>
                Welcome Back
              </ModalHeader>
              <Text>
                Please enter your details to log in to getHigher
              </Text>     
              <form onSubmit={handleSubmit(validateUser)}>              
                <ModalBody pb={7}>
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
                      defaultValue={input}
                      onChange={handleInputChange}
                      placeholder='Enter your email'
                      variant='outline'
                      focusBorderColor='blue'
                      errorBorderColor='crimson'
                      {...register('email', { required: true })} 
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
                        defaultValue={input}
                        onChange={handleInputChange}
                        placeholder='Enter your password'
                        variant='outline'
                        focusBorderColor='blue'
                        errorBorderColor='crimson'
                        {...register('password', { required: true })}
                      />
                      <InputRightElement>
                        <Button size='sm' onClick={handleShowPassword}>
                          {show ?
                            <IconContext.Provider value='Hide Password' >
                              <AiOutlineEyeInvisible size='28px' className='icon' />
                            </IconContext.Provider>                      
                            :
                            <IconContext.Provider value='Show Password' >
                              <AiOutlineEye size='28px' className='icon' />
                            </IconContext.Provider>
                          }
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    
                  </FormControl>

                  <Link to='/forgotPassword'>
                    Forgot password?
                  </Link>
                </ModalBody>
                
                <ModalFooter>
                  <Button
                    colorScheme='blue'
                    type='submit'
                  >
                    Log In
                  </Button>
                  <Text>
                    Don't have an account?
                    <Link to='/signupuser'>
                      Sign up
                    </Link>
                  </Text>  
                </ModalFooter>                           
              </form>
            </Box>
            <Box
                id='sidebar'
              >
                <Space />
                <Text>
                  Reach a large pool of creative
                </Text>
                <Text>
                  On getHigher, a wonderful serenity has taken possession of my entire
                  soul, like those sweet morning of spring which filled my childhood.
                </Text>
                <Image src={Spaceman} alt='Spaceman' />
              </Box>        
          </HStack>        
        </ModalContent>
      </Modal>  
    </> 
  );
};