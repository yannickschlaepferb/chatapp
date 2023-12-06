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

## User Logout

- **Actor:** User
- **Description:** Users can log out of the chat app.
- **Actions:**
  - User initiates the logout process.

## Sending Messages

- **Actor:** User
- **Description:** Users can send messages to other users in a specific chat room.
- **Actions:**
  - User composes a message.
  - Messages are stored in the MySQL database with senderId, roomId, content, and timestamp information.

## Reading Messages

- **Actor:** User
- **Description:** Users can view their received messages in a room.
- **Actions:**
  - User accesses the room.
  - Messages are retrieved from the database based on the user's ID.

## Joining Rooms

- **Actor:** User
- **Description:** Users can join existing chat rooms.
- **Actions:**
  - User selects a chat room to join.
  - The system checks if the room exists and adds the user to the room in the database.

## Creating Rooms

- **Actor:** User
- **Description:** Users can create new chat rooms.
- **Actions:**
  - User initiates the room creation process.
  - Room information is stored in the MySQL database.

## Adding Users to a Room

- **Actor:** User
- **Description:** User can add other users to a chat room.
- **Actions:**
  - User selects users to add to the room.
  - The system updates the database to reflect the new members of the room.

## Real-time Updates

- **Actor:** Client
- **Description:** The chat app fetches Messages every 10ms.
- **Actions:**
  - Implement real-time communication to ensure instant notifications without manual page refresh.
