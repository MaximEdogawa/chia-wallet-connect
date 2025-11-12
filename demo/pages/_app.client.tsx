import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import dynamic from 'next/dynamic';
import store, { persistor } from '../../src/redux/store';
import WalletManager from '../../src/utils/walletIntegration/walletManager';

// Dynamically import client-side components to avoid SSR issues
const Navbar = dynamic(() => import('../../src/components/shared/navbar/Navbar'), {
  ssr: false,
});

interface ClientAppProps {
  Component: AppProps['Component'];
  pageProps: AppProps['pageProps'];
}

export default function ClientApp({ Component, pageProps }: ClientAppProps) {
  // Theme detector
  const [theme, setTheme] = useState<"dark" | "light" | "auto">("auto");
  
  useEffect(() => {
    const detectTheme = () => {
      if (typeof window !== 'undefined') {
        if (localStorage.theme === 'dark') {
          document.documentElement.classList.add('dark');
          setTheme('dark');
        } else if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
          setTheme('auto')
        } else if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches) {
          document.documentElement.classList.remove('dark');
          setTheme('auto')
        } else {
          document.documentElement.classList.remove('dark');
          setTheme('light');
        }
      }
    }
    detectTheme()

    // Detect user preference change
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', detectTheme);

    return () => {
      mediaQuery.removeEventListener('change', detectTheme);
    };
  }, []);

  // On page reload, wallet event listeners need to be re-established
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const walletManager = new WalletManager();
      walletManager.detectEvents();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="min-h-screen relative">
          <Navbar theme={theme} setTheme={setTheme} />
          <Toaster position="bottom-right"
            toastOptions={{
              className: "!bg-brandLight/80 backdrop-blur w-full sm:w-auto !px-4 !py-3 !rounded-xl font-medium text-sm",
              loading: {
                duration: 45000,
                iconTheme: {
                  primary: "black",
                  secondary: "transparent"
                }
              },
              success: {
                iconTheme: {
                  primary: '#166534',
                  secondary: '#EFF4F7'
                }
              },
              error: {
                iconTheme: {
                  primary: '#B91C1C',
                  secondary: '#EFF4F7'
                }
              }
            }} />
          <div className="flex flex-col px-4">
            <div className="pt-12 pb-[96px]">
              <Component {...pageProps}  />
            </div>
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

