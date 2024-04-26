import { useWalletModal } from "@vechain/dapp-kit-react";
import { useWallet } from "@vechain/dapp-kit-react";
import { useWalletName } from "@/hooks/useWalletName";
import { WalletButton } from "@vechain/dapp-kit-react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Wallet({
  className,
  children,
  mobile,
}: {
  className?: string;
  children?: React.ReactNode;
  mobile?: boolean;
}) {
  const { account } = useWallet();

  if (account)
    return <DisconnectButton className={className} mobile={mobile} />;
  return <ConnectButton className={className}>{children}</ConnectButton>;
}

export function DisconnectButton({
  className,
  mobile,
}: {
  className?: string;
  mobile?: boolean;
}) {
  const wallet = useWallet();
  const { name } = useWalletName(wallet.account);

  return (
    <WalletButton
      className={className}
      mobile={mobile}
      address={
        name
          ? name.length <= 8
            ? name.replace(".vet", " .vet")
            : name
          : wallet.account || undefined // Add null check
      }
    />
  );
}

export function ConnectButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const modal = useWalletModal();
  return (
    <Button className={className} variant="default" onClick={modal.open}>
      <FontAwesomeIcon icon={faRightToBracket} />
      {children}
    </Button>
  );
}
