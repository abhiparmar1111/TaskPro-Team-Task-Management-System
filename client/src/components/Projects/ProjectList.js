import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../../services/projectService';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../cards/ProjectCard';


const ProjectList = ({ onEdit }) => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await getProjects();
            setProjects(res.data);
        } catch (err) {
            console.error('Failed to load projects', err);
        }
    };

    const handleDelete = async (id) => {
        await deleteProject(id);
        fetchProjects();
    };

    return (
        <div className="row">
            {projects.map(project => (
                <div className="col-md-4 d-flex mb-3">
                <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    taskCount={project.taskCount}
                    updatedAt={project.updatedAt}
                    status={project.taskCount > 0 ? "Active": "Completed"}
                    onView={() => navigate(`/projects/${project.id}/tasks`)}
                    onEdit={() => onEdit(project)}
                    onDelete={() => handleDelete(project.id)}
                />
                </div>
            ))}
        </div>

    );
};

export default ProjectList;