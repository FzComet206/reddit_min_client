import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

interface fRight {}

export const ForumRight: React.FC<fRight> = () => {
	return (
		<Box
			paddingRight="10px"
			mt="20px"
			width="25%"
			float="right"
			borderRadius="md"
			height="88vh"
			overflow="auto"
			textColor="white"
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
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. In commodi
			alias repellendus deleniti accusantium esse aliquid eos fugiat.
			Dolore molestiae commodi iste nisi natus iusto cupiditate, maiores
			quasi necessitatibus ullam! Id voluptatibus cupiditate mollitia
			sunt? Ipsa ratione atque ex laboriosam est alias obcaecati non modi
			qui, omnis delectus tempore natus corrupti dicta aspernatur nam ea
			neque repellat a. Quos, consequatur! Ratione quo autem minima
			delectus ipsam nam vel nisi. Corporis, dolorem cupiditate culpa
			obcaecati quaerat, voluptatem iure similique eius natus, expedita
			excepturi praesentium rem eligendi sunt modi magnam numquam iusto?
			Iste asperiores fuga laboriosam itaque. Laboriosam accusantium cum
			unde animi aspernatur voluptate saepe maiores suscipit et rerum
			dolores vitae, mollitia iste? Perspiciatis quae, consectetur earum
			minima cupiditate eum recusandae quo? Corrupti eligendi autem cum,
			saepe neque necessitatibus! Architecto minima corporis adipisci in
			eaque, saepe ipsa non quasi debitis vitae veritatis doloremque
			repellat, ratione minus obcaecati nihil quae alias similique odit?
			Voluptatibus cumque quia expedita magnam libero ad qui quis facere
			perspiciatis ratione modi, nam doloribus, voluptatem, labore
			temporibus? Enim minima quia aliquam dolore dolorem quis doloribus
			itaque tempore sunt eius? Illum fuga cumque impedit modi harum dolor
			esse voluptatem repudiandae autem soluta? Soluta dolor quod iure ab
			dolores magni! Voluptate blanditiis quasi reprehenderit. Nulla
			perspiciatis provident, voluptatem alias labore dolor. Et molestiae
			eum incidunt ipsum consectetur, distinctio ipsa molestias id
			numquam, neque, accusantium architecto cum vero at assumenda dolores
			est repellat harum! Culpa minus inventore adipisci corporis quaerat
			illum reiciendis. Quae atque minus cupiditate explicabo obcaecati
			maxime aliquam quo, eveniet unde neque placeat aut animi error
			laudantium doloremque facilis dolorum sapiente! Nisi delectus
			temporibus aspernatur. Beatae officiis blanditiis voluptate aliquam.
			Blanditiis aliquam accusamus aliquid, ad modi veritatis hic ipsa
			debitis quaerat repellendus suscipit nihil quae nobis fugit magni
			distinctio eum non atque esse itaque delectus eos iusto a earum.
			Deserunt!
		</Box>
	);
};
