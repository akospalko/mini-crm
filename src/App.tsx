// Main Layout
import {lazy, Suspense} from 'react';
import NavigationMenu from "./components/NavigationMenu";
import MainContent from "./components/MainContent";
import LoaderMenu from './components/LoaderMenu';
import MainTitleAndDashboardContent from './components/UI/MainTitleAndDashboardContent';
import useToggleMenu from "./hooks/useToggleMenu";

// LAZY LOAD
const LazyMenu = lazy(() => import("./components/UI/Menu"));

function App() {
  // CONTEXT
  const {isToggled} = useToggleMenu();
  
  return (
    <div className="flex flex-col h-screen w-full p-[2rem]">
      <div className="bg-gray-800 grid grid-cols-[60px,1fr,1.5fr] h-[calc(100vh-2*2rem)] grid-flow-row w-full xl:w-[1200px] self-center rounded overflow-hidden gap-5">
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