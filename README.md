# Chat App

A simple chat application built with React, Node.js, Express, and MySQL.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Features

- Real-time chat functionality
- Send messages
- Receive messages 
- Add users to chat rooms
- Create new chat rooms
- Responsive design for various screen sizes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MySQL database server
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:

   ```bash
   https://github.com/sujanSaravana/CommunicationsApp.git

2. Navigate to the project directory:

   ```bash
   cd CommunicationsApp

3. Install dependencies for the frontend and backend:

   ```bash
   cd client
   npm install
   cd server
   npm install

## Configuration

1. Set up a MySQL database and configure the connection details in the .env file:

   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=11223344
   DB_DATABASE=Chatapp
   DB_CONNECTION_LIMIT=10

2. Create an initialization SQL script (e.g., init.sql) to set up your database schema.

## Usage 

1. Start the backend server:

   ```bash
   cd server
   npm start

2. Start the frontend development server:

   ```bash
   cd client
   npm start

3. Open your browser and visit http://localhost:3000 to use the chat app.


