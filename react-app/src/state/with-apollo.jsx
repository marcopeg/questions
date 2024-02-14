import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  useApolloClient
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { persistCache } from "apollo3-cache-persist";

import { useAuth } from "./with-auth";

export { useQuery, useLazyQuery, useMutation } from "@apollo/client";

export const withApollo =
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
    // Gets the authentication token from the Authorization provider
    // and avoid
    const auth = useAuth();

    const httpLink = createHttpLink({
      uri: import.meta.env["VITE_HASURA_ENDPOINT"] || "/v1/graphql",
      ...httpLinkConfig
    });

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        // Send the full JWT as auth, but specify the selected role for the multi-app scenario.
        ...(auth.token ? { authorization: `Bearer ${auth.token}` } : {}),
        ...(auth.role ? { "x-hasura-role": auth.role } : {}),
        ...headersConfig
      },
      authLinkConfig
    }));

    const cache = new InMemoryCache(cacheConfig);
    // persistCache({
    //   cache,
    //   storage: window.localStorage
    // });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache,
      ...configClient
    });

    return (
      <ApolloProvider client={client}>
        <Component {...props} />
      </ApolloProvider>
    );
  };

const KNOWN_CACHE_IDS = {
  vocabulary: "user_words_translated"
};

export const useResetCache = () => {
  const apollo = useApolloClient();

  return async (id = null) => {
    // Reset a cache by key
    if (id !== null) {
      apollo.cache.evict({ id: KNOWN_CACHE_IDS[id] || id });
      apollo.cache.gc();
    }

    // Reset the entire cache
    else {
      apollo.clearStore();
      apollo.resetStore();
      localStorage.removeItem("apollo-cache-persist");
    }
    return Promise.resolve();
  };
};

export default withApollo;
