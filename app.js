const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname+"/node_modeles"))

app.get("/", (req,res)=>{
    res.render("chat");
});

io.on("connection", (socket)=>{
  socket.on("chat message", (msg)=>{
    io.emit("chat message", msg);
  });
});



http.listen(port, () => {
    console.log("Server is running on port 3001.");
  });