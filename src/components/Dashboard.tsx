// Display of client metrics/statistics: aggregate of clients / position
import {useNavigate} from "react-router-dom";
import useGroupedPositions from "../hooks/useGroupedPositions";
import useClients from "../hooks/useClients";
import {JobPositionsE} from "../types/types";
import {PAGE_ROUTES} from "../types/actionTypes";
import text from "../data/text.json";

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
    <div className="grid grid-rows-[100px,1fr] grid-cols-1 justify-center items-center flex-col w-full rounded lg:rounded-tr gap-5">
      <h2 className="flex justify-center items-center h-full w-full text-3xl  bg-color_2 rounded select-none">{text["title-dashboard"]}</h2>
      <div className="grid w-full grid-cols-2 sm:grid-cols-[repeat(3,1fr)] md:grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(3,1fr)] grid-rows-auto self-start gap-5">
      {clientPerPosition
        // .filter(positionItem => positionItem.numberOfClients > 0)
        .map(positionItem => (
          <div
            title={`${positionItem.position}: ${positionItem.numberOfClients}`}
            className="flex flex-col w-full h-[150px] lg:h-[100px] bg-color_2 hover:outline hover:outline-color_accent rounded cursor-pointer"
            key={positionItem.position}
            onClick={() => filterClientsHandler(positionItem.position)}
          >
            <div className="flex flex-1 justify-center items-center text-color_accent text-6xl lg:text-5xl select-none">{positionItem.numberOfClients}</div>
            <div className="flex justify-center items-center h-[50px] text-2xl lg:text-lg lg:h-[40px] text-color_3 select-none">{positionItem.position}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;