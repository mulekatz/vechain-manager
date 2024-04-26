import AccountInfo from "./components/AccountInfo";
import Title from "./components/Title";
/* import Nfts from "./components/Nfts"; */
import Ticker from "./components/Ticker";
import WalletComponent from "./components/WalletComponent";

function App() {
  return (
    <div className="flex flex-col w-full max-w-7xl gap-1">
      <section className="flex flex-col w-full gap-1">
        <Title className="text-3xl" title={"VManager"} />
      </section>
      <section className="flex flex-col w-full gap-1">
        <Title title={"VBlockchain"} />
        <Ticker />
      </section>
      <section className="flex flex-col w-full gap-1">
        <Title title={"VAccount"} />
        <WalletComponent />
        <AccountInfo />
      </section>
      <section className="flex w-full">{/* <Nfts /> */}</section>
    </div>
  );
}

export default App;
