// Loader for menu modal
import text from "../data/text.json"

const LoaderMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-color_1 bg-opacity-90">
      {text["loader"]}
    </div>
  )
}

export default LoaderMenu
