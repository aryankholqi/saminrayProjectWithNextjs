import "@/styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Head>
            <title>فروشگاه ویما استایل</title>
            <meta name="description" content="فروشگاه لباس مردانه و زنانه" />
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <Navbar />
          <Component {...pageProps} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
