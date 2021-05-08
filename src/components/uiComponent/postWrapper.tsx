import { Box, Flex } from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";

type PostWrapperProps = InputHTMLAttributes<HTMLInputElement> & {
	title: string;
	textSnippets: string;
	createdat: string;
	points: number;
	unique: string;
};

export const PostWrapper: React.FC<PostWrapperProps> = ({
	title,
	textSnippets,
	createdat,
	points,
	unique,
}) => {
	const onClickPost = (id: string) => {
		console.log(id);
	};

	let expand = false;
	if (textSnippets.length == 400) {
		expand = true;
	}

	return (
		<Flex direction="column">
			<a onClick={() => onClickPost(unique)} href="/#">
				<Box bgColor="linkedin.100" padding="15px" borderTopRadius="md">
					<Box fontWeight="semibold">Title: {title}</Box>
					<Box p="15px">
						{textSnippets}{" "}
						{expand ? (
							<Box fontWeight="semibold" textAlign="end">
								Click to view full post
							</Box>
						) : null}
					</Box>
				</Box>
			</a>
			<Box
				bgColor="linkedin.50"
				fontWeight="semibold"
				height="50px"
				padding="10px"
				borderBottomRadius="md"
				whiteSpace="pre-wrap"
			>
				<Box float="left">
					Upvotes: {points}
					{"      "}Posted: {createdat} ago
				</Box>{" "}
				<Box float="right" pr="10px">----------   Admin</Box>
			</Box>
		</Flex>
	);
};
