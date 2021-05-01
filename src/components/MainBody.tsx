import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { LeftBar } from "./LeftBar";
import { CenterBody } from "./_centerBody";

export const MainBody: React.FC<{}> = () => {
	return (
		<Flex
			paddingLeft={1}
			paddingRight={1}
			mx="auto"
			width="65%"
			minWidth="1000px"
			height="100%"
			overflow="auto"
		>
			<Box width="7%" float="left" mt={1} mr={1}>
				<LeftBar />
			</Box>

			<Box width="93%" minWidth="900px" float="right" mt={1}>
				<CenterBody />
			</Box>
		</Flex>
	);
};
