import { Box } from "@chakra-ui/react";
import React from "react";
import { CreatePost } from "../createPost";

export const LeftBar = () => {
	
	return (
		<Box
			// the blue #465362
			minWidth="40px"
			borderRadius="md"
			bgColor="#474650"
			height="100vh"
			overflow="auto"
			p={3}
		>
			<CreatePost/>
		</Box>
	);
};
