# Link Shortener

A full-stack link shortener application built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS and Shadcn UI. This application allows users to shorten long URLs, manage their links through a dashboard, and view analytics on link performance.

## Features

-   **User Authentication**: Secure user sign-up and login system using JWT (JSON Web Tokens) and cookies.
-   **Link Shortening**: Authenticated users can create custom, shortened links. Public users can create temporary links that expire in 7 days.
-   **Dashboard**: A comprehensive dashboard for authenticated users to view, manage, and delete their links.
-   **Analytics**: Users can view analytics for their links, including total clicks, total links, and a 7-day click history chart.
-   **Interactive UI**: A sleek, modern, and responsive user interface built with React, Shadcn UI, and Framer Motion for animations.

## Tech Stack

**Frontend:**
-   **Framework**: React 19
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: Shadcn UI
-   **Routing**: React Router
-   **Animations**: Framer Motion
-   **Charts**: Recharts
-   **Notifications**: Sonner

**Backend:**
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT), bcrypt
-   **Middleware**: CORS, Cookie Parser

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   Node.js (v20.17.0 or later)
-   npm (v11.6.0 or later)
-   MongoDB (local instance or a cloud-based service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/link-shortener.git](https://github.com/yourusername/link-shortener.git)
    cd link-shortener
    ```

2.  **Set up the Backend:**
    -   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    -   Install the dependencies:
        ```bash
        npm install
        ```
    -   Create a `.env` file in the `backend` directory and add the following environment variables. Replace the placeholder values with your own.
        ```env
        MONGO_URI=your_mongodb_connection_string
        VITE_BACKEND_PORT=3002
        VITE_FRONTEND_URL=http://localhost:5173
        JWT_SECRET=your_super_secret_jwt_key
        ```

3.  **Set up the Frontend:**
    -   Navigate to the frontend directory from the root folder:
        ```bash
        cd frontend
        ```
    -   Install the dependencies:
        ```bash
        npm install
        ```
    -   Create a `.env` file in the `frontend` directory. It should already contain the backend API URL.
        ```env
        VITE_API_URL='http://localhost:3002'
        ```

### Running the Application

1.  **Start the Backend Server:**
    -   In the `backend` directory, run:
        ```bash
        npm run dev
        ```
    -   The server should now be running on the port specified in your `.env` file (e.g., `http://localhost:3002`).

2.  **Start the Frontend Development Server:**
    -   In a new terminal, from the `frontend` directory, run:
        ```bash
        npm run dev
        ```
    -   The React application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Developer Notes & Future Plans

This project serves as a stepping stone into learning Shadcn and production-level Express.js. Next steps in the project is to add caching and a loadbalancer,etc. I will also aim to future customise the ui to make it look less like the default shadcn ui components.

## Acknowledgements

I developed all parts of this project, with AI assistance (Gemini 2.5 pro with guided learning mode enable) used for the initial setup and component scaffolding of the user dashboard. This allowed me to focus more on the core logic and backend architecture.
