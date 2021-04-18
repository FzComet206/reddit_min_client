import Rract from 'react';

import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

import { Box, Button } from "@chakra-ui/react"
import { Formik, Form } from 'formik';
import React from 'react';

import { useMutation } from 'urql';
import REGISTER from './mutationStr/registerStr';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {

    const [,register] = useMutation(REGISTER)

    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "" }}
                    onSubmit={async (values)=>{
                        const response = register(values);
                    }}>

                {({isSubmitting}) => (
                    <Form>
                        <Box mt={4}>

                            <InputField 
                                name="username"
                                placeholder="username"
                                label="Username"
                            ></InputField>
                            
                            <InputField 
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            ></InputField>

                        </Box>
                        <Button 
                            type="submit" 
                            variantcolor="teal"
                            isLoading={isSubmitting}
                            >
                            Register
                        </Button>
                    </Form>
                )}

            </Formik>
        </Wrapper>
    );

}

export default Register;