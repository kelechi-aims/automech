import React from "react";

const About = () => {
    return (
        <div className="container">
          {/* Section for 'About Us' content */}
          <section id="about">
            <h2>About Us</h2>

            {/* Inspiration Behind the Project */}
            <div className="inspiration">
              <h3>Inspiration Behind the project</h3>
              <p>
                As an automobile dealer deeply immersed in the world of cars, I've encountered the persistent challenge
                of finding reliable and efficient mechanics. Too often, getting a skilled professional to address specific
                car issues becomes a time-consuming and uncertain process.
              </p>

              <p>
                AutoMech Locator was born out of a genuine need within my professional network. Countless calls to friends
                and family in the same business revealed a shared struggle: finding trustworthy mechanics who could swiftly
                and effectively handle diverse car problems. It wasn't just a business challenge; our clients faced similar
                issues,leading to delays and frustrations in resolving their vehicle maintenance needs.
              </p>

              <p>
                This project, conceived as part of my portfolio for the Alx Full Stack program, aims to address this
                industry-wide challenge. What started as a web app for the end of the foundation section has grown
                into AutoMech Locator, a solution designed to streamline the process of connecting car owners with
                trustworthy mechanics.
              </p>
            </div>

            {/* Our Journey */}
            <div className="journey">
              <h3>Our Journey</h3>

              <p>
                While our current implementation represents a Minimum Viable Product, we're committed to enhancing
                AutoMech Locator with additional features. Our vision is to create a comprehensive platform that
                revolutionizes the way car owners and mechanics interact, making vehicle maintenance seamless and
                stress-free.
              </p>
            </div>

            {/* Meet the Team */}
            <div className="team">
              <h3>Meet the Team</h3>

              <ul>
                <li>
                  <strong>Tolulope Abiola</strong>
                  <br />
                  LinkedIn: <a href="https://www.linkedin.com/in/anoti-bills" target="_blank" rel="noopener noreferrer">Anoti Bills</a>
                  <br />
                  GitHub: <a href="https://github.com/Anotibills" target="_blank" rel="noopener noreferrer">Anotibills</a>
                  <br />
                  Twitter: <a href="https://twitter.com/AnotiBills" target="_blank" rel="noopener noreferrer">@AnotiBills</a>
                </li>

                <li>
                  <strong>Arukwe Kelechi Denise</strong>
                  <br />
                  LinkedIn: <a href="https://www.linkedin.com/in/kelechi-denise" target="_blank" rel="noopener noreferrer">Kelechi Denise</a>
                  <br />
                  GitHub: <a href="https://github.com/kelechi-aims" target="_blank" rel="noopener noreferrer">kelechi-aims</a>
                  <br />
                  Twitter: <a href="https://twitter.com/DeniseKelechi" target="_blank" rel="noopener noreferrer">@DeniseKelechi</a>
                </li>
              </ul>
            </div> 

            {/* Expolre Our Project */}
            <div className="expolre">
              <h3>Explore Our Project</h3>
              <span>Feel free to explore our journey on <a href="https://github.com/kelechi-aims/AutoMech-Locator.git" target="_blank" rel="noopener noreferrer">GitHub</a></span>
            </div>
          </section>
          
        </div>
    );
}

export default About;