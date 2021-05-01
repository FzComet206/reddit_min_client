import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useState } from "react";
import { RedirectingButton } from "../components/Buttons";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
	const [, sendEmail] = useForgotPasswordMutation();
	const [loading, setloading] = useState(false);
	const [sent, setSent] = useState(false);

	return (
		<Flex bgColor="silver" height="1500">
			<Wrapper variant="small">
				<Formik
					initialValues={{ email: "" }}
					onSubmit={async (values) => {
						// formik seterrors
						await sendEmail(values);
						setSent(true);
						console.log("navigating to landing page");
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
