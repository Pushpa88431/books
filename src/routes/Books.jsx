import { useEffect, useState } from "react";
import useAxios from "../services/useAxios";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

function Books() {
  const requestUrl = "http://localhost:3000";
  const { data, get, loading } = useAxios(requestUrl);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  function getBooks() {
    get(`books`);
  }

  const searchHandler = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      <TextField
        sx={{ mb: 3, width: "100%" }}
        id="outlined-basic"
        label="search  book"
        variant="outlined"
        value={search}
        onChange={searchHandler}
      ></TextField>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {data
              .filter(
                (book) =>
                  book.name.toLowerCase().includes(search.toLowerCase()) ||
                  book.author.toLowerCase().includes(search.toLowerCase())
              )
              .map((book) => (
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "15%",
                    minWidth: 200,
                  }}
                  key={book.name}
                >
                  <CardMedia
                    sx={{ height: 320, width: 210 }}
                    image={book.img}
                    title={book.name}
                    component="img"
                  />
                  <Box sx={{ pt: 2, pl: 2 }}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
                  </Box>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      mt: "auto",
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={Number(book.stars)}
                      readOnly
                      size="small"
                    />
                    <Button size="small" component={Link} to={`/${book.id}`}>
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
