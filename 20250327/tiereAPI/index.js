const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

/* const tiere = [
    { id: 1, name: "Ally", art: "Hund", alter: 7 },
    { id: 2, name: "Bella", art: "Hund", alter: 6.5 },
    { id: 3, name: "Molly", art: "Katze", alter: 12 },
    { id: 4, name: "Fusel", art: "Katze", alter: 5 },
    { id: 5, name: "Justin", art: "Katze", alter: 3 }
]; */

app.get("/tiere", (req, res) => {
    res.send(tiere);
});

app.get("/tiere/search", (req, res) => {
    /* const name = req.query.name; */
    const art = req.query.art;
    /* const alter = req.query.alter; */

    /* const resultName = tiere.filter((tiere) => tiere.name === name); */
    const resultArt = tiere.filter((tier) => tier.art === art);
    /* const resultAlter = tiere.filter((tiere) => tiere.alter === alter); */

    /* res.json(resultName); */
    res.json(resultArt);
    /* res.json(resultAlter); */
});

app.get("/tiere/:id", (req, res) => {
    const id = req.params.id;
    const foundTier = tiere.find((tier) => tier.id == id); // Not to use ===

    res.json(foundTier);
});


app.post("/tiere", (req,res) => {
    console.log(req.body);
    const {name, art, alter} = req.body;
    const newTier = {
        id: tiere.length +1,
        name: name,
        art: art,
        alter: alter,
    };

    tiere.push(newTier);

    res.json(tiere);
});
app.listen(3000);