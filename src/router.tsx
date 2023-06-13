/*
DOM дерево. 
В идеале надо строить его автоматически, как минимум на основе содержимого './routes/pages/'
*/

import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "./routes/error-page";
import Root from "./routes/root";

import Effector from "./routes/pages/effector";
import ReactFlow from "./routes/pages/reactFlow";
import Api from "./routes/pages/api";
import Table from "./routes/pages/table";
import Main from "./routes/pages/index";

export const MenuList = [
  {
    name: "Api",
    path: "api",
    element: <Api />,
  },
  {
    name: "Effector",
    path: "effector",
    element: <Effector />,
  },
  {
    name: "ReactFlow",
    path: "reactFlow",
    element: <ReactFlow />,
  },
  {
    name: "Table",
    path: "table",
    element: <Table />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/bktrProject/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: MenuList.map((value) => ({
      path: value.path,
      element: value.element,
    })).concat({ path: "", element: <Main /> }),
  },
]);
