// Main page's content: displays client list, manage clients, manage properties
import { lazy, Suspense } from "react"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import { ACTIVE_MANAGEMENT, PAGE_ROUTES } from "../types/actionTypes"
import useClients from "../hooks/useClients"
import useProperty from "../hooks/useProperty"
import LoaderMainContent from "./LoaderMainContent"
import text from "../data/text.json"

// LAZY LOAD
const LazyMemoizedClientList = lazy(() => import("./ClientList"))
const LazyMemoizedManagement = lazy(() => import("./Management"))

const MainContent = () => {
  // ROUTE
  const location = useLocation()
  const currentPath = location.pathname

  // CONTEXT
  const { property } = useProperty()
  const { clients, filteredClients } = useClients()

  // CONDITIONAL DISPLAY
  let activeTitle: string
  switch (currentPath) {
    case PAGE_ROUTES.CLIENTS_LIST:
      activeTitle = text["title-content-clients-list"]
      break
    case PAGE_ROUTES.CLIENTS_FILTERED:
      activeTitle = text["title-content-clients-filtered"]
      break
    case PAGE_ROUTES.MANAGE_CLIENTS:
      activeTitle = text["title-content-clients-management"]
      break
    case PAGE_ROUTES.MANAGE_PROPERTIES:
      activeTitle = text["title-content-properties-management"]
      break
    default:
      activeTitle = text["content-title-content-unavailable"]
  }

  return (
    <div className="grid min-h-full w-full flex-1 grid-cols-1 grid-rows-[100px,1fr] justify-center gap-5 bg-color_1 px-5 pb-5 lg:gap-5 lg:overflow-y-scroll lg:p-5 lg:pl-0">
      <div className="flex h-full w-full overflow-hidden rounded pb-0 lg:rounded-bl lg:rounded-br">
        <h2 className="flex h-full w-full select-none items-center justify-center bg-color_2 text-center text-3xl text-color_4">
          {activeTitle}
        </h2>
      </div>
      <Suspense fallback={<LoaderMainContent />}>
        <Routes>
          <Route
            path={PAGE_ROUTES.CLIENTS_LIST}
            element={<LazyMemoizedClientList data={clients} />}
          />
          <Route
            path={PAGE_ROUTES.CLIENTS_FILTERED}
            element={<LazyMemoizedClientList data={filteredClients} />}
          />
          <Route
            path={PAGE_ROUTES.MANAGE_CLIENTS}
            element={
              <LazyMemoizedManagement
                data={clients}
                activeManagementTab={ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT}
              />
            }
          />
          <Route
            path={PAGE_ROUTES.MANAGE_PROPERTIES}
            element={
              <LazyMemoizedManagement
                data={property}
                activeManagementTab={ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT}
              />
            }
          />
          <Route
            path="/"
            element={<Navigate to={PAGE_ROUTES.CLIENTS_LIST} />}
          />
        </Routes>
      </Suspense>
    </div>
  )
}

export default MainContent
