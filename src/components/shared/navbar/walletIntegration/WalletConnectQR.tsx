import { Transition } from '@headlessui/react';
import { QRCodeSVG } from 'qrcode.react';

import CopyButton from '../../CopyButton';

import { setPairingUri } from '@/redux/walletConnectSlice';
import { useAppDispatch } from '@/hooks';

interface WalletConnectQRProps {
  pairingUri: string | null;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function WalletConnectQR({ pairingUri, isOpen, setIsOpen } : WalletConnectQRProps) {

  const dispatch = useAppDispatch();

  return ( 
    <Transition
      show={Boolean(isOpen)}
      enter="transition-all duration-300 ease-out"
      enterFrom="max-h-[0] opacity-0"
      enterTo="max-h-[600px] opacity-100"
      leave="transition-all duration-300 ease-in"
      leaveFrom="max-h-[600px] opacity-100"
      leaveTo="max-h-[0] opacity-0"
    >
      <div className="flex flex-col justify-center gap-2">
        {!pairingUri && <div className="w-[173px] h-[173px] m-[13px] rounded bg-brandDark/10 mx-auto animate-pulse"></div>}
        
        {pairingUri && (
          <>
            <QRCodeSVG
              className="animate-fadeIn"
              value={pairingUri}
              includeMargin
              width={"100%"}
              height={200}
              bgColor="#EDF0F1"
            />
            <div className="flex flex-col gap-2">
              <textarea
                readOnly
                value={pairingUri}
                className="w-full p-2 text-xs font-mono bg-brandDark/5 dark:bg-brandLight/5 border border-brandDark/20 dark:border-brandLight/20 rounded-lg text-brandDark dark:text-brandLight resize-none focus:outline-none focus:ring-2 focus:ring-brandDark/20 dark:focus:ring-brandLight/20"
                rows={4}
                onClick={(e) => {
                  e.currentTarget.select();
                }}
                onFocus={(e) => {
                  e.currentTarget.select();
                }}
              />
            </div>
          </>
        )}
        <button className="text-red-700 hover:opacity-80 w-fit mx-auto" onClick={() => {dispatch(setPairingUri(null)); setIsOpen(false)}}>Cancel</button>
        <CopyButton disabled={!Boolean(pairingUri)} copyText={pairingUri ? pairingUri : ''} height="36px">Copy</CopyButton>
      </div>
    </Transition> 
  );
}

export default WalletConnectQR;