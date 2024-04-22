import AccountInfo from "./components/AccountInfo";
import Logo from "./components/Logo";
import Nfts from "./components/Nfts";
import WalletComponent from "./components/WalletComponent";

function App() {
  return (
    <div className="flex flex-col w-full gap-1">
      <section className="flex w-full gap-1">
        <Logo />
        <WalletComponent />
      </section>
      <section className="flex w-full gap-1">
        <AccountInfo />
      </section>
      <section className="flex w-full">
        <Nfts />
      </section>
    </div>
  );
}

export default App;
