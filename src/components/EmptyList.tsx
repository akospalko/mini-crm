// Reusable empty list element
import text from "../data/text.json";

interface EmptyListI {
  content?: string
}

const EmptyList = ({content}: EmptyListI) => {
  return (
    <div className="flex flex-col p-4 bg-slate-500 rounded-md items-center text-lg">{content || text["empty-list"]}</div>
  )
}

export default EmptyList;