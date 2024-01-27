// Loader for main content
import text from "../data/text.json"

const LoaderMainContent = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 py-5">
      <span>{text["loader"]}</span>
    </div>
  )
}

export default LoaderMainContent
