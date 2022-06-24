import { AppProps } from 'next/app';
import '../styles/globals.css';
import React from 'react';

import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  QueryCache
} from 'react-query';
import { Toaster } from 'react-hot-toast';
import { showErrorToast } from '../utils/toast-utils';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false
          }
        },
        queryCache: new QueryCache({
          onError: (error: any) =>
            showErrorToast(`Something went wrong: ${error?.message}`)
        })
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <Toaster />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
