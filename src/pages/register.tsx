import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

import { Box, Button } from "@chakra-ui/react"
import { Formik, Form } from 'formik';
import React from 'react';
;
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {

    const router = useRouter();
    const [, register] = useRegisterMutation(); // types and hooks generated form graphql code gen and urql

    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "" }}

                    onSubmit={ async (values, { setErrors })=>{  // formik seterrors

                        const response = await register(values);

                        if (response.data?.register.errors) {  // tsconfig srtict: true enables optional chaining which grants ? if necssary
                            setErrors(toErrorMap(response.data.register.errors))
                        } else {
                            console.log("navigating to landing page")
                            router.push("/")
                        }
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
                        <Box marginTop={3}>
                            <Button 
                                type="submit" 
                                variantcolor="teal"
                                isLoading={isSubmitting}
                                >
                                Register
                            </Button>
                        </Box>
                    </Form>
                )}

            </Formik>
        </Wrapper>
    );

}

export default Register;