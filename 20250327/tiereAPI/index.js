const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
​
const file = "animals.json";
​
app.use(express.json());
​
const ensureFileExists = () => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([], null, 2));
  }
};
​
ensureFileExists();
​
const loadAnimals = () => {
  try {
    const data = fs.readFileSync(file);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
​
const saveAnimals = (animals) => {
  fs.writeFileSync(file, JSON.stringify(animals, null, 2));
};
​
app.get("/animals", (req, res) => {
  res.json(loadAnimals());
});
​
app.get("/animals/search", (req, res) => {
  const { species } = req.query;
  const animals = loadAnimals();
  const filteredAnimals = animals.filter((animal) => animal.art.toLowerCase() === species.toLowerCase());
  res.json(filteredAnimals);
});
​
app.get("/animals/:id", (req, res) => {
  const animals = loadAnimals();
  const animal = animals.find((a) => a.id === parseInt(req.params.id));
  if (animal) {
    res.json(animal);
  } else {
    res.status(404).json({ message: "Animal not found" });
  }
});
​
app.post("/animals", (req, res) => {
  const animals = loadAnimals();
  const maxId = animals.length > 0 ? Math.max(...animals.map(a => a.id)) : 0;
  const newAnimal = { id: maxId + 1, ...req.body };
  animals.push(newAnimal);
  saveAnimals(animals);
  res.status(201).json(newAnimal);
});
​
​
app.put("/animals/:id", (req, res) => {
  const animals = loadAnimals();
  const index = animals.findIndex((a) => a.id === parseInt(req.params.id));
  if (index !== -1) {
    animals[index] = { ...animals[index], ...req.body };
    saveAnimals(animals);
    res.json(animals[index]);
  } else {
    res.status(404).json({ message: "Animal not found" });
  }
});
​
​
app.delete("/animals/:id", (req, res) => {
  let animals = loadAnimals();
  const initialLength = animals.length;
  animals = animals.filter((a) => a.id !== parseInt(req.params.id));
  if (animals.length < initialLength) {
    saveAnimals(animals);
    res.json({ message: "Animal deleted successfully" });
  } else {
    res.status(404).json({ message: "Animal not found" });
  }
});
​
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});