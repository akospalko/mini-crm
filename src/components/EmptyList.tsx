// Reusable empty list element

interface EmptyListI {
  content?: string
}

const EmptyList = ({content}: EmptyListI) => {
  return (
    <div className="flex flex-col p-4 bg-slate-500 rounded-md items-center text-lg">{content || "There is nothing to display"}</div>
  )
}

export default EmptyList;