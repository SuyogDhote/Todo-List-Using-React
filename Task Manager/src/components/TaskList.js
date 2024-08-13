import React, { useState } from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;

  @media (max-width: 500px) {
    padding: 0 10px;
  }
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  color: ${({ completed }) => (completed ? '#888' : 'white')};

  span {
    flex: 1;
    margin-right: 10px;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Button = styled.button`
  margin-left: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;

const EditButton = styled(Button)`
  background-color: #008cba;

  &:hover {
    background-color: #007bb5;
  }
`;

function TaskList({ tasks, onDeleteTask, onUpdateTask, onToggleComplete }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentEdit, setCurrentEdit] = useState('');

  const handleEditTask = (index, task) => {
    setEditingIndex(index);
    setCurrentEdit(task);
  };

  const handleUpdateTask = (index) => {
    onUpdateTask(index, currentEdit);
    setEditingIndex(null);
    setCurrentEdit('');
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index} completed={task.completed}>
          {editingIndex === index ? (
            <>
              <input
                type="text"
                value={currentEdit}
                onChange={(e) => setCurrentEdit(e.target.value)}
              />
              <Button onClick={() => handleUpdateTask(index)}>Save</Button>
            </>
          ) : (
            <>
              <span onClick={() => onToggleComplete(index)}>{task.text}</span>
              <EditButton onClick={() => handleEditTask(index, task.text)}>
                Edit
              </EditButton>
              <Button onClick={() => onDeleteTask(index)}>Delete</Button>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;

// -------------------------------------------CheckBox-------------------------------------------------------------------------
// import React, { useState } from 'react';
// import styled from 'styled-components';

// const List = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   margin: 20px 0;

//   @media (max-width: 500px) {
//     padding: 0 10px;
//   }
// `;

// const ListItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 8px;
//   border-bottom: 1px solid #ccc;
//   text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
//   color: ${({ completed }) => (completed ? '#888' : 'black')};

//   span {
//     flex: 1;
//     margin-right: 10px;
//     cursor: pointer;
//   }

//   @media (max-width: 500px) {
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `;

// const Button = styled.button`
//   margin-left: 8px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   cursor: pointer;
//   border-radius: 4px;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const EditButton = styled(Button)`
//   background-color: #008cba;

//   &:hover {
//     background-color: #007bb5;
//   }
// `;

// function TaskList({ tasks, onDeleteTask, onUpdateTask, onToggleComplete }) {
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [currentEdit, setCurrentEdit] = useState('');

//   const handleEditTask = (index, task) => {
//     setEditingIndex(index);
//     setCurrentEdit(task);
//   };

//   const handleUpdateTask = (index) => {
//     onUpdateTask(index, currentEdit);
//     setEditingIndex(null);
//     setCurrentEdit('');
//   };

//   return (
//     <List>
//       {tasks.map((task, index) => (
//         <ListItem key={index} completed={task.completed}>
//           <input
//             type="checkbox"
//             checked={task.completed}
//             onChange={() => onToggleComplete(index)}
//           />
//           {editingIndex === index ? (
//             <>
//               <input
//                 type="text"
//                 value={currentEdit}
//                 onChange={(e) => setCurrentEdit(e.target.value)}
//               />
//               <Button onClick={() => handleUpdateTask(index)}>Save</Button>
//             </>
//           ) : (
//             <>
//               <span>{task.text}</span>
//               <EditButton onClick={() => handleEditTask(index, task.text)}>
//                 Edit
//               </EditButton>
//               <Button onClick={() => onDeleteTask(index)}>Delete</Button>
//             </>
//           )}
//         </ListItem>
//       ))}
//     </List>
//   );
// }

// export default TaskList;
