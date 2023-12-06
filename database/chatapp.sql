CREATE DATABASE Chatapp;
USE Chatapp;

CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (username)
);

INSERT INTO users (username, password)
VALUES 
('bob', 'bob@gmail.com', '1234'),
('john', 'john@gmai.com', '1122');

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roomname VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (roomname)
);

INSERT INTO rooms (roomname)
VALUES
('bob');

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  senderId INT,
  roomId INT,
  content TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (senderId) REFERENCES users(id),
  FOREIGN KEY (roomId) REFERENCES rooms(id)
);

INSERT INTO messages (senderId, roomId, content)
VALUES
('1', '1', 'Hello, my name is john');

CREATE TABLE user_room (
  userId INT,
  roomId INT,
  PRIMARY KEY (userId, roomId),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (roomId) REFERENCES rooms(id)
);

INSERT INTO user_room (userId, roomId)
VALUES
(1, 1),
(2, 1);
