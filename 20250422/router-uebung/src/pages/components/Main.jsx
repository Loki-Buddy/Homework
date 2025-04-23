import React from 'react';
import { useState } from "react";
import Listing from './Listing';
import './styles/Main.css'; // Importiere die CSS-Datei

function Main() {
    const [anzahl, setAnzahl] = useState(3);
    const pokemon = [
        {Id: 1, Name: "Bulbasaur" , Art: "Pflanze", Schwaeche: "Wasser", Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/001.png"},
        {Id: 2, Name: "Ivysaur" , Art: "Pflanze", Schwaeche: "Wasser", Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/002.png"},
        {Id: 3, Name: "Venusaur" , Art: "Pflanze", Schwaeche: "Wasser", Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/003.png"},
        {Id: 4, Name: "Charmander" , Art: "Pflanze", Schwaeche: "Wasser", Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/004.png"},
        {Id: 5, Name: "Charmeleon" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/005.png"},
        {Id: 6, Name: "Charizard" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/006.png"},
        {Id: 7, Name: "Squirtle" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/007.png"},
        {Id: 8, Name: "Wartortle" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/008.png"},
        {Id: 9, Name: "Blastoise" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/009.png"},
        {Id: 10, Name: "Caterpie" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/010.png"},
        {Id: 11, Name: "Metapod" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/011.png"},
        {Id: 12, Name: "Butterfree" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/012.png"},
        {Id: 13, Name: "Weedle" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/013.png"},
        {Id: 14, Name: "Kakuna" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/014.png"},
        {Id: 15, Name: "Beedrill" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/015.png"},
        {Id: 16, Name: "Pidgey" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/016.png"},
        {Id: 17, Name: "Pidgeotto" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/017.png"},
        {Id: 18, Name: "Pidgeot" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/018.png"},
        {Id: 19, Name: "Rattata" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/019.png"},
        {Id: 20, Name: "Raticate" , Art: "Pflanze", Schwaeche: "Wasser" , Image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/020.png"},
    ];
  
    return (
        <div className="home-container">
            <div className="pokemon-grid">
                {pokemon.slice(0, anzahl).map((pokemon) => (
                    <Listing 
                        key={pokemon.Id} 
                        Name={pokemon.Name} 
                        Art={pokemon.Art} 
                        Schwaeche={pokemon.Schwaeche} 
                        image={pokemon.Image} 
                    />
                ))}
            </div>
            <button onClick={() => setAnzahl(anzahl + 3)}>Mehr Pokémon</button>
        </div>
    );
}

export default Main;