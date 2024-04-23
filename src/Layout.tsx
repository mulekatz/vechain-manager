import { DAppKitProvider } from "@vechain/dapp-kit-react";
import { NETWORK, NODE_URL } from "@/config/index";
import App from "./App";
import { Toaster } from "./components/ui/toaster";

export default function Layout() {
  return (
    <>
      <DappKitContainer>
        <main className="flex w-full min-h-screen justify-center p-1">
          <App />
        </main>
        <Toaster />
      </DappKitContainer>
    </>
  );
}

function DappKitContainer({ children }: { children: React.ReactNode }) {
  return (
    <DAppKitProvider
      nodeUrl={NODE_URL}
      genesis={NETWORK}
      usePersistence
      themeMode="DARK"
    >
      {children}
    </DAppKitProvider>
  );
}
