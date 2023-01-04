//mui import
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//react import

function BasicDateTimePicker({date, setDate}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField 
            required {...props} />}
        label="DateTimePicker"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

export default BasicDateTimePicker;