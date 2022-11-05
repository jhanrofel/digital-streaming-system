import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

type AppProps = {
  rate: number | undefined | null;
  setRate: (value: number | null) => void;
};

export default function BasicRating({ rate, setRate }: AppProps) {
  return (
    <Rating
      name="simple-controlled"
      value={rate}
      onChange={(event, newValue) => {
        setRate(newValue);
      }}
    />
  );
}
