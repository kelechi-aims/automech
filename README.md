# AutoMech Locator

AutoMech Locator is a web application that connects car owners with qualified mechanics, making it easy for car owners to find reliable services for their vehicles.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Car owners can search for mechanics based on location and services offered.
- Mechanics can register, create profiles, and manage service requests.
- Users can leave reviews and ratings for mechanics.
- ... (Add more features as we implement them)

## Technologies Used

- Flask: The web framework used for backend development.
- SQLAlchemy: ORM for managing database models.
- HTML, CSS, JavaScript: Frontend technologies.
- ... (List any additional technologies)

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/kelechi-aims/AutoMech-Locator.git
   cd AutoMech-Locator

2. Set Up Virtual Environment:

   python -m venv venv

   source venv/bin/activate  # On Windows, use 'venv\Scripts\activate'

3. Install Dependencies:

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
   Visit http://localhost:5000 in your web browser.

## Usage(TO DO)

- Describe how users can use your application.
- Include any important instructions or usage details.

## Contributing
- If you'd like to contribute to the project, follow the Contribution Guidelines.

## License
- This project is licensed under the MIT License.
