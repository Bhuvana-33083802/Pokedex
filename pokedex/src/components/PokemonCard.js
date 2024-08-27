import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./PokemonCard.module.css";

export default function PokemonCard(props) {
  const { pokemon, image } = props;
  const { id, name } = pokemon;

  return (
    <Grid item xs={10} sm={2} key={id}>
      <Link
        to={"/pokemon/" + id}
        className={styles.link}
        style={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            cursor: "pointer",
            backgroundColor: "skyblue",
            color: "white",
            "&:hover": {
              backgroundColor: "rgb(90, 90, 90)",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              margin: "auto",
              width: 120,
              height: 120,
            }}
            image={image}
            alt={name}
          />
          <CardContent
            sx={{
              textAlign: "center",
              link: {
                textDecoration: "none",
              },
            }}
          >
            <Typography>{name}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}
