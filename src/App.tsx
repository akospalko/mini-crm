import useToggleMenu from "./hooks/useToggleMenu";
import Dashboard from "./components/Dashboard";
import Menu from "./components/UI/Menu";
import NavigationMenu from "./components/NavigationMenu";
import MainContent from "./components/MainContent";
import text from "./data/text.json";

function App() {
  // CONTEXT
  const {isToggled} = useToggleMenu();
  
  return (
    <div className="flex flex-col h-screen w-full p-[2rem]">
      <div className="bg-gray-800 grid grid-cols-[60px,1fr,1.5fr] h-[calc(100vh-2*2rem)] grid-flow-row w-full xl:w-[1200px] self-center rounded overflow-hidden gap-5">
        {isToggled && <Menu/>}
        <NavigationMenu/>  
        <div className="grid grid-rows-[1fr,2fr] h-[calc(100vh-2*2rem)] w-full gap-5">
          <div className="flex h-full w-full bg-slate-500 rounded-bl rounded-br">
            <h1 className="text-5xl text-center m-auto text-gray-100 select-none">
              {text["title-main"]}
            </h1>
          </div>
          <Dashboard/>
        </div>
        <MainContent/>
      </div>
    </div>
  )
}

export default App;