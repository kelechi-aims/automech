import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../images/logo.svg';

const RootLayout = () => {
    return (
        <div className="firstdiv">
          <div className="menu">
            <header>
              
                <ul className="col-3 cta-0">
                    <li style={{float: "left"}}>
                      <NavLink to='/'><img src={logo} alt="Logo" style={{width: '120px', height: '54px'}}></img></NavLink>
                    </li>
                </ul>

                <ul className="col-9 cta-1">
                  <li><NavLink to='about' className={({ isActive }) => isActive ? "active-link" : ""}><button id="About">About</button></NavLink></li>
                  <li><NavLink to='search' className={({ isActive }) => isActive ? "active-link" : ""}><button id="findMechanicButton">Find a Mechanic</button></NavLink></li>
                  <li><NavLink to='login' className={({ isActive }) => isActive ? "active-link" : ""}><button id="loginButton">Login</button></NavLink></li>
                  <li><NavLink to='mechchanicsignup' className={({ isActive }) => isActive ? "active-link" : ""}><button id="registerAsMechanic">Signup as a Mechanic</button></NavLink></li>
                  <li><NavLink to='carownersignup' className={({ isActive }) => isActive ? "active-link" : ""}><button id="registerAsCarOwner">Signup as a Car Owner</button></NavLink></li>
                </ul>
              
            </header>
          </div>
          <main>
              <Outlet />
          </main>

          <footer className="footer">
            <p>&copy; 2023 AutoMech Locator. All rights reserved.</p>
          </footer>
        </div>
    );
}

export default RootLayout;
