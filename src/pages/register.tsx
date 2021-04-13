import Rract from 'react';
import { Wrapper } from '../components/Wrapper';

import {
    Box,
    Button,
} from "@chakra-ui/react"

import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import React from 'react';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "" }}
                    onSubmit={(values)=>{
                        console.log(values);
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