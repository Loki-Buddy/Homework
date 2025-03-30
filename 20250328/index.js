const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

function readFile() {
    const data = fs.readFileSync("users.json", "utf-8");
    return JSON.parse(data);
}

function writeFile(data) {
    fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
}

app.get("/users", (req, res) => {
    const users = fs.readFileSync("users.json", "utf-8");
    res.json(JSON.parse(users));
});

app.post("/users", (req, res) => {
    const users = readFile();
    const {first_name, last_name, birth_date} = req.body;
    const newUsers = {
        id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
        first_name,
        last_name,
        birth_date
    }
    users.push(newUsers);
    writeFile(users);
    res.status(201).json(newUsers);
});

app.put("/users/:id/adress", (req, res) => {
    const users = readFile()
    const id = req.params.id;
    const {street, house_number, zip_code, city} = req.body;

    const foundUser = users.find(user => user.id == id);
    if (foundUser) {
        foundUser.address = {
            street,
            house_number,
            zip_code,
            city
        }
        writeFile(users);
        res.json(foundUser);
    } else {
        res.status(404).json({error: "User not found"});
    }
});

app.put("/users/:id/physical_attributes", (req, res) => {
    const users = readFile()
    const id = req.params.id;
    const {height_cm, weight_kg} = req.body;

    const foundUser = users.find(user => user.id == id);
    if (foundUser) {        
        foundUser.physical_attributes = {
            height_cm,
            weight_kg
        }
        writeFile(users);
        res.json(foundUser);
    } else {
        res.status(404).json({error: "User not found"});
    }
});

/* app.delete("/users/:id", (req, res) => {
    const users = readFile();
    const id = req.params.id;
    const foundedUser = users(user => user.id == id);
    const deletedUser = users.splice(foundedUser, 1);
    writeFile(users);
    res.json("Erfolgreich gelöscht: " + deletedUser);
}); */

app.listen(3002);