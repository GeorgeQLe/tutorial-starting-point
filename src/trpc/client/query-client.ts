import superjson from 'superjson';

import {
  defaultShouldDehydrateQuery,
  QueryClient
} from '@tanstack/react-query';

export const makeQueryClient = () => new QueryClient({
  defaultOptions: {
    dehydrate: {
      serializeData: superjson.serialize,
      shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
    },
    hydrate: {
      deserializeData: superjson.deserialize,
    },
    queries: {
      staleTime: 30 * 1000,
    },
  }
})