import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

type AppProps = {
  name: string;
  value: string | undefined;
  label: string;
  error?: string;
  options: string[];
  onChange: (event: SelectChangeEvent) => void;
};

const FormSelect = ({
  name,
  value,
  label,
  error,
  options,
  onChange,
}: AppProps) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        data-testid={name}
        id={name}
        name={name}
        value={value}
        variant="filled"
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {error ? (
        <FormHelperText error>{error}</FormHelperText>
      ) : (
        <FormHelperText></FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelect;
