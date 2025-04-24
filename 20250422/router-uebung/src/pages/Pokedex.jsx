import React, { useState, useEffect } from "react";
import Listing from "./components/Listing";
import "../pages/components/styles/Main.css";

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [anzahl, setAnzahl] = useState(3);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();
        const detailedPokemon = await Promise.all(
          data.results.map(async (poke) => {
            const pokeDetails = await fetch(poke.url);
            return await pokeDetails.json();
          })
        );
        setPokemon(detailedPokemon);
      } catch (error) {
        console.error("Fehler beim Laden der Pokémon-Daten:", error);
      }
    };

    fetchPokemon();
  }, []);

  const playSound = (id) => {
    const audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`);
    audio.volume = 0.35; // Lautstärke auf 35% setzen
    audio.play();
  };

  return (
    <div className="home-container">
      <div className="pokemon-grid">
        {pokemon.slice(0, anzahl).map((poke) => (
          <Listing
            key={poke.id}
            Name={poke.name}
            Art={poke.types.map((type) => type.type.name).join(", ")}
            image={poke.sprites.front_default}
            onNameClick={() => playSound(poke.id)}
          />
        ))}
      </div>
      <button onClick={() => setAnzahl((prev) => Math.min(prev + 148, pokemon.length))}>
        Mehr Pokémon
      </button>
    </div>
  );
}

export default Pokedex;