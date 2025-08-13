import React from 'react'

function ProjectItem({ project, onEdit, onDelete }) {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button onClick={() => onEdit(project)}>Edit</button>
            <button onClick={() => onDelete(project.id)}>Delete</button>
        </div>
    )
}

export default ProjectItem