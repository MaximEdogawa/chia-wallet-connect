import type { AppProps } from 'next/app';
import ClientApp from './_app.client';
import '../../src/styles/globals.css';

export default function App(props: AppProps) {
  if (typeof window === 'undefined') {
    return <props.Component {...props.pageProps} />;
  }
  return <ClientApp {...props} />;
}
