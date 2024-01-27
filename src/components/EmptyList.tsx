// Reusable empty list element
import text from "../data/text.json"
import testID from "../data/data_test_id.json"

interface EmptyListI {
  content?: string
}

const EmptyList = ({ content }: EmptyListI) => {
  return (
    <div
      data-testid={testID["empty-list"]}
      className="flex flex-col items-center rounded-md bg-color_accent_secondary p-4 font-roboto text-lg font-medium text-color_1"
    >
      {content || text["empty-list"]}
    </div>
  )
}

export default EmptyList
