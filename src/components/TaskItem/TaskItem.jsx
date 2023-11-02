import axios from 'axios';
import './TaskItem.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function TaskItem(props) {
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
                console.log('Error in acios PUT:', error);
                alert('Something went wrong with axios PUT');
        });
    }

    return (
        // className is the Reaact version of class
        // md={4} will fill 4 columns on md/l screens PER ITEM
        // xs={12} will make 1 item fill all 12 columns on small screens
        <Grid item xs={12} md={4}>
            <Card>
                <CardContent className= { props.task.status ? 'complete' : 'incomplete' }>
                    {/*Main content goes here*/}
                    <Typography variant="h3">
                        {/* MUI way of adding h3 */}
                        {props.task.task}
                    </Typography>
                    <Typography>
                        is to be done immediately
                    </Typography>
                </CardContent>
                {/* sx overrides MUI css */}
                <CardActions sx={{padding: '10px', float: 'right'}}>
                    {/*Buttons go here*/}
                    {/* Conditional rendering */
                        props.task.status ? (
                            // if true
                            <p>Completed</p>
                        ) : (
                            // if false
                            <Button variant="contained" onClick={toggleComplete}>Complete</Button>
                        )
                    }
                    <Button variant="contained" onClick={deleteTask}>Delete</Button>
                    
                </CardActions>
            </Card>
        </Grid>
    )
}

export default TaskItem;