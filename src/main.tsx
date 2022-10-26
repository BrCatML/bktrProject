import React from "react"
import ReactDOM from "react-dom/client"
import {RouterProvider} from "react-router-dom"
import {router} from "./router" // здесь dom дерево

import './static/index.css'
import './static/antd.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode> - вызывает рендер дважды. убрала
      <RouterProvider router={router} />
  // </React.StrictMode>
)
