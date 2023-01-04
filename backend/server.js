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

// import axios from "axios";

// const API_ROOT =
//   process.env.NODE_ENV === "production"
//     ? "/api"
//     : "http://localhost:4000/api";

const WS_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin.replace(/^http/, "ws")
    : "ws://localhost:4000";

// export const api = axios.create({ baseURL: API_ROOT });
const wss = new WebSocket(WS_URL);

mongo.connect()

const app = express()                               //create app middleware
const server = http.createServer(app)               //use http protocol to create server
// const wss = new WebSocket.Server({server})   //
const db = mongoose.connection

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV === "development") {
    app.use(cors());
   }

db.once('open', ()=> {
    // console.log("MongoDB connected!");
    wss.on('connection', (ws)=>{
        //web socket connection logic
        ws.box = ''; //record active ChatBox name
       // wsConnect.initData(ws); //init data in the very beginning
        ws.onmessage = (e)=>{wsConnect.onMessage(wss, ws, e);}
    });
})


server.listen(PORT, ()=>{console.log(`GoMyWonJam listening on port ${PORT}!`)})