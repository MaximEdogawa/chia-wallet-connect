import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Import from the package source (for demo/testing)
// In production, other apps would import from '@chia/wallet-connect' (the built package)
import '../../src/styles/globals.css';

// Create a client-only App component to avoid SSR issues with React hooks
const ClientApp = dynamic(() => import('./_app.client'), {
  ssr: false,
});

// Minimal server-side App component
export default function App({ Component, pageProps }: AppProps) {
  // For error pages (404, 500), render without Redux/React context to avoid SSR issues
  // During build, we can't use useRouter, so check Component displayName or path
  const isErrorPage = 
    typeof window === 'undefined' && 
    (Component.displayName === 'Custom404' || Component.displayName === 'Custom500' || 
     Component.name === 'Custom404' || Component.name === 'Custom500');
  
  if (isErrorPage) {
    return <Component {...pageProps} />;
  }
  
  return <ClientApp Component={Component} pageProps={pageProps} />;
}
