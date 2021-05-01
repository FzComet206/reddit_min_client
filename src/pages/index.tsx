import React from "react";
import { Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";

import { MainBody } from "../components/MainBody";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
	// const [{data}] = usePostsQuery();
	return (
		<Flex bgColor="silver">
			{/* {!data ? null: data.posts?.map(p=><div key={p.id}>{p.title}</div>)} */}
			<MainBody />
		</Flex>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
