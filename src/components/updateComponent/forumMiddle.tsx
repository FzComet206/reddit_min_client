import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

interface fLeft {}

export const ForumMiddle: React.FC<fLeft> = () => {
	const sk = (
		<Box padding="30px">
			<Skeleton height="120px" />
		</Box>
	);

	return (
		<Box
			ml="20px"
			mr="20px"
			mt="20px"
			bg="#AAAAAA"
			width="75%"
			float="left"
			borderRadius="md"
			height="88vh"
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
			{sk}
			{sk}
			{sk}
			{sk}
			{sk}
			{sk}
			{sk}
		</Box>
	);
};
