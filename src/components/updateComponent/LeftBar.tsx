import { Box } from "@chakra-ui/react";
import React from "react";
import { CreatePost } from "../uiComponent/createPost";

export const LeftBar = () => {
	
	return (
		<Box
			bg="grey"
			height="100vh"
			p="10px"
		>
			<CreatePost/>
		</Box>
	);
};
