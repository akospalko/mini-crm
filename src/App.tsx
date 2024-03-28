// Main Layout
import { lazy, Suspense } from "react";
import NavigationMenu from "./components/NavigationMenu";
import MainContent from "./components/MainContent";
import LoaderMenu from "./components/LoaderMenu";
import MainTitleAndDashboardContent from "./components/UI/MainTitleAndDashboardContent";
import useToggleMenu from "./hooks/useToggleMenu";

// LAZY LOAD
const LazyMenu = lazy(() => import("./components/UI/Menu"));

function App() {
  // CONTEXT
  const { isToggled } = useToggleMenu();

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-y-auto md:bg-color_1 lg:h-screen lg:overflow-hidden lg:bg-color_5 lg:p-[2rem]">
      <div className="mt-[56px] grid w-full grid-flow-row grid-cols-1 gap-5 self-center overflow-hidden rounded bg-color_1 lg:m-0 lg:h-[calc(100vh-2*2rem)] lg:grid-cols-[56px,1fr,1.5fr] xl:w-[1200px]">
        {isToggled && (
          <Suspense fallback={<LoaderMenu />}>
            <LazyMenu />
          </Suspense>
        )}
        <NavigationMenu />
        <MainTitleAndDashboardContent />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
