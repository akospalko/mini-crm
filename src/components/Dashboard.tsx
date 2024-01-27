// Display of client metrics/statistics: aggregate of clients / position
import { useNavigate } from "react-router-dom"
import useGroupedPositions from "../hooks/useGroupedPositions"
import useClients from "../hooks/useClients"
import { JobPositionsE } from "../types/types"
import { PAGE_ROUTES } from "../types/actionTypes"
import text from "../data/text.json"

const Dashboard = () => {
  // ROUTE
  const navigate = useNavigate()

  // HOOK
  const clientPerPosition = useGroupedPositions()

  // CONTEXT
  const { clients, dispatch, REDUCER_ACTIONS_CLIENT } = useClients()

  // HANDLER
  // Filter clients with a specified position
  const filterClientsHandler = (position: JobPositionsE) => {
    // filter
    const filteredClients = clients?.filter(
      (client) => client.position === position
    )
    // update state
    dispatch({
      type: REDUCER_ACTIONS_CLIENT.UPDATE_FILTERED_CLIENTS,
      payload: { filteredClients },
    })
    // navigate to filtered clients page
    navigate(PAGE_ROUTES.CLIENTS_FILTERED)
  }

  return (
    <div className="grid w-full grid-cols-1 grid-rows-[100px,1fr] flex-col items-center justify-center gap-5 rounded lg:rounded-tr">
      <h2 className="flex h-full w-full select-none items-center justify-center  rounded bg-color_2 text-3xl">
        {text["title-dashboard"]}
      </h2>
      <div className="grid-rows-auto grid w-full grid-cols-2 gap-5 self-start sm:grid-cols-[repeat(3,1fr)] md:grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(3,1fr)]">
        {clientPerPosition
          // .filter(positionItem => positionItem.numberOfClients > 0)
          .map((positionItem) => (
            <div
              title={`${positionItem.position}: ${positionItem.numberOfClients}`}
              className="flex h-[150px] w-full cursor-pointer flex-col rounded bg-color_2 hover:outline hover:outline-color_accent lg:h-[100px]"
              key={positionItem.position}
              onClick={() => filterClientsHandler(positionItem.position)}
            >
              <div className="flex flex-1 select-none items-center justify-center text-6xl text-color_accent lg:text-5xl">
                {positionItem.numberOfClients}
              </div>
              <div className="flex h-[50px] select-none items-center justify-center text-2xl text-color_3 lg:h-[40px] lg:text-lg">
                {positionItem.position}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard
