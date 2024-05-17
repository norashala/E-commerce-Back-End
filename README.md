# E-commerce Back End

This project is a backend system for an e-commerce website, designed to leverage the latest technologies to keep your company competitive in the online retail space. The backend is built using Express.js and Sequelize ORM to interact with a PostgreSQL database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Connect to a PostgreSQL database using Sequelize ORM.
- Automatically create and seed a development database.
- Start a server that syncs Sequelize models to the database.
- Perform CRUD operations on categories, products, and tags through API endpoints.
- Return data in formatted JSON via GET routes.
- Allow for data manipulation via POST, PUT, and DELETE routes.

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- Insomnia Core (for API testing)

## Installation

1. **Clone the repository:**
   ``` bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
    ```
2. **Install Dependecies** 
   ```bash
    npm install
    ```

3. **Create an environment variable file:**
    ```makefile
    DB_NAME=your_database_name
    DB_USER=your_postgresql_username
    DB_PASSWORD=your_postgresql_password
    DB_HOST=localhost
    DB_DIALECT=postgres
    ```

4. **Seed the database**
    ```javascript
    npm run seed
    ```
5. **Start the server**
    ```javascript 
    node server.js
    ```
    