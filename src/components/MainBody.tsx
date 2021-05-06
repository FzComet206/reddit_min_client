import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { LeftBar } from "./updateComponent/LeftBar";
import { CenterBody } from "./_centerBody";

export const MainBody: React.FC<{}> = () => {
	return (
		<Flex
			paddingLeft={1}
			paddingRight={1}
			mx="auto"
			width="75%"
			minWidth="1400px"
			height="100vh"
		>
			<Box width="7%" float="left" mr="3px" overflow="auto">
				<LeftBar />
			</Box>

			<Box width="93%" minWidth="900px" float="right" >
				<CenterBody />
			</Box>
		</Flex>
	);
};
