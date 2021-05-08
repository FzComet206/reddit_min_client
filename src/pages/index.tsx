import React from "react";
import { Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";

import { MainBody } from "../components/bodyComponent/MainBody";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
	return (
		<Flex bgColor="silver" height="100vh">
			<MainBody />
		</Flex>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
