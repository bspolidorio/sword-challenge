import { AuthProvider } from "@/hooks/useAuth";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
