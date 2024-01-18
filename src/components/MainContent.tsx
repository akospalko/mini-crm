// Main page's content: displays client list, manage clients, manage properties
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import MemoizedClientList from "./ClientList";
import MemoizedManagement from "./Management";
import {ACTIVE_MANAGEMENT, PAGE_ROUTES} from '../types/actionTypes';
import useClients from "../hooks/useClients";
import useProperty from "../hooks/useProperty";

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
      activeTitle = "Clients";
      break;
    case PAGE_ROUTES.CLIENTS_FILTERED:
      activeTitle = "Filtered Clients";
      break;
    case PAGE_ROUTES.MANAGE_CLIENTS:
      activeTitle = "Manage Clients" 
      break;
    case PAGE_ROUTES.MANAGE_PROPERTIES:
      activeTitle = "Manage Properties";
      break;
    default: 
    activeTitle = "Content Unavailable";
  }

  return (
    <div className="grid grid-rows-[100px,1fr] grid-cols-1 justify-center w-full h-full overflow-y-scroll pr-5">
      <div className="flex h-full w-full  rounded-bl rounded-br pb-0 overflow-hidden">
        <h2 className="flex justify-center items-center h-full w-full text-3xl text-center bg-slate-500 text-gray-300">{activeTitle}</h2>
      </div>
      <Routes>
        <Route path="/clients" element={<MemoizedClientList data={clients}/>}/>
        <Route path="/clients-filtered" element={<MemoizedClientList data={filteredClients}/>}/>
        <Route path="/manage-clients" element={<MemoizedManagement data={clients} activeManagementTab={ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT}/>}/>
        <Route path="/manage-properties" element={<MemoizedManagement data={property} activeManagementTab={ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT}/>}/>
        <Route path="/" element={<Navigate to="/clients"/>}/>
      </Routes>
    </div>
  )
}

export default MainContent;