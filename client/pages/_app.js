import '@/styles/globals.css';
import Layout from '@/components/Layout';
import ThemeScript from '@/components/ThemeScript';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeScript />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
