const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("tiere.db");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tiere (
        id INTEGER PRIMARY KEY,
        tierart VARCHAR(50),
        name VARCHAR(50),
        krankheit VARCHAR(100),
        age INT,
        gewicht REAL
    );`);
    // db.run(`INSERT INTO tiere(tierart,name,krankheit,age,gewicht) VALUES ("Hund","Bello","husten",5,12.4);`);

    selectAllTiereQuery = `SELECT * FROM tiere;`;

    db.all(selectAllTiereQuery, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
        }
    });
    process.on("exit", () => {
        db.close();
    });
});

app.use(express.json()); // Ermöglicht Express Json aus einem Body auszulesen
app.use(express.static("public"));
app.listen(3000);

// app.get("/", (req,res) => {
//     res.send("Die API funktioniert!");
// });

app.get("/tiere", (req, res) => {
    db.all(selectAllTiereQuery, (err, rows) => {
        if (err) {
            res.status(404).send("Fehler in deiner Query Anfrage");
        } else {
            res.json(rows);
        }
    });
});

app.post("/newAnimal", (req, res) => {
    const { tierart, name, krankheit, age, gewicht } = req.body;
    db.run(`INSERT INTO tiere (tierart, name, krankheit, age, gewicht) VALUES (?, ?, ?, ?, ?);`, [tierart, name, krankheit, age, gewicht]);
    res.status(201);
});

app.delete("/tiere/:id", (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM tiere WHERE id = ?;`, [id]);
    res.status(204).send("Eintrag gelöscht!");
});






