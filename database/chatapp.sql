CREATE DATABASE chatapp;
USE chatapp;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (username)
);

INSERT INTO users (username, password)
VALUES ('Bob-sergey', 'somepassword');