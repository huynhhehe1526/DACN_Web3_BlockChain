import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/global.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './component_page/page/login.jsx'
import HomePage from './component_page/page/homepage.jsx'
import ContactPage from './component_page/page/contact.jsx'
import Formjsonschema from './component_page/page/formjsonschema.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // element: <div>Hello world!</div>,

    children: [
      {
        index: true,
        element: <HomePage />
      },

    ]
  },
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "contact",
    element: <ContactPage />
  },
  {
    path: "form",
    element: <Formjsonschema />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
