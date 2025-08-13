// import React, { useEffect, useState } from 'react';
// import { getTasks, updateTask, deleteTask } from '../../services/taskService';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// const columns = {
//   todo: { title: "To Do", status: "todo" },
//   "in-progress": { title: "In Progress", status: "in-progress" },
//   complete: { title: "Complete", status: "complete" }
// };

// const KanbanBoard = ({ projectId }) => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     loadTasks();
//   }, [projectId]);

//   const loadTasks = async () => {
//     const res = await getTasks();
//     setTasks(res.data.filter(task => task.projectId === Number(projectId)));
//   };

//   const onDragEnd = async (result) => {
//     const { destination, source, draggableId } = result;
//     if (!destination || destination.droppableId === source.droppableId) return;

//     const newStatus = destination.droppableId;
//     const taskId = Number(draggableId);

//     // Optimistic UI update
//     setTasks(prev =>
//       prev.map(task =>
//         task.id === taskId ? { ...task, status: newStatus } : task
//       )
//     );

//     // API update
//     await updateTask(taskId, { status: newStatus });
//     loadTasks();
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div style={{ display: "flex", gap: "20px" }}>
//         {Object.keys(columns).map(colId => (
//           <Droppable key={colId} droppableId={colId}>
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 style={{
//                   flex: 1,
//                   background: "#f4f4f4",
//                   padding: "10px",
//                   borderRadius: "8px",
//                   minHeight: "300px"
//                 }}
//               >
//                 <h4>{columns[colId].title}</h4>
//                 {tasks
//                   .filter(task => task.status === colId)
//                   .map((task, index) => (
//                     <Draggable key={task.id} draggableId={String(task.id)} index={index}>
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={{
//                             background: "#fff",
//                             padding: "10px",
//                             marginBottom: "8px",
//                             borderRadius: "4px",
//                             boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
//                             ...provided.draggableProps.style
//                           }}
//                         >
//                           <h5>{task.title}</h5>
//                           <p>{task.description}</p>
//                           <button
//                             className="btn btn-danger btn-sm"
//                             onClick={() => deleteTask(task.id).then(loadTasks)}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </div>
//     </DragDropContext>
//   );
// };

// export default KanbanBoard;
