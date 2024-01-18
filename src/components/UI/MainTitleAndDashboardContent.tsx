// Component for displaying the project's main title and dashboard section
import Dashboard from "../Dashboard";
import text from "../../data/text.json";

const MainTitleAndDashboardContent = () => {
  return (
    <div className="grid grid-rows-[1fr,2fr] h-[calc(100vh-2*2rem)] w-full gap-5">
      <div className="flex h-full w-full bg-slate-500 rounded-bl rounded-br">
        <h1 className="text-5xl text-center m-auto text-gray-100 select-none">
          {text["title-main"]}
        </h1>
      </div>
      <Dashboard/>
    </div>
  )
}

export default MainTitleAndDashboardContent;