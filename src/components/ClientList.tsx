// Display a list of clients: full (default) or filtered (based on role)
import {memo} from "react";
import ClientCard from "./ClientCard";
import {ClientItemI} from "../types/types";
import EmptyList from "./EmptyList";

interface ClientListPropsI {
  data: ClientItemI[]
}

const ClientList = ({data}: ClientListPropsI) => {
  // JSX
  const displayedList = data?.map((client: ClientItemI) => (<ClientCard key={client.id} clientData={client}/>));

  return (
    <div data-testid="client-list" className="flex flex-col w-full gap-5">
      {data.length > 0 ? displayedList : <EmptyList/>}
    </div>
  );
};

const MemoizedCartLineItem = memo(ClientList);
export default MemoizedCartLineItem;