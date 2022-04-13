// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React, { useState, useEffect } from "react";

import Content from "./components/Content";
import Dashboard from "./pages/Dashboard";

import ClipLoader from "react-spinners/ClipLoader";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Idlelogin from "./components/Idlelogin";
import Todos from "./pages/Todos";
import Newtodo from "./pages/Newtodo";
import Todoedit from "./pages/Todoedit";
import Notfound from "./pages/Notfound";

export const globalContext = React.createContext();

const queryClinet = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);
  const context = {
    brand_name: "todofi",
    support_email: "support@todofi.com",
  };

  useEffect(() => {
    document.title = "Login";
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  var css = ` margin-top: 20% !important;`;

  return (
    <globalContext.Provider value={context}>
      <QueryClientProvider client={queryClinet}>
        <BrowserRouter>
          <ToastContainer />
          <Idlelogin />
          <div Header="App">
            <Routes>
              <Route path="/" element={<Content children={<Dashboard />} />} />
              <Route
                path="/dashboard/"
                element={<Content children={<Dashboard />} />}
              />
              <Route
                path="/todofi/"
                element={<Content children={<Dashboard />} />}
              />
              <Route
                path="/todos/"
                element={<Content children={<Todos />} />}
              />
              <Route
                path="/new/todo/"
                element={<Content children={<Newtodo />} />}
              />
              <Route
                path="/todos/edit/:id"
                element={<Content children={<Todoedit />} />}
              />

              <Route path="/login/" element={<Login />} />
              <Route
                path="/register/"
                element={<Content children={<Register />} />}
              />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </div>
        </BrowserRouter>

        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </globalContext.Provider>
  );
}

export default App;
