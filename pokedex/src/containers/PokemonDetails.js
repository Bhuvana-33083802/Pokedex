import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Box, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { POKEMON_API_URL } from "../config";

// Styled components
const PokemonContainer = styled(Box)(({ theme }) => ({
  height: "84vh",
  backgroundColor: "black",
  color: "white",
  textAlign: "center",
  borderRadius: 5,
  marginTop: 75,
  paddingTop: 30,
}));

const TextTitle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontFamily: "Fantasy",
  color: "yellow",
  marginBottom: theme.spacing(2),
}));

const PokemonImage = styled("img")({
  width: "170px",
  height: "170px",
});

const PokemonInfoContainer = styled(Box)(({ theme }) => ({
  bottom: 60,
  width: "100%",
  position: "absolute",
  left: 0,
}));

const Separator = styled("hr")(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.grey[600]}`,
  height: "0.01mm",
  width: "95%",
}));

const FavouriteButton = styled(Button)(({ theme }) => ({
  height: 50,
  width: 50,
  marginTop: 15,
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "darkred",
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  color: "white",
}));

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`${POKEMON_API_URL}/${id}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setPokemon(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }, [id]);

  if (pokemon) {
    const { name, sprites, height, weight, types } = pokemon;

    return (
      <PokemonContainer>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <TextTitle variant="h1">{name}</TextTitle>
          </Grid>
          <Grid item>
            {sprites && sprites.front_default ? (
              <PokemonImage src={sprites.front_default} alt={name} />
            ) : (
              <Typography variant="h6">Image not available</Typography>
            )}
          </Grid>
          <Grid item>
            <PokemonInfoContainer>
              <Separator />
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Grid item>
                  <FavouriteButton>
                    <FavoriteIcon style={{ color: "white", fontSize: 30 }} />
                  </FavouriteButton>
                </Grid>
                <Grid item>
                  <Text>
                    Name
                    <br />
                    {name}
                  </Text>
                </Grid>
                <Grid item>
                  <Text>
                    Height
                    <br />
                    {height / 10} m
                  </Text>
                </Grid>
                <Grid item>
                  <Text>
                    Weight
                    <br />
                    {weight / 10} kg
                  </Text>
                </Grid>
                <Grid item>
                  <Text>
                    Types
                    <br />
                    {types.map((typeInfo) => (
                      <span key={typeInfo.type.name}>
                        {typeInfo.type.name}
                        <br />
                      </span>
                    ))}
                  </Text>
                </Grid>
              </Grid>
            </PokemonInfoContainer>
          </Grid>
        </Grid>
      </PokemonContainer>
    );
  } else {
    return <CircularProgress />;
  }
}

export default PokemonDetails;
