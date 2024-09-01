import React from "react";
import background from './images/background.jpg';

function Home() {
    return (    
        <>
          <div className="home">
            <img className="background-img" src={background} alt="Background"/>
            <h1><b>Wherever you are</b></h1>
            <p>AutoMech Locator is your go-to platform for connecting with trusted and experienced mechanics. Discover skilled professionals ready to cater to your vehicle's maintenance and repair needs. Our featured mechanics exemplify expertise, reliability, and a commitment to exceptional service</p>
          </div>
        </>
    );
}

export default Home;