import axios from 'axios';
import { useState } from 'react';
import { format } from "date-fns";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
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
        console.log(props.task.notes_status);
        console.log("props.task.notes:", props.task.notes);
        console.log("notes:", notes);
        axios.put(`/notesStatus/${props.task.id}`)
            .then((response) => {
                console.log('Toggled notes on', props.task.task);
                props.getTasks();
            })
            .catch((error) => {
                console.log('Error in the second axios PUT:', error);
                alert('Something went wrong with the second axios PUT');
            })
    }
    const editNotes = (event) => {
        event.preventDefault();
        toggleEdit();
        console.log("props.task.notes:", props.task.notes);
        console.log("notes:", notes);

        axios.put(`/notes/${props.task.id}`, {notes: notes})
            .then((response) => {
                console.log('Successfully updated notes on', props.task.task);
                props.getTasks();
            })
            .catch((error) => {
                console.log('Error in the third axios PUT:', error);
                alert('Something went wrong with the third axios PUT');
            })
    }        

    return (
        <Grid item xs={12}>
            <Card sx={{ 
                marginTop: '10px',
                display: 'flex', 
                flexDirection: 'row', 
                borderRadius: '0px', 
                outlineStyle: 'solid',
                backgroundColor: 'white',
                outlineColor: `${props.task.color}`, 
                boxShadow: `-10px 10px ${props.task.color}` }} 
            >
                <CardContent sx={{ width: '30%' }}>
                    {/*Main content goes here*/}
                    <Typography variant="h5">
                        {props.task.task}
                    </Typography>
                    <Typography sx={{color: 'grey'}}>
                        by {formattedDate}
                    </Typography>
                </CardContent>
    {/* INVESTIGATE VALUE OF FIELD? AND NOTES */}
                <CardContent sx={{ width: '35%' }}>
                    {props.task.notes_status ? (
                        // if true
                        <form onSubmit={editNotes}>
                            <TextField 
                                multiline
                                type="text" 
                                label="notes"
                                defaultValue={props.task.notes}
                                helperText="280 character limit"
                                onChange={(e) => setNotes(e.target.value)}
                            />
                            <Tooltip title="Save note">
                                <IconButton type="submit">
                                    <AddToPhotosIcon sx={{fontSize: '20px', color:'orange'}} />
                                </IconButton>
                            </Tooltip>
                        </form> 
                    ) : (
                        // if false
                        <div className="note-format">
                            {props.task.notes}
                        </div>
                    )}
                </CardContent>
                <CardActions sx={{padding: '10px', marginLeft: 'auto'}}>
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
                    <Tooltip title="Delete task">
                        <IconButton onClick={deleteTask}>
                            <RemoveCircleIcon sx={{fontSize: '40px', color:'rgb(254, 133, 148)'}} /> 
                        </IconButton >
                    </Tooltip>
                    <IconButton onClick={toggleEdit}>
                        <Tooltip title="Edit note">
                            <EditIcon sx={{fontSize: '40px', color:'rgb(133, 133, 133)'}} />   
                        </Tooltip>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default TaskItem;