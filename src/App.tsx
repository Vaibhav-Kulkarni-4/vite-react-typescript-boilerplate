import { useSelector } from "react-redux";
import Loader from "./components/atoms/loader/Loader";
import Table from "./components/atoms/table/Table";
import TopBar from "./components/atoms/topbar/TopBar";
import "./App.scss";
import type { RootState } from "./stores/store";

function App() {
  const loaderStore = useSelector((state: RootState) => state.loaderStore);

  return (
    <>
      {/* Here, the Loader is declared as a layout component which will apply to all pages. Setting the state of this Loader will be taken care by individual components */}
      <Loader
        isLoading={loaderStore.isLoading}
        loaderMessage={loaderStore.loaderMessage}
      />
      <TopBar navItems={["Home"]} />

      <Table />
    </>
  );
}

export default App;
