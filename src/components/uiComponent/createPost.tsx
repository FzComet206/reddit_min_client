import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Box,
	useToast,
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React, { useRef, useState } from "react";
import { HashLoader } from "react-spinners";
import { useCreatePostMutation, useMeQuery } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "./InputField";

export const CreatePost: React.FC<{}> = ({}) => {
	// formik ref and query
	const ref = useRef(null) as any;
	const [, createPost] = useCreatePostMutation();
	const [{ data }] = useMeQuery();

	// loading post button ui
	const [loading, setLoading] = useState(false);
	// ui hooks
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	// facts
	const [title, setTitle] = useState("Michael is handsome af"); // todo actually save
	const [text, setText] = useState("true");
	const [tempTitle, setTempTitle] = useState("");
	const [tempText, setTempText] = useState("");

	// Alert hooks
	const {
		isOpen: isOpenAlert,
		onOpen: onOpenAlert,
		onClose: onCloseAlert,
	} = useDisclosure();
	const cancelRef = useRef() as any;

	// redirect if not logged in
	const onClickPost = () => {
		if (!data?.me) {
			router.push("/login");
		} else {
			onOpen();
			setLoading(false);
		}
	};

	// when clicked close without submitting
	const onCloseClick = () => {
		if (ref.current.values.title || ref.current.values.text) {
			setTempTitle(ref.current.values.title);
			setTempText(ref.current.values.text);
			onOpenAlert();
		}
		onClose();
	};

	// don't save draft
	const onClickAlertNo = () => {
		setTitle("");
		setText("");
		onCloseAlert();
	};

	// save draft
	const onClickAlertYes = () => {
		// save draft in db
		setTitle(tempTitle);
		setText(tempText);
		onCloseAlert();
	};

	return (
		<>
			<Box>
				<Button
					width="65px"
					height="60px"
					fontSize="20px"
					fontWeight="semibold"
					onClick={() => {
						setLoading(true);
						onClickPost();
					}}
					isLoading={loading}
					colorScheme="linkedin"
					spinner={<HashLoader size={25} color="white" />}
				>
					Post
				</Button>
			</Box>

			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onCloseClick}
				size="6xl"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your post !</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<Formik
							innerRef={ref}
							initialValues={{ title: title, text: text }}
							onSubmit={async (values, { setErrors }) => {
								// formik seterrors

								if (values.title.length == 0) {
									setErrors({
										title: "title cannot be empty",
									});
								} else if (values.text.length == 0) {
									setErrors({
										text: "text cannot be empty",
									});
								} else if (values.title.length > 100) {
									setErrors({
										title:
											"max length for title is 100 characters",
									});
								} else if (values.text.length > 3000) {
									setErrors({
										text:
											"max length for text is 3000 characters",
									});
								} else {
									const response = await createPost(values);
									console.log(response);
									// @ts-ignore: Unreachable code error
									if (response.data?.createPost.errors) {
										// lmao fk ts this works
										setErrors(
											toErrorMap(
												// @ts-ignore: Unreachable code error
												response.data.createPost.errors
											)
										);
									} else {
										if (
											response.error?.message.includes(
												"not authenticated"
											)
										) {
											toast({
												title:
													"Please login in or register",
												status: "info",
												isClosable: true,
											});
										} else {
											toast({
												title: "Post Submitted",
												status: "success",
												isClosable: true,
											});
											onClose();
										}
									}
								}
							}}
						>
							{({ isSubmitting }) => (
								<Form>
									<InputField
										textarea={false}
										name="title"
										placeholder="Enter your title here ---------- character limit: 100"
										label="Title"
									></InputField>

									<InputField
										textarea={true}
										height="300px"
										name="text"
										placeholder="Enter your text here ---------- character limit: 3000"
										label="Text"
									></InputField>

									<ModalFooter>
										<Button
											colorScheme="linkedin"
											mr={3}
											onClick={onCloseClick}
										>
											Close
										</Button>

										<Button
											type="submit"
											colorScheme="pink"
											isLoading={isSubmitting}
										>
											Submit
										</Button>
									</ModalFooter>
								</Form>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>

			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelRef}
				onClose={onClickAlertYes}
				isOpen={isOpenAlert}
				isCentered
			>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>Save Changes?</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						Do you want to save as draft?
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button onClick={onClickAlertNo}>No</Button>
						<Button
							ref={cancelRef}
							colorScheme="red"
							ml={5}
							onClick={onClickAlertYes}
						>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
