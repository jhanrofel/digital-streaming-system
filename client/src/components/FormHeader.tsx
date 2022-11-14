import React from "react";
import { IButton } from "../utilities/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormButton from "./FormButton";
type AppProps = {
  header: string;
  buttons: IButton[];
};

const FormHeader = ({ header, buttons }: AppProps) => {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, justifyContent: "flex-start" }}>
          <Typography variant="h5">{header}</Typography>
        </Box>
        <Box sx={{ minWidth: 200, justifyContent: "flex-end" }}>
          {buttons.map((button, i) => (
            <FormButton key={i} label={button.label} onClick={button.onClick} />
          ))}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default FormHeader;
