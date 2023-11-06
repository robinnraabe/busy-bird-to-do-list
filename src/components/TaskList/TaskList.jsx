import TaskItem from '../TaskItem/TaskItem.jsx';
import Grid from '@mui/material/Grid';

function TaskList(props) {
    return (
        <div>
            <Grid container spacing={2}>
                {/* double check what map needs */}
                {props.taskList.map((task) => {
                    return <TaskItem 
                            key={task.id}
                            task={task}
                            getTasks={props.getTasks}
                        />
                })}
            </Grid>
        </div>
    )
}

export default TaskList;