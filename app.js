const express = require("express");
const app = express(); 
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require('cors')
const path = require("path");
const connectDB = require("./config/connectDB");

dotenv.config();


connectDB();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  }, 
    filename: (req, file, cb) => {
      const date = new Date().toISOString().replace(/:/g, '-');
      const originalname = path.parse(file.originalname).name; 
      const extension = path.extname(file.originalname); 
      const filename = `${date}_${originalname}${extension}`; 
      cb(null, filename);
    },
});

const upload = multer({
  storage: storage
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const fileName = req.file.filename;  
    return res.status(200).send({ success: true,message: "File uploaded successfully", fileName });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Something went wrong' });
  }
});

app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/users", require('./routes/userRoutes'));
app.use("/api/posts", require('./routes/postRoute'));
app.use("/api/conversation", require('./routes/conversationRoute'));
app.use("/api/messages", require('./routes/messageRoute'));
app.use("/api/threads", require('./routes/threadRoute'));

const Port = process.env.PORT;

const server = app.listen(
  Port,
  console.log(`Server running on PORT ${Port}...`)
);

 
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});