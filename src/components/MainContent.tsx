// Main page's content: displays client list, manage clients, manage properties
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import MemoizedClientList from "./ClientList";
import MemoizedManagement from "./Management";
import {ACTIVE_MANAGEMENT, PAGE_ROUTES} from '../types/actionTypes';
import useClients from "../hooks/useClients";
import useProperty from "../hooks/useProperty";
import text from "../data/text.json";

const MainContent = () => {
  // ROUTE
  const location = useLocation();
  const currentPath = location.pathname;

  // CONTEXT
  const {property} = useProperty();
  const {clients, filteredClients} = useClients();
  
  // CONDITIONAL DISPLAY
  let activeTitle: string;
  switch(currentPath) {
    case PAGE_ROUTES.CLIENTS_LIST:
      activeTitle = text["title-content-clients-list"];
      break;
    case PAGE_ROUTES.CLIENTS_FILTERED:
      activeTitle = text["title-content-clients-filtered"];
      break;
    case PAGE_ROUTES.MANAGE_CLIENTS:
      activeTitle = text["title-content-clients-management"];
      break;
    case PAGE_ROUTES.MANAGE_PROPERTIES:
      activeTitle = text["title-content-properties-management"];
      break;
    default: 
    activeTitle = text["content-title-content-unavailable"];
  }

  return (
    <div className="grid grid-rows-[100px,1fr] grid-cols-1 justify-center w-full h-full overflow-y-scroll pr-5">
      <div className="flex h-full w-full  rounded-bl rounded-br pb-0 overflow-hidden">
        <h2 className="flex justify-center items-center h-full w-full text-3xl text-center bg-slate-500 text-gray-300">{activeTitle}</h2>
      </div>
      <Routes>
        <Route path={PAGE_ROUTES.CLIENTS_LIST} element={<MemoizedClientList data={clients}/>}/>
        <Route path={PAGE_ROUTES.CLIENTS_FILTERED} element={<MemoizedClientList data={filteredClients}/>}/>
        <Route path={PAGE_ROUTES.MANAGE_CLIENTS} element={<MemoizedManagement data={clients} activeManagementTab={ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT}/>}/>
        <Route path={PAGE_ROUTES.MANAGE_PROPERTIES} element={<MemoizedManagement data={property} activeManagementTab={ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT}/>}/>
        <Route path="/" element={<Navigate to={PAGE_ROUTES.CLIENTS_LIST}/>}/>
      </Routes>
    </div>
  )
}

export default MainContent;