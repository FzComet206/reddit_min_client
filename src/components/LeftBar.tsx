import { Box, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

export const LeftBar = () => {
	const sk = (
		<Box padding={2}>
			<SkeletonCircle size="30px" />
			<SkeletonText mt="3" noOfLines={2} />
		</Box>
	);

	return (
		<Box
			minWidth="60px"
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
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
				</Stack>
			</Box>
		</Box>
	);
};
