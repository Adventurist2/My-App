# Todo Application

This is a simple Todo application that allows users to manage their tasks efficiently. The application consists of a React frontend and an Express backend, utilizing JWT for authentication and MongoDB for data storage.

## Features

- User registration and authentication
- Add, update, and delete todo items
- User profile management
- Responsive design with a user-friendly interface

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Express, Node.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS and React Icons

## Installation

To set up the application locally, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git (for version control)

### Clone the Repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```
### Backend Setup
1.**Navigate to the backend directory**:

```bash
cd backend
```
2.**Install the required dependencies**:


```bash
npm install
```
3.**Create a .env file in the backend directory and add the following variables**:

```plaintext
REACT_JWT_KEY=your_secret_key
MONGO_URI=your_mongodb_connection_string
```
3.**Start the backend server** :

```bash
nodemon ./index.js
```
### Frontend Setup
1.**Open a new terminal and navigate to the frontend directory**:

```bash
cd frontend
```
2.**Install the required dependencies** :

```bash
npm install
```
3.**Start the frontend application** :

```bash
npm run dev
```
### Usage
1.Navigate to http://localhost:3000 in your browser.

2.You can register a new account or log in if you already have an account.

3.Once logged in, you can view, add, update, and delete your todo items.

### API Endpoints
#### User Registration
POST `/signup`

Request Body:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```
### User Login
POST `/login`

Request Body:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```
### Fetch User Profile
GET `/profile`
Headers:

```plaintext
Authorization: Bearer <your_jwt_token>
```
### Update User Profile
POST `/profile`

Request Body:

```json
{
  "new_array": [
    {
      "title": "Todo Title",
      "description": "Todo Description"
    }
  ],
  "username": "your_username"
}
```
## Contributing
**Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss improvements or new features.**

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Copyright (c) **2024** **Adventurist2**

