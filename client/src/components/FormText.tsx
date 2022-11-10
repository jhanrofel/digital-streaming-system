import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

type AppProps = {
  testId?: string;
  name: string;
  value?: string;
  label: string;
  type: string;
  error?: string;
  variant?: "filled" | "standard" | "outlined";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const FormText = ({ testId, name, value, label, type, error, variant, onChange }: AppProps) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
      <TextField
        data-testid={testId}
        id={name}
        value={value}
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
