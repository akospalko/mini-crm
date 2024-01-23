// Main page's content: displays client list, manage clients, manage properties
import {lazy, Suspense} from "react";
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import {ACTIVE_MANAGEMENT, PAGE_ROUTES} from "../types/actionTypes";
import useClients from "../hooks/useClients";
import useProperty from "../hooks/useProperty";
import LoaderMainContent from "./LoaderMainContent";
import text from "../data/text.json";

// LAZY LOAD
const LazyMemoizedClientList = lazy(() => import("./ClientList"));
const LazyMemoizedManagement = lazy(() => import("./Management"));

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
    <div className="grid flex-1 grid-rows-[100px,1fr] grid-cols-1 justify-center w-full min-h-full lg:overflow-y-scroll bg-color_1 px-5 pb-5 lg:p-5 lg:pl-0 gap-5 lg:gap-5">
      <div className="flex h-full w-full rounded lg:rounded-bl lg:rounded-br pb-0 overflow-hidden">
        <h2 className="flex justify-center items-center h-full w-full text-3xl text-center bg-color_2 text-color_4 select-none">{activeTitle}</h2>
      </div>
      <Suspense fallback={<LoaderMainContent/>}>
        <Routes>
          <Route path={PAGE_ROUTES.CLIENTS_LIST} element={<LazyMemoizedClientList data={clients}/>}/>
          <Route path={PAGE_ROUTES.CLIENTS_FILTERED} element={<LazyMemoizedClientList data={filteredClients}/>}/>
          <Route path={PAGE_ROUTES.MANAGE_CLIENTS} element={<LazyMemoizedManagement data={clients} activeManagementTab={ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT}/>}/>
          <Route path={PAGE_ROUTES.MANAGE_PROPERTIES} element={<LazyMemoizedManagement data={property} activeManagementTab={ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT}/>}/>
          <Route path="/" element={<Navigate to={PAGE_ROUTES.CLIENTS_LIST}/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default MainContent;