import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { LeftBar } from "../updateComponent/LeftBar";
import { CenterBody } from "./_centerBody";

export const MainBody: React.FC<{}> = () => {
	return (
		<Flex
			mx="auto"
			width="75%"
			minWidth="1400px"
			height="100vh"
			bg="#6C6F73"
		>
			<Box width="6%" float="left" overflow="auto">
				<LeftBar />
			</Box>

			<Box width="94%" minWidth="900px" float="right" >
				<CenterBody />
			</Box>
		</Flex>
	);
};
