import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import theme from '../theme';

import config from '../config';
import { LoginMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any);
}

const client = createClient({
  url: `${config.serverip}:${config.serverport}/graphql`,
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            ( result, query ) => {
              if (result.login.errors) {
                return query
              } else {
                return {
                  me: result.login.user,
                }
              }
            }
          )
        },

        register: (_result, args, cache, info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            ( result, query ) => {
              if (result.register.errors) {
                return query
              } else {
                return {
                  me: result.register.user,
                }
              }
            }
          )
        },
      },
    },
  }), fetchExchange],
  
  fetchOptions: {
    credentials: 'include',
  },
  // 
});

// this will run whenever we login or register, updating the cache



// const client = createClient({
//   url: `${config.serverip}:${config.serverport}/graphql`,
//   fetchOptions: {
//     credentials: "include",
//   },
// })   // fetch options has to do with cookies

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
