import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { usePostsQuery } from "../../generated/graphql";
import { PostWrapper } from "../uiComponent/postWrapper";

interface formMiddleProps {}

export const ForumMiddle: React.FC<formMiddleProps> = () => {
	// for skeleton before loaded
	const sk = (key: number) => {
		return (
			<Box key={key} padding="20px">
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
			// @ts-ignore
			cursor:
				// @ts-ignore
				data.posts[data.posts?.length - 1].createdAt,
		});
		setLoaded(true);
	};

	// for auto scrolling
	const [scrolled, setScrolled] = useState(false);
	const [loaded, setLoaded] = useState(false);
	// trigger fetching through state when scrolled
	if (data) {
		const scrollBox = document.getElementById("mainscroll");
		// @ts-ignore
		scrollBox.onscroll = (e) => {
			if (
				// @ts-ignore
				scrollBox?.scrollTop >=
					//@ts-ignore
					scrollBox?.scrollHeight - scrollBox?.offsetHeight - 200 &&
				!scrolled
			) {
				fetchAdditional();
				setScrolled(true);
			}

			if (loaded) {
				setScrolled(false);
			}
		};
	}
	console.log("rerenders");
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
							//@ts-ignore
							data.posts.map((p) => (
								<PostWrapper
									unique={p.id}
									key={p.id}
									title={p.title}
									textSnippets={p.textSnippet}
									createdat={p.createdAt}
									points={p.points}
								/>
							))
						}
						<Skeleton height="120px" />
					</Stack>
				)}
			</Box>
		</Box>
	);
};
