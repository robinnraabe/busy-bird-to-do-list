import {useState} from 'react';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SquareIcon from '@mui/icons-material/Square';
import TextField from '@mui/material/TextField';
import './TaskForm.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';


function sendTask(props) {
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [color, setColor] = useState('');

    const addTask = (event) => {
        event.preventDefault();
        console.log('addTask:', task);
        axios.post('/todo', {
            task: task,
            date: date,
            color: color
        })
        .then((response) => {
            console.log(response.data);
            props.getTasks();
            setTask('');
            setColor('');
        })
        .catch((error) => {
            console.log('Error in axios POST:', error);
            alert('Something went wrong with POST!');
        });
    }

    const chooseColor = (event, newColor) => {
        console.log(event.target.value);
        if (newColor !== null) {
            setColor(newColor);
        }
    }

    return (
        <div className="input-form" >
            <h1>Add something!</h1>
            <form className="alignment" onSubmit={addTask}>
                <TextField label="What needs to be done?" variant="standard" sx={{ marginLeft: '20px', width: '90%' }}
                    required 
                    type="text" 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)} 
                    placeholder="description"
                />
                <br />
                <Stack sx={{ display: 'flex', flexDirection: 'row', alignText: 'center', marginTop: '20px'  }}>
                    <input 
                        className="date-input"
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)} 
                    />
                    <Tooltip title="Choose color">
                        <ToggleButtonGroup sx={{ padding: '0px', margin: '0px 10px 20px 20px' }} 
                            orientation="horizontal" 
                            size="medium" 
                            value={color}
                            exclusive='true'
                            onChange={chooseColor}
                        >
                            <ToggleButton value="rgb(160, 129, 242)" key="purple">
                                <SquareIcon sx={{ color: "rgb(160, 129, 242)" }} />
                            </ToggleButton>,
                            <ToggleButton value="rgb(254, 133, 148)" key="pink">
                                <SquareIcon sx={{ color: "rgb(254, 133, 148)" }} />
                            </ToggleButton>,
                            <ToggleButton value="rgb(255, 211, 35)" key="yellow">
                                <SquareIcon sx={{ color: "rgb(255, 211, 35)" }} />
                            </ToggleButton>,
                            <ToggleButton value="rgb(36, 220, 37)" key="green">
                                <SquareIcon sx={{ color: "rgb(36, 220, 37)" }} />
                            </ToggleButton>
                            <ToggleButton value="rgb(37, 180, 255)" key="blue">
                                <SquareIcon sx={{ color: "rgb(37, 180, 255)" }} />
                            </ToggleButton>,
                        </ToggleButtonGroup>
                    </Tooltip>
                    <Tooltip title="Add task" sx={{ marginLeft: 'auto', marginTop: '-20px', marginRight: '0px' }}>
                        <IconButton type="submit">
                            <AddBoxIcon sx= {{ 
                        fontSize: '70px',
                        color: 'orange', 
                        }}/>
                        </IconButton>
                    </Tooltip> 
                </Stack>
            </form>
        </div>
    );
}

export default sendTask;