import FormControl from "@mui/material/FormControl";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormHelperText from "@mui/material/FormHelperText";

type AppProps = {
  label: string;
  error: string;
  value: Dayjs | null;
  setNewValue: any;
};

const FormSelect = ({ label, error, value, setNewValue }: AppProps) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue) => {
            setNewValue(newValue?.format('YYYY-MM-DD'));
          }}
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

export default FormSelect;
