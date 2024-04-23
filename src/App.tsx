import AccountInfo from "./components/AccountInfo";
import Logo from "./components/Logo";
import WalletComponent from "./components/WalletComponent";

function App() {
  return (
    <div className="flex flex-col w-full gap-1">
      <section className="flex flex-col w-full gap-1">
        <Logo />
        <WalletComponent />
      </section>
      <section className="flex w-full h-full">
        <AccountInfo />
      </section>
    </div>
  );
}

export default App;
