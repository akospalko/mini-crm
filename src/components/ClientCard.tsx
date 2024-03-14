// Client list member element - card item
import {
  ClientCardPropsI,
  // PropertyItemRemappedT,
  // PropertyTypeE,
  // ClientKeys,
  // ClientPropertyI,
} from "../types/types"
// import text from "../data/text.json"

// COMPONENT
const ClientCard = ({ clientData }: ClientCardPropsI) => {
  console.log(JSON.stringify(clientData))

  // JSX
  return (
    <div className="flex flex-col rounded-md bg-color_2 p-5">
      {Object.entries(clientData).map(([key, value]) => (
        <div
          key={key}
          className="my-2 flex h-10 items-center justify-center rounded-md text-xl text-color_3 first:mt-0"
          data-testid="client-list-card"
        >
          <div className="text-color-4 items-centertruncate flex h-full w-[200px] justify-center rounded bg-color_6 p-2 text-base capitalize">
            {" "}
            {key}{" "}
          </div>
          <div className="flex h-full w-full items-center pl-2 text-base">
            {" "}
            {value || "-"}
          </div>
        </div>
      ))}
    </div>
  )
}
export default ClientCard
