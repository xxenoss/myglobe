import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AOSInit from '../components/AOSInit';
import Head from 'next/head';
import Layout from '../components/Layout'; // <-- Import Layout here


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <AOSInit />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

