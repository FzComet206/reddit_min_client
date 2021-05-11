import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { usePostsQuery } from "../../generated/graphql";
import { PostWrapper } from "../uiComponent/postWrapper";

interface formMiddleProps {}

export const ForumMiddle: React.FC<formMiddleProps> = () => {
	// for skeleton before loaded
	const sk = (key: number) => {
		return (
			<Box key={key} pt="20px" pb="20px">
				<Skeleton height="120px" />
			</Box>
		);
	};

	let arr = [];
	for (let index = 0; index < 10; index++) {
		arr.push(sk(index));
	}

	// for fetching and options
	const [variables, setVariables] = useState({
		limit: 10,
		cursor: null as null | string,
	});

	const [{ data }] = usePostsQuery({
		// auto fetch when variables change
		variables,
	});
	// fetch function
	const fetchAdditional = () => {
		setVariables({
			limit: 10,
			cursor:
				// @ts-ignore
				data.posts.post[data.posts?.post.length - 1].createdAt,
		});
		setLoaded(true); // scrolled and loaded set to false after this calls
	};

	// for auto scrolling
	const [scrolled, setScrolled] = useState(false); // decide when calling fetchadditional
	const [loaded, setLoaded] = useState(false); // decide when set scroll to false so above will run
	// trigger fetching through state when scrolled
	if (data) {
		const scrollBox = document.getElementById("mainscroll");

		if (scrollBox) {
			scrollBox.onscroll = () => {
				if (
					scrollBox?.scrollTop >=
						scrollBox?.scrollHeight -
							scrollBox?.offsetHeight -
							200 &&
					!scrolled
				) {
					if (data.posts?.post) {
						fetchAdditional();
						setScrolled(true);
					}
				}

				if (loaded) {
					setScrolled(false);
					setLoaded(false);
				}
			};
		}
	}

	// component
	return (
		<Box
			id="mainscroll"
			ml="10px"
			mr="10px"
			mt="10px"
			bg="#CECBC2"
			width="80%"
			float="left"
			borderRadius="md"
			height="90vh"
			overflow="auto"
			css={{
				"&::-webkit-scrollbar": {
					width: "5px",
				},
				"&::-webkit-scrollbar-track": {
					width: "10px",
				},
				"&::-webkit-scrollbar-thumb": {
					background: "grey",
					borderRadius: "24px",
				},
			}}
		>
			<Box
				height="40px"
				paddingLeft="20px"
				paddingTop="10px"
				textColor="blackAlpha.800"
				fontSize="25px"
				fontWeight="semibold"
			>
				New Posts
				------------------------------------------------------------------------------
			</Box>

			<Box p="10px">
				{!data ? (
					<Box>{arr}</Box>
				) : (
					<Stack
						mt="20px"
						spacing="20px"
						paddingLeft="10px"
						paddingRight="15px"
					>
						{
							// mapping each post onto post component and render as list
							data.posts ? (
								data.posts.post.map((p) => (
									<PostWrapper
										unique={p.id}
										key={p.id}
										title={p.title}
										textSnippets={p.textSnippet}
										createdat={p.createdAt}
										points={p.points}
										creator={p.creator.nickname}
										nb={p.creator.is_op}
									/>
								))
							) : (
								<Box>{arr}</Box>
							)
						}
						{data.posts?.hasMore ? (
							<Skeleton height="120px" />
						) : <Box textAlign="center" borderRadius="md" bgColor="green.200">No More Posts :p</Box>}
					</Stack>
				)}
			</Box>
		</Box>
	);
};
