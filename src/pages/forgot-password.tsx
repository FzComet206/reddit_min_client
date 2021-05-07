import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useState } from "react";
import { RedirectingButton } from "../components/uiComponent/Buttons";
import { InputField } from "../components/uiComponent/InputField";
import { Wrapper } from "../components//bodyComponent/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
	const [, sendEmail] = useForgotPasswordMutation();
	const [loading, setloading] = useState(false);
	const [sent, setSent] = useState(false);
	const [Error, setError] = useState(false);

	return (
		<Flex bgColor="silver" height="1500">
			<Wrapper variant="small">
				<Formik
					initialValues={{ email: "" }}
					onSubmit={async (values) => {
						// formik seterrors
						if (
							values.email.length === 0 ||
							!values.email.includes("@")
						) {
							setError(true);
						} else {
							setError(false);
							await sendEmail(values);
							setSent(true);
							console.log("navigating to landing page");
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<Box mb="30px">
								<RedirectingButton
									text="Back to login"
									loadingText="Redirecting"
									route="/login"
									state={loading}
									setState={setloading}
									router={router}
									color="linkedin"
								/>
							</Box>

							<Box mt={5}>
								<InputField
									name="email"
									placeholder="enter your email address"
									label="Email"
									color="white"
								></InputField>
							</Box>

							{Error ? (
								<Box
									height="25px"
									bgColor="red.400"
									mt="10px"
									borderRadius="md"
									textAlign="center"
									textColor="white"
								>
									Please Enter a valid email address
								</Box>
							): null}

							{sent ? (
								<Box
									height="25px"
									bgColor="green.400"
									mt="10px"
									borderRadius="md"
									textAlign="center"
									textColor="white"
								>
									Email Sent!
								</Box>
							) : null}

							<Box marginTop={8}>
								<Button
									type="submit"
									colorScheme="linkedin"
									isLoading={isSubmitting}
								>
									Submit
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</Flex>
	);
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
