// Component for displaying the project's main title and dashboard section
import Dashboard from "../Dashboard"
import text from "../../data/text.json"

const MainTitleAndDashboardContent = () => {
  return (
    <div
      className="grid 
      w-full grid-cols-1 
      grid-rows-[150px,1fr]
      gap-5 
      p-5 
      pb-0
      lg:h-[calc(100vh-2*2rem)] lg:grid-rows-[1fr,2fr] lg:px-0 lg:pb-5
    "
    >
      <div className="flex h-full w-full rounded bg-color_2 lg:rounded-bl lg:rounded-br">
        <h1
          className="
          m-auto select-none 
          text-center 
          text-4xl 
          text-color_4
          lg:text-5xl"
        >
          {" "}
          {text["title-main"]}
        </h1>
      </div>
      <Dashboard />
    </div>
  )
}

export default MainTitleAndDashboardContent
