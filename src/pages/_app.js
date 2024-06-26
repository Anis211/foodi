import "@/styles/globals.css";
import Layout from "./layout";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          rel="preload"
          src="https://www.paypal.com/sdk/js?client-id=ARxUsuJe4VYBBmQX1Et1oxJW7Erm6LBq4XZPCnKBajCoXAk82QfEi60ZRamnLmxSsf2uahVTRyLxKlGI&currency=USD"
        />
        <script rel="preload" src="https://cdn.lordicon.com/lordicon.js" />
        <title>Foodi</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
