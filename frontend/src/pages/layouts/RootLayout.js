import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../images/logo.svg';
import { Dropdown } from 'react-bootstrap';

const RootLayout = () => {
    return (
        <div className="firstdiv">
          <div className="menu">
            <header>
              
                <ul className="col-3 cta-0">
                    <li className="logo">
                      <NavLink to='/'>
                        <img
                         src={logo}
                         alt="Logo" 
                         style={{ 
                          position: 'relative', 
                          left: '15%', 
                          top: '28%', 
                          width: '120px', 
                          height: '45px', 
                          'border-radius': '30px', 
                          'flex-shrink': '0'
                         }} >
                        </img>
                        </NavLink>
                    </li>
                </ul>

                <ul className="cta-1">
                  <li>
                    <NavLink to='home' className={({ isActive }) => isActive ? "active-link" : ""}>
                      <button id="home">Home</button>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='about' className={({ isActive }) => isActive ? "active-link" : ""}>
                      <button id="about">About</button>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='login' className={({ isActive }) => isActive ? "active-link" : ""}>
                      <button id="loginButton">Login</button>
                      </NavLink>
                  </li>
                  <li>
                    {/* React-Bootstrap Dropdown */}
                    <Dropdown>
                     <Dropdown.Toggle
                       as="button"
                       id="signup"
                     >
                        Sign Up 
                     </Dropdown.Toggle> 

                     <Dropdown.Menu 
                     className="custom-dropdown-menu">
                       <Dropdown.Item as={NavLink} to="signup/customer" 
                         className="custom-dropdown-item">
                         As A Car Owner
                       </Dropdown.Item>
                       <Dropdown.Item as={NavLink} to="signup/mechanic" 
                         className="custom-dropdown-item">
                         As A Mechanic
                       </Dropdown.Item> 
                     </Dropdown.Menu>                    
                     </Dropdown>
                    </li>
                </ul>
              
            </header>
          </div>
          <main>
            <Outlet />
          </main>
          <div>
          <footer className="footer">
            <p>&copy; 2023 AutoMech Locator. All rights reserved.</p>
          </footer>
          </div>
        </div>
    );
}

export default RootLayout;
