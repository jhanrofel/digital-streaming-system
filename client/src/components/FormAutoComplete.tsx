import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { IAutoCompleteOption } from "../utilities/types";
type AppProps = {
  id: string;
  label: string;
  error: string;
  options: IAutoCompleteOption[];
  value: IAutoCompleteOption[];
  onChange: any;
};

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
        isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
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
