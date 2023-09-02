import "@/styles/globals.css";
import Navbar from "src/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import Footer from "@/src/components/Footer/Footer";

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
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
          </Head>
          <Navbar />
          <Component {...pageProps} />
          <Footer/>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
