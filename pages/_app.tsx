import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloclient = new ApolloClient({
    uri: "https://flyby-gateway.herokuapp.com/",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloclient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
