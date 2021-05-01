import { Box, Flex, Skeleton } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";

export const CenterBody: React.FC<{}> = () => {
	const sk = (
		<Box padding="30px">
			<Skeleton height="120px" />
		</Box>
	);

	return (
		// #F6BD60 the yellow
		// the green
		<Box bg="#2C2F33" minWidth="300px" borderRadius="md" height="1500" paddingRight="5px">
			<Box paddingTop={1} />

			<NavBar></NavBar>

			<Flex>
				<Box
					ml="20px"
					mr="20px"
					mt="20px"
					bg="#AAAAAA"
					width="75%"
					float="left"
					borderRadius="md"
					height="100%"
					overflow="auto"
				>
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
					{sk}
				</Box>

				<Box
					paddingRight="10px"
					mt="20px"
					width="25%"
					float="right"
					borderRadius="md"
					height="100%"
					overflow="auto"
					textColor="white"
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quod repudiandae laudantium iusto eaque? Non iure minima
					dolorum, animi maiores consequuntur fugiat, illo in,
					cupiditate veritatis nesciunt itaque asperiores doloremque
					quia? Blanditiis dolor corporis soluta facilis. Placeat
					voluptas maxime pariatur dolorum repellat adipisci? Rerum
					laboriosam architecto nam ducimus, sed placeat iste
					excepturi enim voluptatibus! Recusandae provident
					voluptatibus, quam officiis commodi consequatur? Natus
					commodi rerum quaerat, explicabo quod eligendi eum odit
					ullam repellendus animi tempora est voluptatum, illo eius
					corporis non ipsum doloremque voluptatem quos doloribus
					debitis maxime in? Corrupti, quia rem. Aliquid est tenetur
					nulla dicta excepturi magni, laudantium animi et vero.
					Harum, quos cum? Sit doloremque asperiores voluptas dolor,
					ab nisi fugiat, quas, eveniet molestias dolorum ipsam velit
					cumque illum. Odit ut quas dolor officia? Explicabo, sequi
					sit. Quo libero eius porro! Accusamus, qui. Totam
					accusantium officia minus corporis, ipsam eaque cupiditate
					obcaecati at nemo tenetur, odio quod esse consectetur? Natus
					quisquam, eligendi hic error quos eveniet excepturi.
					Voluptatum earum natus omnis sapiente doloremque, nisi vitae
					similique illo voluptates quidem dicta nesciunt quod quos
					veritatis velit ipsa. In, aspernatur laborum. Adipisci velit
					exercitationem voluptatibus, incidunt expedita est quia
					labore dolorem voluptates natus libero, eos tenetur, quaerat
					ad obcaecati iure fugiat alias consectetur beatae in atque
					nemo sunt error! Error, qui! Beatae, consequatur porro nam
					ducimus neque officia maxime dignissimos soluta repellat
					aspernatur sed, qui modi iste assumenda! Eligendi pariatur
					distinctio nobis tempore vero? Inventore distinctio optio,
					laudantium enim totam deserunt.
				</Box>
			</Flex>
		</Box>
	);
};
