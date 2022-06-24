import { configureClient } from '../api-utils';
import { getClient } from './client';
import { ENDPOINTS } from '../api-config';

export type {
  Client,
  Components,
  Paths,
  PathsDictionary,
  OperationMethods
} from './openapi';

export type {
  OpenAPIClient,
  OpenAPIClientAxios,
  Document
} from 'openapi-client-axios';

const configuedClient = configureClient(getClient(), {
  baseURL: ENDPOINTS.BASE_API_URL
});

export default configuedClient;
