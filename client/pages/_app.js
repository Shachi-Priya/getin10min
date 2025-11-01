import '@/styles/globals.css';
import Layout from '@/components/Layout';
import ThemeScript from '@/components/ThemeScript';
// import 'react-international-phone/style.css';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeScript />
      <Layout>
        <Component {...pageProps} />
        <WhatsAppButton />
      </Layout>
    </>
  );
}
