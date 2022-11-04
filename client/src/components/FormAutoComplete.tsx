import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
type AppProps = {
  id: string;
  label: string;
  error: string;
  options: OptionsClass[];
  value: OptionsClass[];
  onChange: any;
};

interface OptionsClass {
  label: string;
  id: string;
}

export default function FormAutoComplete({
  id,
  label,
  error,
  options,
  value,
  onChange,
}: AppProps) {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
      <Autocomplete
        multiple
        id={id}
        value={value}
        options={options}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label={label} />
        )}
        onChange={onChange}
      />
      {error ? (
        <FormHelperText error>{error}</FormHelperText>
      ) : (
        <FormHelperText></FormHelperText>
      )}
    </FormControl>
  );
}
