import {useState, useEffect} from 'react';
import axios from 'axios';
import TaskForm from '../TaskForm/TaskForm.jsx';
import TaskList from '../TaskList/TaskList.jsx';
import Container from '@mui/material/Container';

function App() {
  const [taskList, setTaskList] = useState([]);

  const getTasks = () => {
    axios.get('/todo')
      .then((response) => {
        console.log('Successfully retreived data');
        setTaskList(response.data);
      })
      .catch((error) => {
        console.log('Error in axios GET:', error);
        alert('Something went wrong with GET');
      });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container maxWidth='lg'>
      <div>
        <TaskForm getTasks={getTasks} />
      </div>
      <div>
        <TaskList getTasks={getTasks} taskList={taskList}/>
      </div>
    </Container>
  )
}

export default App;
