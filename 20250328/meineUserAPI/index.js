// Importiert das Express-Framework und das File-System-Modul
const express = require("express");
const app = express();
const fs = require("fs");

// Middleware, um JSON-Daten im Request-Body zu parsen
app.use(express.json());

// Funktion zum Lesen der Datei "users.json" und Parsen des Inhalts als JSON
function readFile() {
    const data = fs.readFileSync("users.json", "utf-8");
    return JSON.parse(data);
}

// Funktion zum Schreiben von Daten in die Datei "users.json"
function writeFile(data) {
    fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
}

// GET-Route: Gibt alle Benutzer aus der Datei "users.json" zurück
app.get("/users", (req, res) => {
    const users = readFile();
    res.json(users);
});

// POST-Route: Fügt einen neuen Benutzer hinzu
app.post("/users", (req, res) => {
    const users = readFile();
    const { first_name, last_name, birthdate } = req.body;
    

    if (first_name && last_name && birthdate) {
        const duplicate = users.some(user => 
            user.first_name.toLowerCase() === first_name.toLowerCase() && user.last_name.toLowerCase() === last_name.toLowerCase()
        );

        if (duplicate) {
            return res.status(409).send("Ein Benutzer mit diesem Namen existiert bereits.");
        }else {
            const new_user = {
                id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1, // Erstellt einen neuen Benutzer mit einer eindeutigen ID
                first_name,
                last_name,
                birthdate
            };
            
            // Fügt den neuen Benutzer zur Liste hinzu und speichert die Datei
            users.push(new_user);
            writeFile(users);
        }
    }
    // Gibt den neu erstellten Benutzer zurück
    res.status(201).json(new_user);
});

// PUT-Route: Aktualisiert die physischen Attribute eines Benutzers
app.put("/users/:id/physical", (req, res) => {
    const users = readFile();
    const id = parseInt(req.params.id); // Konvertiert die ID aus der URL in eine Zahl
    const index = users.findIndex(user => user.id === id); // Sucht den Benutzer anhand der ID

    if (index === -1) {
        // Wenn der Benutzer nicht gefunden wird, gibt es einen 404-Fehler zurück
        res.status(404).send("User not found");
    } else {
        // Aktualisiert die physischen Attribute des Benutzers
        const { height, weight } = req.body;

        if (height && weight) {
            users[index].physical_attributes = { height, weight };
            writeFile(users);
        }
        else {
            res.status(400).send("Bitte geben Sie eine Groesse und ein Gewicht an.");
        }



        // Gibt den aktualisierten Benutzer zurück
        res.json(users[index]);
    }
});

// PUT-Route: Aktualisiert die Adresse eines Benutzers
app.put("/users/:id/address", (req, res) => {
    const users = readFile();
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        res.status(404).send("User not found");
    } else {
        // Aktualisiert die Adresse des Benutzers
        const { street, city, zip_code } = req.body;
        if (street && city && zip_code) {
            users[index].address = { street, city, zip_code };
            writeFile(users);
        } else {
            res.status(400).send("Bitte geben Sie eine Straße, eine Stadt und eine Postleitzahl an.");
        }



        // Gibt den aktualisierten Benutzer zurück
        res.json(users[index]);
    }
});

// DELETE-Route: Löscht einen Benutzer anhand der ID
app.delete("/users/:id", (req, res) => {
    const users = readFile();
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        res.status(404).send("User not found");
    } else {
        // Entfernt den Benutzer aus der Liste und speichert die Datei
        const deletedUser = users.splice(index, 1);
        writeFile(users);

        // Gibt den gelöschten Benutzer zurück
        res.json("Erfolgreich gelöschter Benutzer: " + deletedUser[0].first_name + " " + deletedUser[0].last_name);
    }
});

app.get("/users/:id", (req, res) => {
    const users = readFile();
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

app.get("/search", (req, res) => {
    let users;
    try {
        users = readFile();
        const { id,first_name, last_name } = req.query;
        if(id){
            const user = users.find(user => user.id == id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send("User not found");
            }
        }
        if (first_name) {
            const user = users.find(user => user.first_name.toLowerCase() == first_name.toLowerCase());
            if (user) {
                res.json(user);
            } else {
                res.status(404).send("User not found");
            }
        }
        if (last_name) {
            const user = users.find(user => user.last_name.toLowerCase() == last_name.toLowerCase());
            if (user) {
                res.json(user);
            } else {
                res.status(404).send("User not found");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server-Fehler");
    }
    
});

// Startet den Server auf Port 3002
app.listen(5000, () => {
    console.log("Server läuft auf http://localhost:5000");
});