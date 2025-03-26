const express = require("express");
const app = express();

let generateName = require('sillyname');

app.get("/", (req, res) => {
    res.send("Willkommen bei meiner eigenen API!");
});

app.get("/example", (req, res) => {
    res.json([
      { id: 1, name: "Max" },
      { id: 2, name: "Lena" }
    ]);
  });

app.get("/randomname", (req,res) => {
    res.send(generateName());
});

app.listen(3000, () => {
    console.log("Server läuft auf http://localhost:3000/");
});