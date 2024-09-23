import React from "react";
import './Myapp.css';
import RootLayout from './pages/layouts/RootLayout';
import Home from './pages/Home';
import About from "./pages/About";
import SignupMechanic from './pages/SignupMechanic';
import SignupCustomer from './pages/SignupCustomer';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

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
      <Route path="home" Component={Home}></Route>
      <Route path="about" Component={About}></Route>
      <Route path="login" Component={Login}></Route>
      <Route path="signup/customer" Component={SignupCustomer}></Route>
      <Route path="signup/mechanic" Component={SignupMechanic}></Route>

    </Route>
  )
)

function App() {
  return (
    <GoogleOAuthProvider clientId='888853476185-eshjpovutqo3eflgjtnrlsovi59frvti.apps.googleusercontent.com'>
      <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>
    
  )
}

export default App;