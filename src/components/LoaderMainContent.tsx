// Loader for main content
import text from "../data/text.json";

const LoaderMainContent = () => {

  return (
    <div className="flex justify-center items-center flex-col w-full gap-5 py-5">
      <span>{text["loader"]}</span>
    </div>
  )
}

export default LoaderMainContent;