import {useState} from 'react';
import axios from 'axios';

function sendTask(props) {
    const [task, setTask] = useState('');
    const addTask = (event) => {
        event.preventDefault();
        console.log('addTask:', task);
        axios.post('/todo', {
            task: task
        })
        .then((response) => {
            console.log(response.data);
            props.getTasks();
            setTask('');
        })
        .catch((error) => {
            console.log('Error in axios POST:', error);
            alert('Something went wrong with POST!');
        });
    }

    return (
    <div>
        <h1>TO DO APP</h1>
        <form onSubmit={addTask}>
        Task: <input 
            required type="text" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            placeholder="task"
        />
        <button>Add task</button>
        </form>
    </div>
    );
}

export default sendTask;