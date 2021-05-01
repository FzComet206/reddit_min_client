import { Box, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

export const LeftBar = () => {

	return (
		<Box
			minWidth="40px"
			borderRadius="md"
			bgColor="#465362"
			height="100%"
			overflow="auto"
		>
			<Box
				paddingTop="30px"
				paddingRight={2}
				paddingLeft={2}
				paddingBottom={3}
			>
				<Stack>
				</Stack>
			</Box>
		</Box>
	);
};
