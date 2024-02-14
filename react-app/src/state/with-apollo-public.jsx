import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const withApolloPublic =
  (
    Component,
    {
      httpLinkConfig = {},
      authLinkConfig = {},
      headersConfig = {},
      configClient = {},
      cacheConfig = {}
    } = {}
  ) =>
  (props) => {
    const httpLink = createHttpLink({
      uri: import.meta.env["VITE_HASURA_ENDPOINT"] || "/v1/graphql",
      ...httpLinkConfig
    });

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        // Send the full JWT as auth, but specify the selected role for the multi-app scenario.
        // ...(auth.token ? { authorization: `Bearer ${auth.token}` } : {}),
        // ...(auth.role ? { "x-hasura-role": auth.role } : {}),
        ...headersConfig
      },
      authLinkConfig
    }));

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(cacheConfig),
      ...configClient
    });

    return (
      <ApolloProvider client={client}>
        <Component {...props} />
      </ApolloProvider>
    );
  };

export default withApolloPublic;
