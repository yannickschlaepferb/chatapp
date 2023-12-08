# Chat App Use Cases

## User Registration

- **Actor:** User
- **Description:** A new user can sign up by providing a unique username, email, and password.
- **Actions:**
  - User enters registration details.
  - System checks the uniqueness of the username.
  - User information is stored in the MySQL database.

## User Login

- **Actor:** User
- **Description:** Registered users can log in using their username and password.
- **Actions:**
  - User provides login credentials.
  - System validates credentials against the MySQL database.

##  Writing Messages

- **Actor:** User
- **Description:** Users can view their received messages in a room.
- **Actions:**

  - User accesses the room.
  - Messages are retrieved from the database based on the user's ID.

## Sending Messages

- **Actor:** User
- **Description:** Users can send messages to other users in a specific chat room.
- **Actions:**
  - User composes a message.
  - Messages are stored in the MySQL database with senderId, roomId, content, and timestamp information.

## Creating Rooms

- **Actor:** User
- **Description:** Users can create new chat rooms.
- **Actions:**
  - User initiates the room creation process.
  - Room information is stored in the MySQL database.

## Joining Rooms

- **Actor:** User
- **Description:** Users can join existing chat rooms.
- **Actions:**
  - User selects a chat room to join.
  - The system checks if the room exists and adds the user to the room in the database.