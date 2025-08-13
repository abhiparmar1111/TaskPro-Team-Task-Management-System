import React, { useState,  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from '../Tasks/TaskForm';
import KanbanBoard from '../Tasks/TaskList';
import Layout from '../Layout/Layout';

const Tasks = () => {
  const { projectId } = useParams();
  const [selectedTask, setSelectedTask] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // const handleEdit = (task) => {
  //   setSelectedTask(task);
  // };
  useEffect(() => {
    if (projectId) {
      localStorage.setItem("lastProjectId", projectId);
    }
  }, [projectId]);
  const handleSuccess = () => {
    setRefresh(!refresh);
    setSelectedTask(null);
  };

  return (
    <Layout>
      <TaskForm selectedTask={selectedTask} projectId={projectId} onSuccess={handleSuccess} />
      <KanbanBoard key={refresh} projectId={projectId} />
    </Layout>
  );
};

export default Tasks;