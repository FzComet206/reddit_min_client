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
import { useMeQuery } from "../generated/graphql";

export const CreatePost: React.FC<{}> = ({}) => {
	const [{ data }] = useMeQuery();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	let [valueTitle, setValueTitle] = useState("");
	let [valueText, setValueText] = useState("");

	const [empty, setEmpty] = useState(false);

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
							placeholder="Enter your title here"
						/>

						<Textarea
							value={valueText}
							onChange={handleInputChangeText}
							placeholder="Enter your text here"
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
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="linkedin" mr={3} onClick={onClosePost}>
							Close
						</Button>

						<Button
							colorScheme="pink"
							onClick={() => {
								handleSubmit(valueTitle, valueText);
							}}
						>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
