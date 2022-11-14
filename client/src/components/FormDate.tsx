import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormHelperText from "@mui/material/FormHelperText";

type AppProps = {
  label: string;
  error: string;
  value: string;
  onChange: any;
};

const FormDate = ({ label, error, value, onChange }: AppProps) => {
  const dayJs = value ? dayjs(value) : dayjs().format("MM/DD/YYYY");
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          data-testid={label}
          label={label}
          value={dayJs}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} variant="filled" />}
        />
      </LocalizationProvider>
      {error !== "" ? (
        <FormHelperText error>{error}</FormHelperText>
      ) : (
        <FormHelperText></FormHelperText>
      )}
    </FormControl>
  );
};

export default FormDate;
