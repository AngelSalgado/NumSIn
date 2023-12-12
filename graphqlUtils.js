// graphqlUtils.js

import { useQuery } from '@tanstack/react-query';
import { API, graphqlOperation } from 'aws-amplify';

const query = (key, _query, _variables = {}, options = {}) => {
  return useQuery(key, () => API.graphql(graphqlOperation(_query, _variables)), {
    retry: retryFn,
    ...options,
    onSuccess: (response) => {
      options?.onSuccess(response?.data?.[key[0]]);
    },
  });
};

export default query;
