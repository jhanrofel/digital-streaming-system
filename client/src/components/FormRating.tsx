import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Rating from "@mui/material/Rating";

type AppProps = {
  value: number | undefined | null;
  name: string;
  error: string;
  onChange?: (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | null) => void;
};

// onChange={(event, newValue) => {
//   setRate(newValue);
// }}

export default function BasicRating({ value, name, error, onChange }: AppProps) {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
      <Rating name={name} value={value} onChange={onChange} />
      {error ? (
        <FormHelperText error>{error}</FormHelperText>
      ) : (
        <FormHelperText></FormHelperText>
      )}
    </FormControl>
  );
}
