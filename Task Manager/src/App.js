import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TaskList from './components/TaskList';
import './style.css';

const AppContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  text-align: center;
  background-color: #ff8500;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
`;

const FilterContainer = styled.div`
  margin: 10px 0;
`;

const FilterButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bb5' : '#ddd')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  transition: background-color 0.3s;

  &:hover {
    background-color: #006699;
    color: white;
  }

  @media (max-width: 500px) {
    margin: 5px 0;
    width: 100%;
  }
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
    setError('');
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleUpdateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <CenteredContainer>
      <AppContainer>
        <h1>Task Manager</h1>
        <p>Click On The Texts To Scratch OFF The Completed Tasks</p>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <FilterContainer>
          <FilterButton
            onClick={() => setFilter('all')}
            active={filter === 'all'}
          >
            All
          </FilterButton>
          <FilterButton
            onClick={() => setFilter('completed')}
            active={filter === 'completed'}
          >
            Completed
          </FilterButton>
          <FilterButton
            onClick={() => setFilter('incomplete')}
            active={filter === 'incomplete'}
          >
            Incomplete
          </FilterButton>
        </FilterContainer>

        <TaskList
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
          onToggleComplete={handleToggleComplete}
        />
      </AppContainer>
    </CenteredContainer>
  );
}

export default App;
