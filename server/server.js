const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

const port = 3000;
const saltRound = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin : "http://localhost:3001",
    credentials: true,
  }))

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT)
  })

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database ');
  });

  app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    pool.execute("SELECT username, password FROM users WHERE username = ?", [username], (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  
      const user = results[0];
  
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          console.error('Error during password comparison:', err);
          return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
  
        if (!isValid) {
          return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        res.json({ success: true, message: 'Login successful', userId: user.id });
      });
    });
  });
  

  //SIGNUP
  app.post("/signup", (req, res) => {
    console.log("here");
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash) => {
      if(err) {
        console.log(err)
      }
      pool.execute("INSERT INTO users (username, password) VALUES (?,?)", [username, hash],
      (err, result) => {
        console.log(err);
        console.log(result);
      })
      res.json({ success: true, message: 'User created successfully' });
    })
  });


  
/*io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message_send", async (message, chat, sender) => {
    try {
      const sendMsg = await sendMessage(message, chat, sender);
      if (sendMsg.success) {
        io.in(chat).emit("message_new");
      } else {
        io.in(chat).emit(`message_error_${sender}`, sendMsg.message);
      }
    } catch (error) {
      console.log(error);
      io.in(chat).emit(`message_error_${sender}`, error);
    }
  });
});*/


server.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});

