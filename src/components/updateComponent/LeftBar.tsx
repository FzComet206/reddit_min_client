import { Box } from "@chakra-ui/react";
import React from "react";
import { CreatePost } from "../uiComponent/createPost";

export const LeftBar = () => {
	
	return (
		<Box
			// the blue #465362
			minWidth="40px"
			borderRadius="md"
			//#EDAE49
			bgColor="#424B54"
			height="100vh"
			overflow="auto"
			p={3}
		>
			<CreatePost/>
		</Box>
	);
};
