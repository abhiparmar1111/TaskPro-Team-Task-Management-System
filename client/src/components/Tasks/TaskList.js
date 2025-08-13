import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getTasks, updateTask, deleteTask } from '../../services/taskService';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const columns = {
  todo: { title: "To Do" },
  "in-progress": { title: "In Progress" },
  done: { title: "done" }
};

const KanbanBoard = ({ projectId: propProjectId  }) => {
  const params = useParams();
  const projectId =
    propProjectId || params.projectId || localStorage.getItem("lastProjectId");
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async () => {
    const res = await getTasks();
    setTasks(res.data.filter(task => task.projectId === Number(projectId)));
  }, [projectId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId;
    const taskId = Number(draggableId);
    const movedTask = tasks.find(t => t.id === taskId);

    // Optimistic UI update
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // API update
    await updateTask(taskId, { ...movedTask, status: newStatus });
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {Object.keys(columns).map(colId => (
          <Droppable key={colId} droppableId={colId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  flex: 1,
                  background: "#f4f4f4",
                  padding: "10px",
                  borderRadius: "8px",
                  minHeight: "300px",
                  overflowY: "auto"
                }}
              >
                <h4>{columns[colId].title}</h4>
                {tasks
                  .filter(task => task.status === colId)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            background: "#fff",
                            padding: "10px",
                            marginBottom: "8px",
                            borderRadius: "4px",
                            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                            ...provided.draggableProps.style
                          }}
                        >
                          <h5>{task.title}</h5>
                          <p>{task.description}</p>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(task.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
