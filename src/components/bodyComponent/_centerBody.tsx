import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { ForumMiddle } from "../updateComponent/forumMiddle";
import { ForumRight } from "../updateComponent/forumRight";
import { NavBar } from "../updateComponent/NavBar";

export const CenterBody: React.FC<{}> = () => {
	return (
		<Box
			bg="#6C6F73"
			height="100vh"
			paddingRight="5px"
		>
			<NavBar></NavBar>

			<Flex height="93vh">
				<ForumMiddle />

				<ForumRight />
			</Flex>
		</Box>
	);
};
