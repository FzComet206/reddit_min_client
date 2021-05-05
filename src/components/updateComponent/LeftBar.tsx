import { Box, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

export const LeftBar = () => {
	return (
		<Box
			// the blue #465362
			minWidth="40px"
			borderRadius="md"
			bgColor="#474647"
			height="100vh"
			overflow="auto"
		>
			<Box
				paddingTop="30px"
				paddingRight={2}
				paddingLeft={2}
				paddingBottom={3}
			>
				<Stack></Stack>
			</Box>
		</Box>
	);
};
