import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">Status: {task.status}</p>
                <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => onEdit(task)}>
                        Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>

    );
};

export default TaskItem;