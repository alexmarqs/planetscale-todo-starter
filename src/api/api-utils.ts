import { AxiosInstance } from 'axios';

type AxiosClientOpts = {
  baseURL?: string;
};

export const configureClient = <ClientType extends AxiosInstance>(
  client: ClientType,
  opts: AxiosClientOpts = {}
) => {
  if (opts.baseURL) {
    client.defaults.baseURL = opts.baseURL;
  }

  // add default interceptors here if needed

  return client;
};
