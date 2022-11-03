import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

type AppProps = {
  name: string;
  value?: string;
  label: string;
  type: string;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const FormText = ({ name, value, label, type, error, onChange }: AppProps) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
      <TextField
        id={name}
        value={value}
        name={name}
        label={label}
        type={type}
        variant="filled"
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
