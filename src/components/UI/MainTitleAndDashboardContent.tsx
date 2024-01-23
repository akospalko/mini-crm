// Component for displaying the project's main title and dashboard section
import Dashboard from "../Dashboard";
import text from "../../data/text.json";

const MainTitleAndDashboardContent = () => {
  return (
    <div className="grid 
      grid-rows-[150px,1fr] lg:grid-rows-[1fr,2fr] 
      grid-cols-1
      lg:h-[calc(100vh-2*2rem)] 
      w-full 
      gap-5
      p-5 pb-0 lg:pb-5 lg:px-0
    ">
      <div className="flex h-full w-full bg-color_2 rounded lg:rounded-bl lg:rounded-br">
        <h1 className="
          text-4xl lg:text-5xl 
          text-center 
          m-auto 
          text-color_4
          select-none"
      > {text["title-main"]}
        </h1>
      </div>
      <Dashboard/>
    </div>
  )
}

export default MainTitleAndDashboardContent;