import React from "react";
import './App.css';
import RootLayout from './pages/layouts/RootLayout';
import Home from './pages/Home';
import About from "./pages/About";
import SignupMechanic from './pages/SignupMechanic';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' Component={RootLayout}>
      <Route index Component={Home}></Route>
      <Route path="about" Component={About}></Route>
      <Route path="mechchanicsignup" Component={SignupMechanic}></Route>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;