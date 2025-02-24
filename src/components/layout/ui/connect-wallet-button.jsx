import { Wallet } from "lucide-react";
import { useWallet } from "../../../context/WalletContext";
import { truncateAddress } from "../../../utils/helpers";

const ConnectWalletButton = () => {
  const { address, connectWallet, disconnectWallet } = useWallet();

  return (
    <button
      className="flex items-center space-x-2 px-4 py-2 bg-bg-white text-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-600 border hover:border-blue-600 bg-blue-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      onClick={address ? disconnectWallet : connectWallet}
    >
      <Wallet className="h-5 w-5 text-gray-200 hover:text-blue-600" />
      <span>{address ? truncateAddress(address) : "Connect Wallet"}</span>
    </button>
  );
};

export default ConnectWalletButton;
