import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ClientsProvider } from "./context/clientContext.tsx"
import { FormProvider } from "./context/formContext.tsx"
import { ToggleMenuProvider } from "./context/toggleMenuContext.tsx"
import { PropertyProvider } from "./context/propertyContext.tsx"
import { BrowserRouter } from "react-router-dom"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToggleMenuProvider>
        <ClientsProvider>
          <PropertyProvider>
            <FormProvider>
              <App />
            </FormProvider>
          </PropertyProvider>
        </ClientsProvider>
      </ToggleMenuProvider>
    </BrowserRouter>
  </React.StrictMode>
)
