// Main Layout
import {lazy, Suspense} from "react";
import NavigationMenu from "./components/NavigationMenu";
import MainContent from "./components/MainContent";
import LoaderMenu from "./components/LoaderMenu";
import MainTitleAndDashboardContent from "./components/UI/MainTitleAndDashboardContent";
import useToggleMenu from "./hooks/useToggleMenu";

// LAZY LOAD
const LazyMenu = lazy(() => import("./components/UI/Menu"));

function App() {
  // CONTEXT
  const {isToggled} = useToggleMenu();

  return (
    <div className="flex flex-col w-full min-h-dvh lg:h-screen lg:p-[2rem] overflow-y-auto lg:overflow-hidden md:bg-color_1 lg:bg-color_5">
      <div className="grid grid-cols-1 lg:grid-cols-[56px,1fr,1.5fr] grid-flow-row lg:h-[calc(100vh-2*2rem)] w-full xl:w-[1200px] self-center rounded overflow-hidden bg-color_1 gap-5 mt-[56px] lg:m-0">
        {isToggled && (
          <Suspense fallback={<LoaderMenu/>}>
            <LazyMenu />
          </Suspense>
        )}
        <NavigationMenu/>  
        <MainTitleAndDashboardContent/>
        <MainContent/>
      </div>
    </div>
  )
}

export default App;