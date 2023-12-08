# Chat App
This chat app was developed using React in the frontend, node.JS in the backend and mysql as the database. A brief documentation of the web app can be found in the "Documentation" directory.

## Description
In this web app, users can sign in with a username and engage in chat conversations with other users. Users can exchange real-time messages in channels with another person or alone if they choose so. To view these messages, joining a channel with an ID is possible. Additionally, users can create new channels. The messages are stored in the database, allowing them to be displayed even after restarting the app. In summary, all the following are saved in the database, messages, channels and users.

## Setup
### Installation
To start this project, Docker must be installed. If Docker is not yet installed, you can read the installation instructions [here](https://docs.docker.com/get-docker/) and [here](https://docs.docker.com/compose/install/).

### Starting
To launch the project, execute the following command in the console:
```bash
docker-compose up --build
