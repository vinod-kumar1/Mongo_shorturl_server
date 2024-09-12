const express = require("express");
const app = express();

app.get("/url", (req, res) => res.send("Express on Vercel"));
app.get("/url/:hash", (req, res) => res.json({name : req.params.hash}));

app.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;