import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import PokemonCard from "../components/PokemonCard";
import { makeStyles } from "@mui/styles"; // Import makeStyles

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    textAlign: "center",
    padding: "70px 10px 0px 10px",
    backgroundColor: "rgb(68, 68, 68)",
  },
}));

const IMAGE_API_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

const Pokedex = () => {
  const classes = useStyles(); // Use the hook here
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${POKEMON_API_URL}?limit=800`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          const { results } = response.data;
          if (Array.isArray(results)) {
            console.log(results);
            let newPokemonData = [];
            results.forEach((pokemon, index) => {
              let pokemonObject = {
                id: index + 1,
                url: `${IMAGE_API_URL}${index + 1}.png`, // Construct URL with the index
                name: pokemon.name,
              };
              newPokemonData.push(pokemonObject); // Update state with new data
            });
            setPokemonData(newPokemonData);
          } else {
            console.error("Unexpected API response structure:", response.data);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when done
      });
  }, []);

  return (
    <Box>
      {loading ? (
        <CircularProgress style={{ marginTop: 80 }} />
      ) : (
        <Grid className={classes.pokedexContainer} container spacing={2}>
          {pokemonData.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              image={pokemon.url}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Pokedex;
