import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <ClerkProvider {...pageProps}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      </ClerkProvider>
    </main>
  );
}
export default App;
