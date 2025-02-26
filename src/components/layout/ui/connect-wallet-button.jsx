
import { Wallet } from 'lucide-react';
import { useWallet } from '../../../context/WalletContext'; 
import { truncateAddress } from '../../../utils/helpers';

const ConnectWalletButton = () => {
  const { address, connectWallet, disconnectWallet } = useWallet();

  return (
    <button
      className="flex items-center space-x-2 px-4 py-2 bg-bg-white text-black dark:text-gray-200 rounded-lg hover:bg-blue-600 dark:bg-blue-600 hover:text-white dark:hover:bg-blue-700 border border-black dark:border-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      onClick={address ? disconnectWallet : connectWallet}
    >
      <Wallet className="h-5 w-5" />
      <span>{address ? truncateAddress(address) : 'Connect Wallet'}</span>
    </button>
  );
};

export default ConnectWalletButton;