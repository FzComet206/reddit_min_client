// Libraries
import React, { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

// React Components
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { RedirectingButton } from "../components/Buttons";

// Utils and Generated
import { toErrorMap } from "../utils/toErrorMap";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation(); // types and hooks generated form graphql code gen and urql

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
					initialValues={{
						username: "",
						email: "",
						password: "",
						confirmPassword: "",
					}}
					onSubmit={async (values, { setErrors }) => {
						// formik seterrors

						const response = await register({ options: values });

						if (response.data?.register.errors) {
							// tsconfig srtict: true enables optional chaining which grants ? if necssary
							setErrors(
								toErrorMap(response.data.register.errors)
							);
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
									name="username"
									placeholder="username"
									label="Username"
									color="white"
								></InputField>

								<Box paddingTop="20px" />

								<InputField
									name="email"
									placeholder="email"
									label="Email"
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

								<Box paddingTop="20px" />

								<InputField
									name="confirmPassword"
									placeholder="confirm password"
									label="Confirm"
									type="password"
									color="white"
								></InputField>
							</Box>

							<Box marginTop={8}>
								<Button
									type="submit"
									colorScheme="linkedin"
									isLoading={isSubmitting}
								>
									Register
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</Flex>
	);
};

export default withUrqlClient(createUrqlClient)(Register);
