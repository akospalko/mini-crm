// Loader for menu modal
import text from "../data/text.json";

const LoaderMenu = () => {
  return (
    <div className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-color_1 bg-opacity-90 z-10">
      {text["loader"]}
    </div>
  )
}

export default LoaderMenu;