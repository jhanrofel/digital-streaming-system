import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

type AppProps = {
  name: string;
  label: string;
  type: string;
  error: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const FormText = ({ name, label, type, error, onChange }: AppProps) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
      {error ? (
        <TextField
          error
          id={name}
          name={name}
          label={label}
          type={type}
          variant="filled"
          helperText={error}
          onChange={onChange}
        />
      ) : (
        <TextField
          id={name}
          name={name}
          label={label}
          type={type}
          variant="filled"
          onChange={onChange}
        />
      )}
    </FormControl>
  );
};

export default FormText;
