import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Rating from "@mui/material/Rating";

type AppProps = {
  value: number | undefined | null;
  name: string;
  error: string;
  onChange?: (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => void;
};

export default function FormRating({
  value,
  name,
  error,
  onChange,
}: AppProps) {
  return (
    <FormControl variant="filled">
      {onChange ? (
        <Rating name={name} value={value} onChange={onChange} />
      ) : (
        <Rating name={name} value={value} precision={0.1} readOnly />
      )}

      {error ? (
        <FormHelperText error>{error}</FormHelperText>
      ) : (
        <FormHelperText></FormHelperText>
      )}
    </FormControl>
  );
}
