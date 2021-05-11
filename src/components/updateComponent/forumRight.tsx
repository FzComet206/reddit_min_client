import { Avatar, Box } from "@chakra-ui/react";
import React from "react";

interface fRight {}

export const ForumRight: React.FC<fRight> = () => {
	return (
		<Box
			bg="#CECBC2"
			mr="5px"
			width="25%"
			float="right"
			borderTopRadius="md"
			height="100%"
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
				fontWeight="semibold"
				fontSize="25px"
				whiteSpace="pre-wrap"
				pt="10px"
				pr="15px"
				pl="15px"
			>
				Random Shits Here
				<Box p="20px" mt="15px">
					<Avatar src="ohh.gif" boxSize="200px" />
				</Box>
				<Box p="20px" mt="15px">
					<Avatar src="ohh.gif" boxSize="200px" />
				</Box>
				<Box p="20px" mt="15px">
					<Avatar src="ohh.gif" boxSize="200px" />
				</Box>
				<Box p="20px" mt="15px">
					<Avatar src="ohh.gif" boxSize="200px" />
				</Box>
				<Box p="20px" mt="15px">
					<Avatar src="ohh.gif" boxSize="200px" />
				</Box>
				<Box p="20px" mt="15px">
					<Avatar src="ohh.gif" boxSize="200px" />
				</Box>
				<Box
					height="24px"
					bgColor="green.200"
					borderRadius="md"
					fontSize="15px"
					textAlign="center"
					fontWeight="normal"
				>
					End of Line
				</Box>
			</Box>
		</Box>
	);
};
