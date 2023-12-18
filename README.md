# AutoMech Locator

AutoMech Locator is a web application that connects car owners with qualified mechanics, making it easy for car owners to find reliable services for their vehicles.


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Visit the deployed site: [AutoMech Locator](https://www.automechlocator.tech/)

Check out the final project blog article on [Medium](https://medium.com/@kelechi.denise/navigating-the-roads-of-automech-locator-9c2b2786fed2)

Connect with the author(s) on LinkedIn:
- [Arukwe Kelechi Denise](https://www.linkedin.com/in/kelechi-denise)
- [Tolulope Abiola](https://www.linkedin.com/in/anoti-bills)

![AutoMech Locator](static/images/deploy_img.png)




## Features

- **User Authentication:** Secure user authentication system with options for car owners and mechanics.
- **Search Mechanics:** Find mechanics based on location and service type.
- **Mechanic Listing:** View a list of mechanics with essential information.
- **User Profile:** Display user details, including email, location, phone number, and registration date.
- **Request Service:** Users can request services directly from a mechanic's profile.
- **Responsive Design:** Ensures a seamless experience across different devices.

## Technologies Used

- Flask: The web framework used for backend development.
- Python: Objects for backend
- SQLAlchemy: ORM for managing database models.
- HTML, CSS, JavaScript: Frontend technologies.
- ... (List any additional technologies)

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/kelechi-aims/automech.git
   cd automech

2. Set Up Virtual Environment:

   ```bash
   python -m venv venv

   source venv/bin/activate  # On Windows, use 'venv\Scripts\activate'

3. Install Dependencies:

   ```bash
   pip install -r requirements.txt

4. Configure the Database:

- Modify the config.py file with your database connection details.
- Run the following commands:

   ```bash
   flask db init
   flask db migrate
   flask db upgrade

5. Run the Application:

   ```bash
   flask run

6. Open the App in Your Browser:
   Visit http://localhost:8000 in your web browser.

## Usage

- Register an account as a car owner or mechanic.
- Log in with your credentials.
- Search for mechanics based on location and service type.
- View mechanic profiles to see details like ratings, reviews, and services offered.
- Request services directly from a mechanic's profile.

## Contributing
- Fork the project.
- Create a new branch: git checkout -b feature/new-feature.
- Make changes and commit: git commit -m 'Add new feature'.
- Push to the branch: git push origin feature/new-feature.
- Open a pull request.

## License
- This project is licensed under the ALX License.
