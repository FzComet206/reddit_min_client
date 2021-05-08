import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

interface fRight {}

export const ForumRight: React.FC<fRight> = () => {
	return (
		<Box
			bg="#CECBC2"
			mr="5px"
			p="15px"
			mt="10px"
			width="25%"
			float="right"
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
				p="10px"
				fontWeight="semibold"
				fontSize="25px"
				whiteSpace="pre-wrap"
			>
				Top Communties
			</Box>
		</Box>
	);
};
