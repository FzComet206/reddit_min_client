import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

import { Box, Button } from "@chakra-ui/react"
import { Formik, Form } from 'formik';
import React from 'react';
;
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";

const Login: React.FC<{}> = ({}) => {

    const router = useRouter();
    const [, login] = useLoginMutation(); // types and hooks generated form graphql code gen and urql

    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "" }}

                    onSubmit={ async (values, { setErrors })=>{  // formik seterrors

                        const response = await login(values);
                        
                        if (response.data?.login.errors) {  // tsconfig srtict: true enables optional chaining which grants ? if necssary
                            setErrors(toErrorMap(response.data.login.errors))
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
                                Login
                            </Button>
                        </Box>
                    </Form>
                )}

            </Formik>
        </Wrapper>
    );

}

export default Login;