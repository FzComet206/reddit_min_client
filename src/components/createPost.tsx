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
	Textarea,
	useToast,
} from "@chakra-ui/react";
import router from "next/router";
import React, { useState } from "react";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";

export const CreatePost: React.FC<{}> = ({}) => {
	const [{ fetching }, createPost] = useCreatePostMutation();
	const [{ data }] = useMeQuery();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	let [valueTitle, setValueTitle] = useState("");
	let [valueText, setValueText] = useState("");

	const [empty, setEmpty] = useState(false);
	const [limit, setLimit] = useState(false);

	const onClickPost = () => {
		if (!data?.me) {
			router.push("/login");
		} else {
			onOpen();
		}
	};

	const onClosePost = () => {
		// cache
		onClose();
		setEmpty(false);
		setLimit(false);
	};

	let handleInputChangeTitle = (e: any) => {
		let inputValue = e.target.value;
		setValueTitle(inputValue);
	};

	let handleInputChangeText = (e: any) => {
		let inputValue = e.target.value;
		setValueText(inputValue);
	};

	const handleSubmit = async (title: string, text: string) => {
		console.log(title);
		console.log(text);
		if (title.length == 0 || text.length == 0) {
			setEmpty(true);
			return;
		}
		if (title.length > 50 || text.length > 800) {
			setLimit(true);
			return;
		}
		await createPost({ title: title, text: text });
		toast({ title: "Post Submitted", status: "success", isClosable: true });
		onClose();
	};

	return (
		<>
			<Box>
				<Button
					onClick={onClickPost}
					width="76px"
					height="40px"
					colorScheme="pink"
					p={3}
					mt="10px"
					fontSize="20px"
					fontWeight="semibold"
				>
					Post
				</Button>
			</Box>

			<Modal isOpen={isOpen} onClose={onClosePost} size="6xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your post !</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<Textarea
							value={valueTitle}
							onChange={handleInputChangeTitle}
							placeholder="Enter your title here ---------- word limit: 50"
						/>

						<Textarea
							value={valueText}
							onChange={handleInputChangeText}
							placeholder="Enter your text here ---------- word limit: 800"
							size="md"
							mt="10px"
							height="300px"
						/>

						{empty ? (
							<Box
								height="25px"
								bgColor="red.400"
								mt="10px"
								borderRadius="md"
								textAlign="center"
								textColor="white"
							>
								{" "}
								cannot submit empty fields
							</Box>
						) : null}

						{limit ? (
							<Box
								height="25px"
								bgColor="red.400"
								mt="10px"
								borderRadius="md"
								textAlign="center"
								textColor="white"
							>
								{" "}
								title or text exceeded word limit
							</Box>
						) : null}

					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="linkedin"
							mr={3}
							onClick={onClosePost}
						>
							Close
						</Button>

						<Button
							colorScheme="pink"
							onClick={() => {
								handleSubmit(valueTitle, valueText);
							}}
							isLoading={fetching}
						>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
