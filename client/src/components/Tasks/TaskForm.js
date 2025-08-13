import React, { useEffect, useState } from 'react';
import { createTask, updateTask } from '../../services/taskService';

const TaskForm = ({ selectedTask, projectId, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    // const [status, setStatus] = useState('todo');

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDescription(selectedTask.description);
            setDueDate(selectedTask.dueDate.split('T')[0]);
            // setStatus(selectedTask.status || 'todo');
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
            // setStatus('todo');
        }
    }, [selectedTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { title, description, dueDate, status: selectedTask?.status || 'todo',projectId };
            if (selectedTask) {
                await updateTask(selectedTask.id, data);
            } else {
                await createTask(data);
            }
            onSuccess();
            setTitle('');
            setDescription('');
            setDueDate('');
            // setStatus('todo');
        } catch (err) {
            console.error('Task save failed', err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: "500px",
                margin: "50px auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}
        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                className="form-control"
            />

            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="form-control"
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-control"
            />


            <button
                type="submit"
                className="btn btn-primary w-auto align-self-center mt-3 mb-3"
            >
                {selectedTask ? 'Update' : 'Add'} Task
            </button>
        </form>

    );
};

export default TaskForm;
