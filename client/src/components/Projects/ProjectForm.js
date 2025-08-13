import React, { useEffect, useState } from 'react';
import { createProject, updateProject } from '../../services/projectService';

const ProjectForm = ({ selectedProject, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (selectedProject) {
            setTitle(selectedProject.title);
            setDescription(selectedProject.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [selectedProject]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (selectedProject) {
                await updateProject(selectedProject.id, { title, description });
            } else {
                await createProject({ title, description });
            }
            onSuccess();
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error('Error saving project', err);
        }
    };

    return (
        <div className="project-form-container shadow-sm p-4 mb-4 mx-auto" style={{ maxWidth: "500px" }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type='text'
                        className="form-control"
                        name='title'
                        placeholder="Project title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        name="description"
                        placeholder="Project description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-100">
                        {selectedProject ? 'Update' : 'Add'} Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;