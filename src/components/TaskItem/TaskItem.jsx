import axios from 'axios';
import { useState } from 'react';
import { format } from "date-fns";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';

function TaskItem(props) {
    const [notes, setNotes] = useState('');
    var formattedDate = format(new Date(props.task.due_date), "MMMM do, yyyy");
    console.log('TEST DATE - raw:', props.task.due_date);
    console.log('TEST DATE - formatted:', formattedDate);
    console.log('TaskItem log:', props.task);
    const deleteTask = () => {
        console.log('Deleted', props.task.task);
        axios.delete(`/todo/${props.task.id}`)
            .then((response) => {
                console.log('Successfully deleted', props.task.task);
                props.getTasks();
            })
            .catch((error) => {
                console.log('Error in axios DELETE:', error);
                alert('Something went wrong with axios DELETE');
        });
    }
    const toggleComplete = () => {
        console.log('Updated', props.task.task);
        axios.put(`/todo/${props.task.id}`)
            .then((response) => {
                console.log('Successfully updated', props.task.task);
                props.getTasks();
            })
            .catch((error) => {
                console.log('Error in the first axios PUT:', error);
                alert('Something went wrong with the first axios PUT');
        });
    }
    const toggleEdit = () => {
        console.log('Editing', props.task.task);
        axios.put(`/notes/${props.task.id}`)
            .then((response) => {
                console.log('Successfully updated notes on', props.task.task);
                props.getTasks();
            })
            .catch((error) => {
                console.log('Error in the second axios PUT:', error);
                alert('Something went wrong with the second axios PUT');
            })
    }
    const editNotes = () => {
        console.log(props.task.notes);
        axios.put(`/notes`)

    }

    return (
        // className is the Reaact version of class
        // md={4} will fill 4 columns on md/l screens PER ITEM
        // xs={12} will make 1 item fill all 12 columns on small screens
        <Grid item xs={12} md={12}>
            <Card sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                borderRadius: '0px', 
                outlineStyle: 'solid',
                backgroundColor: 'white',
                outlineColor: `${props.task.color}`, 
                boxShadow: `-10px 10px ${props.task.color}` }} 
            >
                <CardContent className={props.task.status ? 'complete' : 'incomplete'}>
                    {/*Main content goes here*/}
                    <Typography variant="h5">
                        {props.task.task}
                    </Typography>
                    <Typography sx={{color: 'grey'}}>
                        by {formattedDate}
                    </Typography>
                </CardContent>
                <CardContent sx={{ marginLeft: 'auto' }}>
                    Notes: {notes}
                </CardContent>
                <CardActions sx={{padding: '10px', marginLeft: 'auto'}}>
                    {/*Buttons go here*/}
                    {/* Conditional rendering */
                        props.task.status ? (
                            // if true
                            <Tooltip title="Mark incomplete">
                                <IconButton onClick={toggleComplete}>
                                    <StarIcon sx={{fontSize: '50px', color:'orange'}} /> 
                                </IconButton>
                            </Tooltip>
                        ) : (
                            // if false
                            <Tooltip title="Mark complete">
                                <IconButton onClick={toggleComplete}>
                                    <StarOutlineIcon sx={{fontSize: '50px', color:'orange'}} /> 
                                </IconButton>
                            </Tooltip>
                        )
                    }
                    <Tooltip title="Remove task">
                        <IconButton onClick={deleteTask}>
                            <RemoveCircleOutlineIcon sx={{fontSize: '40px', color:'grey'}} /> 
                        </IconButton >
                    </Tooltip>
                    <Tooltip title="Edit task">
                        <IconButton onClick={toggleEdit}>
                            {/* Conditional rendering */
                                props.task.notes_status ? (
                                    // if false
                                    <form onSubmit={editNotes}>
                                        Add note: <input required 
                                            type="text" 
                                            value={notes} 
                                            onChange={(e) => setNotes(e.target.value)} 
                                            placeholder="note"
                                        />
                                    </form>
                                ) : (
                                    // if true
                                    <EditIcon sx={{fontSize: '40px', color:'grey'}} />
                                    )
                            }
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default TaskItem;