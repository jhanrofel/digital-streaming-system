import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

type AppProps = {
  name: string;
  value?: string;
  label: string;
  type: string;
  error?: string;
  variant?: "filled" | "standard" | "outlined";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const FormText = ({ name, value, label, type, error, variant, onChange }: AppProps) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
      <TextField
        data-testid={name}
        value={value}
        id={name}
        name={name}
        label={label}
        type={type}
        variant={variant?variant:"filled"}
        onChange={onChange}
      />
      {error ? (
        <FormHelperText error>{error}</FormHelperText>
      ) : (
        <FormHelperText></FormHelperText>
      )}
    </FormControl>
  );
};

export default FormText;
