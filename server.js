const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')

//mongoose connection

mongoose.connect("mongodb://localhost:27017/node-shop");
mongoose.connection
  .once("open", () => {
    console.log("DB connected");
  })
  .on("error", (error)=> {
    console.log("error is:", error);
  });

port = 3000

const server = http.createServer(app)
server.listen(port, ()=>{
    console.log(`running on port:${port}`);
})