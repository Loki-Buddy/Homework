const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

function readFile(){
    const data = fs.readFileSync("tiere.json", "utf-8");
    return JSON.parse(data);
}

function writeFile(data){
    fs.writeFileSync("tiere.json", JSON.stringify(data, null, 2));
}

