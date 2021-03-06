import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import theme from "../theme";

interface IProps {
	Component: React.FC<Props>;
	pageProps: React.FC<Props>;
}

const MyApp: React.FunctionComponent<IProps> = ({ Component, pageProps }) => {
	return (
		// <Provider value={createUrqlClient()}>
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: true,
				}}
			>
				<Component {...pageProps} />
			</ColorModeProvider>
		</ChakraProvider>
		// </Provider>
	);
};

export default MyApp;
