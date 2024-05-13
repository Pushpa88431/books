import useAxios from "../services/useAxios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating, Chip, Typography, Box, Avatar, Button } from "@mui/material";

function Book() {
  const params = useParams();
  let id = params.id;
  const requestUrl = "http://localhost:3000";
  const { data, get } = useAxios(requestUrl);

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  function getBooks() {
    get(`books/${id}`);
  }

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ pl: 2, mt: 2, mb: 1.5 }}>
        {data.name}
      </Typography>
      <Avatar
        variant={"rounded"}
        alt="The image"
        src={data.img}
        style={{
          width: 250,
          height: 400,
        }}
        sx={{ ml: 1.5 }}
      />
      <Typography variant="subtitle1" gutterBottom sx={{ pt: 2, pl: 1.5 }}>
        {data.author}
      </Typography>
      <Box sx={{ pt: 1, pl: 1.5 }}>
        {data.genres?.map((genre, i) => (
          <Chip key={i} label={genre} variant="outlined" size="small" />
        ))}
      </Box>
      <Box sx={{ pt: 2, pl: 1.5 }}>
        <Rating
          name="read-only"
          value={data.stars ?? null}
          readOnly
          size="small"
        />
        <Box>
          <Button
            sx={{ mt: 0.7 }}
            color="inherit"
            variant="text"
            component={Link}
            to="/"
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Book;
