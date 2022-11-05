import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import FormText from "../FormText";

type AppProps = {
  search: string;
  error: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  setSearch: (value: string) => void;
};

const FormSearch = ({
  search,
  error,
  onClick,
  onChange,
  setSearch,
}: AppProps) => {
  return (
    <>
      <Box sx={{ width: 600, display: "inline", margin: 10 }}>
        <Typography variant="h3" gutterBottom>
          FREE MOVIE STREAMING
        </Typography>
        <Typography variant="h4" gutterBottom>
          Watch anywhere. Latest movies.
        </Typography>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <FormText
            name={"search"}
            value={search}
            label={"SEARCH NOW!!! (Actors, Movies)"}
            error={error}
            type="search"
            variant="outlined"
            onChange={onChange}
          />
          <Button variant="contained" onClick={onClick}>
            LETS GO!!!
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

export default FormSearch;
