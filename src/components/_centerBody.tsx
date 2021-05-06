import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { ForumMiddle } from "./updateComponent/forumMiddle";
import { ForumRight } from "./updateComponent/forumRight";
import { NavBar } from "./updateComponent/NavBar";

export const CenterBody: React.FC<{}> = () => {
	return (
		// #F6BD60 the yellow
		// #2C2F33 discord dark
		<Box
			bg="#2C2F48"
			minWidth="300px"
			borderRadius="md"
			height="100vh"
			paddingRight="5px"
		>
			<Box paddingTop={1} />

			<NavBar></NavBar>

			<Flex>
				<ForumMiddle />

				<ForumRight />
			</Flex>
		</Box>
	);
};
