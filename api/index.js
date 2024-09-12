// const express = require("express");
// const app = express();

// app.post("/geturl", (req, res) => res.send("Express on Vercel"));
// app.get("/url/:hash", (req, res) => res.json({name : req.params.hash}));

// app.listen(4000, () => console.log("Server ready on port 4000."));

// module.exports = app;

import genHash from "./hashUrl.js";
import { connectDb } from "./connectDb.js";
connectDb().catch(console.log);
import { storeIndb, searchDb } from "./connectDb.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

let app = express();
app.listen(process.env.PORT || 3500);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let corsOptions = {
  origin: "*",
  allowedHeaders: ["Content-Type"],
};

app.post("/geturl", cors(corsOptions), async (req, res) => {
  let hash = await genHash(req.body.url);
  await storeIndb(hash, req.body.url);
  res.json({ hash: hash });
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/:hash", async (req, res) => {
  let search = await searchDb(req.params.hash);
  try {
    if (search.search) {
      res.redirect(search.url);
      res.end();
    } else {
      console.log("404 not found!");
      res.sendFile("/Users/vinod/Desktop/URL-Shortner/public/404.html");
    }
  } catch (err) {
    console.log("Error", err);
  }
});
