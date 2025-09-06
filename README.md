# 💬 MERN Messaging App

Welcome to the MERN Messaging App! This is a full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and powered by Socket.IO for seamless communication. 🚀

## ✨ Features

-   **User Authentication:** Secure user registration and login system. 🔐
-   **Real-Time Messaging:** Instantaneous message delivery using Socket.IO. ⚡
-   **Online User Status:** See which users are currently online. 🟢
-   **User Search:** Easily find and start conversations with other users. 🔍
-   **Modern UI:** A clean and responsive user interface built with React and Tailwind CSS. 🎨

## 🛠️ Technologies Used

### Frontend

-   **React.js:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool for modern web development.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
-   **DaisyUI:** A component library for Tailwind CSS.
-   **Zustand:** A small, fast, and scalable state-management solution for React.
-   **Socket.IO Client:** For real-time, bidirectional event-based communication.
-   **React Router DOM:** For declarative routing in React applications.

### Backend

-   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
-   **Express.js:** A minimal and flexible Node.js web application framework.
-   **MongoDB:** A NoSQL database for storing application data.
-   **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
-   **Socket.IO:** Enables real-time, bidirectional and event-based communication.
-   **JSON Web Tokens (JWT):** For secure user authentication.
-   **Bcrypt.js:** A library for hashing passwords.
-   **Cookie-Parser:** Middleware for parsing cookies.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js and npm (or yarn) installed.
-   MongoDB installed and running, or a connection string to a cloud MongoDB instance.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/uditc0derr/MernMessagingApp
    cd MernMessagingApp
    ```

2.  **Setup the Backend:**
    -   Navigate to the `backend` directory:
        ```sh
        cd backend
        ```
    -   Install the dependencies:
        ```sh
        npm install
        ```
    -   Create a `.env` file in the `backend` directory and add the following environment variables:
        ```
        PORT=5000
        MONGO_DB_URI=<YOUR_MONGODB_CONNECTION_STRING>
        JWT_SECRET=<YOUR_JWT_SECRET>
        NODE_ENV=development
        ```
    -   Start the backend server:
        ```sh
        npm start
        ```

3.  **Setup the Frontend:**
    -   Navigate to the `frontend` directory:
        ```sh
        cd ../frontend
        ```
    -   Install the dependencies:
        ```sh
        npm install
        ```
    -   Start the frontend development server:
        ```sh
        npm run dev
        ```

The application should now be running, with the frontend accessible at `http://localhost:5173` and the backend at `http://localhost:5000`.

## 📜 Available Scripts

### Backend

-   `npm start`: Starts the backend server.
-   `npm run dev`: Starts the backend server with `nodemon` for automatic restarts during development.

### Frontend

-   `npm run dev`: Starts the frontend development server.
-   `npm run build`: Builds the production-ready version of the frontend.
-   `npm run preview`: Previews the production build locally.

Enjoy chatting! 🎉
