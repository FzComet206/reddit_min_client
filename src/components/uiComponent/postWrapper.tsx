import {
	Avatar,
	Badge,
	Box,
	Flex,
	Tag,
	TagLabel,
	Tooltip,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";

type PostWrapperProps = InputHTMLAttributes<HTMLInputElement> & {
	title: string;
	textSnippets: string;
	createdat: string;
	points: number;
	unique: string;
	creator: string;
	nb: Boolean;
};

export const PostWrapper: React.FC<PostWrapperProps> = ({
	title,
	textSnippets,
	createdat,
	points,
	unique,
	creator,
	nb,
}) => {
	// return post id when clicked
	const onClickPost = (id: string) => {
		console.log(id);
	};

	// show full post text
	let expand = false;
	if (textSnippets.length == 400) {
		expand = true;
	}

	// convert time
	const date = new Date(parseInt(createdat)).toLocaleString();

	const mytag = (
		<Tooltip label="ur dad :D">
			<Tag size="md" colorScheme="purple" borderRadius="full" mt="2px">
				<TagLabel>{creator}</TagLabel>
				<Avatar src="images.jpg" size="xs" name="op" ml={2} mr={-1} />
			</Tag>
		</Tooltip>
	);

	const normaltag = (
		<Tag size="md" colorScheme="teal" borderRadius="full" mt="2px">
			<TagLabel>{creator}</TagLabel>
			<Avatar src="dango.jpg" size="xs" name="op" ml={2} mr={-1} />
		</Tag>
	);

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
					{"      "}
					Comments: 0
					{"      "}Posted: {date}
				</Box>{" "}
				<Box float="right" pr="10px">
					{nb ? (
						<Badge variant="solid" colorScheme="purple">
							op
						</Badge>
					) : (
						<Badge variant="solid" colorScheme="green">
							user
						</Badge>
					)}
					{"   "}
					{nb ? mytag : normaltag}
				</Box>
			</Box>
		</Flex>
	);
};
