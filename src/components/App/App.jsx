import {useState, useEffect} from 'react';
import axios from 'axios';
import TaskForm from '../TaskForm/TaskForm.jsx';
import TaskList from '../TaskList/TaskList.jsx';
import Container from '@mui/material/Container';
// import { ChooseDate } from '../ChooseDate/ChooseDate.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './App.css';
import List from '@mui/material/List';

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container className="container" maxWidth='lg' sx={{ padding: '5px' }}>
        <div className="internal">
          <TaskForm className='input-form' getTasks={getTasks} />
        </div>
        <List sx={{ 
          maxHeight: '330px', 
          overflow: 'auto',
          padding: '15px',
          margin: '0px 30px 0px 30px' }}
        >
          <TaskList getTasks={getTasks} taskList={taskList}/>
        </List>
      </Container>
    </LocalizationProvider>
  )
}

export default App;
