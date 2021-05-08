import { Box, Button, Skeleton, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePostsQuery } from "../../generated/graphql";
import { PostWrapper } from "../uiComponent/postWrapper";

interface formMiddleProps {}

export const ForumMiddle: React.FC<formMiddleProps> = () => {
	const [scrollPosition, setScrollPosition] = useState(1);
	// useEffect(() => {
	// 	if (typeof window !== 'undefined' && window.scrollY !== 0) {
	// 	  setScrollPosition(window.scrollY);
	// 	}
	//   }, []);

	const [variables, setVariables] = useState({
		limit: 10,
		cursor: null as null | string,
	});

	const [{ data, fetching }] = usePostsQuery({
		variables,
	});

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

	if (data) {
		const scrollBox = document.getElementById("mainscroll");
		// @ts-ignore
		scrollBox.onscroll = (e) => {
			// @ts-ignore
			console.log(scrollBox.scrollTop);
		};
	}

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
						<Button
							my={10}
							m="auto"
							isLoading={fetching}
							onClick={() => {
								setVariables({
									limit: variables.limit,
									// @ts-ignore
									cursor:
										data.posts[data.posts?.length - 1]
											.createdAt,
								});
							}}
						>
							Load More
						</Button>
					</Stack>
				)}
			</Box>
		</Box>
	);
};
