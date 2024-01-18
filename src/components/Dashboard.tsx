// Display of client metrics/statistics: aggregate of clients / position
import useGroupedPositions from "../hooks/useGroupedPositions";
import {JobPositionsE} from "../types/types";
import useClients from "../hooks/useClients";
import {useNavigate} from "react-router-dom";
import {PAGE_ROUTES} from "../types/actionTypes";

const Dashboard = () => {
// ROUTE

const navigate = useNavigate();
// HOOK
const clientPerPosition = useGroupedPositions();

// CONTEXT
const {clients, dispatch, REDUCER_ACTIONS_CLIENT} = useClients();

// HANDLER
// Filter clients with a specified position
const filterClientsHandler = (position: JobPositionsE) => {
  // filter
  const filteredClients = clients?.filter(client => client.position === position);
  // update state
  dispatch({
    type: REDUCER_ACTIONS_CLIENT.UPDATE_FILTERED_CLIENTS,
    payload: {filteredClients},
  });
  // navigate to filtered clients page
  navigate(PAGE_ROUTES.CLIENTS_FILTERED);
};

return (
    <div className="grid grid-rows-[100px,1fr] grid-cols-1 justify-center items-center flex-col w-full p-5 bg-slate-500 rounded-tr">
      <h2 className="text-3xl text-center"> Dashboard </h2>
      <div className="grid gap-5 w-full grid-cols-[repeat(3,1fr)] grid-rows-auto self-start">
      {clientPerPosition
        .filter(positionItem => positionItem.numberOfClients > 0)
        .map(positionItem => (
          <div
            title={`${positionItem.position}: ${positionItem.numberOfClients}`}
            className="flex flex-col w-full h-[100px] bg-gray-800 hover:bg-gray-900 text-gray-300 rounded cursor-pointer"
            key={positionItem.position}
            onClick={() => filterClientsHandler(positionItem.position)}
          >
            <div className="flex flex-1 justify-center items-center text-5xl select-none">{positionItem.numberOfClients}</div>
            <div className="flex justify-center items-center h-[40px] select-none">{positionItem.position}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;