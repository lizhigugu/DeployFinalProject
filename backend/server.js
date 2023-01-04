import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import mongo from './src/mongo'
import wsConnect from './src/wsConnect'

//deploy
import path from "path";
//import express from "express";
import cors from "cors";

const app = express()

if (process.env.NODE_ENV === "development") {
  app.use(cors());
 }

 if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}.`);
});

const db = mongoose.connection

server.listen(PORT, ()=>{console.log(`GoMyWonJam listening on port ${PORT}!`)})

const wss = new WebSocket.Server({server}) 

db.once('open', ()=> {
  console.log("MongoDB connected!");
  wss.on('connection', (ws)=>{
      //web socket connection logic
      ws.box = ''; //record active ChatBox name
     // wsConnect.initData(ws); //init data in the very beginning
      ws.onmessage = (e)=>{wsConnect.onMessage(wss, ws, e);}
  });
})

mongo.connect()

                           //create app middleware
// const server = http.createServer(app)               //use http protocol to create server
  //










