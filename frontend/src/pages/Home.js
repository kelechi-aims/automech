import React from "react";
import { NavLink } from "react-router-dom";
//import background from './images/background.jpg';
import landing from './images/landing_img.png';

function Home() {
    return (    
          <div className="home">
           <div>
           <h1>Find Reliable<br /> Mechanics Nearby,<br /> Anytime.</h1>
            <p>Get your car fixed by trusted<br /> mechanics within your area with just a<br /> few clicks.</p>
            <NavLink to='signup' className={({ isActive }) => isActive ? "active-link" : ""}><button id="registerAsMechanic">Find Mechanics Now</button></NavLink>
          </div>
          <div>
            <img className="landing-img" src={landing} alt="landing"/>
           </div>
          </div>
    );
}

export default Home;