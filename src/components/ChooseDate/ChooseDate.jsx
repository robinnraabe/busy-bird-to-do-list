import { Stack, TextField } from '@mui/material';
import DatePicker from '@mui/x-date-pickers';
import { useState } from 'react';

function DatePicker() {
    const [date, setDate] = useState(null);

    return (
        <div>
            {date}
            <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
    )
}


// import addDays from 'date-fns/addDays';

/* export const ChooseDate = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    console.log({ selectedDate });
    return (
        <Stack spacing={4} sx={{width: '250px'}}>
            <DatePicker
                label='Date Picker'
                renderInput={(params) => <TextField {...params} />}
                value={selectedDate}
                onChange={(newValue) => {
                    setSelectedDate(newValue)
                }}
            />
        </Stack>
    )
} */

//    <DateField 
//        label="Uncontrolled field" 
//        format="LL" 
//        defaultValue={addDays('2022-04-17')} 
//    />