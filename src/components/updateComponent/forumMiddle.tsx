import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

interface formMiddleProps {
	
}

export const ForumMiddle: React.FC<formMiddleProps> = () => {
	const sk = (key: number) => {
		return (
			<Box key={key} padding="20px">
				<Skeleton height="120px" />
			</Box>
		);
	};

	let arr = [];
	for (let index = 0; index < 10; index++) {
		arr.push(sk(index));
	}

	return (
		<Box
			ml="10px"
			mr="10px"
			mt="10px"
			bg="#CECBC2"
			width="80%"
			float="left"
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
				height="40px"
				paddingLeft="20px"
				paddingTop="10px"
				textColor="blackAlpha.800"
				fontSize="25px"
				fontWeight="semibold"
			>
				Posts
				-------------------------------------------------------------------------------------
			</Box>
			{arr}
		</Box>
	);
};
