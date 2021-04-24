import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Props } from 'framer-motion/types/types'
import { Provider, createClient } from "urql"
import theme from '../theme'

import config from '../config';

const client = createClient({
  url: `${config.serverip}:${config.serverport}/graphql`,
  fetchOptions: {
    credentials: "include",
  },
})   // fetch options has to do with cookies

interface IProps {
  Component: React.FC<Props>
  pageProps: React.FC<Props>
}

const MyApp: React.FunctionComponent<IProps> = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
    )
}

export default MyApp
