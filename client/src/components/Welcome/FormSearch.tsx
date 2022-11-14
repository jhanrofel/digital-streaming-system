import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import FormText from "../FormText";

type AppProps = {
  search: string;
  error: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FormSearch = ({
  search,
  error,
  onClick,
  onChange,
}: AppProps) => {
  return (
    <React.Fragment>
      <Box sx={{ width: 600 }}>
        <Typography variant="h3" gutterBottom>
          FREE MOVIE STREAMING
        </Typography>
        <Typography variant="h4" gutterBottom>
          Watch anywhere. Latest movies.
        </Typography>
        <FormControl sx={{width: 1 }}>
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
    </React.Fragment>
  );
};

export default FormSearch;
