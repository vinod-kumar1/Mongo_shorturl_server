const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/:hash", (req, res) => res.json({name : req.params.hash}));

app.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;