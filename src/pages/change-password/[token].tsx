import { Flex, Box, Button, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/uiComponent/InputField";
import { Wrapper } from "../../components/bodyComponent/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
	const router = useRouter();
	const [, changePassword] = useChangePasswordMutation();
	const [tokenError, setTokenError] = useState("");

	return (
		<Flex bgColor="silver" height="1500">
			<Wrapper variant="small">
				<Formik
					initialValues={{ newPassword: "", confirmPassword: "" }}
					onSubmit={async (values, { setErrors }) => {
						// formik seterrors

						const response = await changePassword({
							token,
							newPassword: values.newPassword,
							confirmPassword: values.confirmPassword,
						});

						if (response.data?.changePassword.errors) {
							// tsconfig srtict: true enables optional chaining which grants ? if necssary
							const errorMap = toErrorMap(
								response.data.changePassword.errors
							);
							if ("token" in errorMap) {
								setTokenError(errorMap.token);
							} else {
								setErrors(errorMap);
							}
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
									name="newPassword"
									placeholder="new password"
									label="New Password"
									type="password"
									color="white"
								></InputField>

								<Box height="10px" />

								{tokenError ? (
									<Box>
										<Box color="red">{tokenError}</Box>
										<Box color="yellow">
											<NextLink href="/forgot-password">
												<Link>
													Click here to re-send email
												</Link>
											</NextLink>
										</Box>
									</Box>
								) : null}

								<Box height="10px" />

								<InputField
									name="confirmPassword"
									placeholder="Confirm Password"
									label="Confirm Password"
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

// nextjs function that get any query parameters and pass it to ChangePassword
ChangePassword.getInitialProps = ({ query }) => {
	return {
		token: query.token as string, // cast
	};
};

export default withUrqlClient(createUrqlClient)(ChangePassword as any);
