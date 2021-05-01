// Libraries
import React from "react";
import { useState } from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import NextLink from "next/link";

// React Components
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { RedirectingButton } from "../components/Buttons";

// Utils and Generated
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation(); // types and hooks generated form graphql code gen and urql

	const [loading, setloading] = useState(false);

	return (
		<Flex bgColor="silver" height="1500">
			<Wrapper variant="small">
				<Box mb="30px">
					<RedirectingButton
						text="Back to main"
						loadingText="Redirecting"
						route="/"
						state={loading}
						setState={setloading}
						router={router}
						color="linkedin"
					/>
				</Box>

				<Formik
					initialValues={{ usernameOrEmail: "", password: "" }}
					onSubmit={async (values, { setErrors }) => {
						// formik seterrors

						const response = await login(values);

						if (response.data?.login.errors) {
							// tsconfig srtict: true enables optional chaining which grants ? if necssary
							setErrors(toErrorMap(response.data.login.errors));
						} else {
							console.log("navigating to landing page");
							router.push("/");
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<Box mt={5}>
								<InputField
									name="usernameOrEmail" // this must equal to fieldname
									placeholder="username"
									label="Username"
									color="white"
								></InputField>

								<Box paddingTop="20px" />

								<InputField
									name="password"
									placeholder="password"
									label="Password"
									type="password"
									color="white"
								></InputField>
							</Box>

							<Flex>
								<Box marginTop="30px">
									<Button
										type="submit"
										colorScheme="linkedin"
										isLoading={isSubmitting}
									>
										Login
									</Button>
								</Box>
								<NextLink href="/forgot-password">
									<Link ml="auto" mt="30px" color="white">
										Forgot Password?
									</Link>
								</NextLink>
							</Flex>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</Flex>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
