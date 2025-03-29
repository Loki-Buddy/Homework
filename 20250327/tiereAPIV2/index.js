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

app.get("/tiere", (req,res) => {
    const tiere = readFile();
    res.json(tiere);
    /* res.send(tiere); */
});

app.post("/tiere", (req,res) =>{
    const tiere = readFile();
    const {name, art} = req.body;

    const newTier = {
        id: tiere.length > 0 ? Math.max(...tiere.map(tier => tier.id)) + 1 : 1,
        name,
        art
    }
    tiere.push(newTier);
    writeFile(tiere);
    res.status(201).json(newTier);
});



app.listen(3001);