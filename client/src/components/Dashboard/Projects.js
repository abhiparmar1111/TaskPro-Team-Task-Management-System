import React, { useState } from 'react';
import ProjectForm from '../Projects/ProjectForm';
import ProjectList from '../Projects/ProjectList';
import Layout from '../Layout/Layout'

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (project) => {
        setSelectedProject(project);
    };

    const handleSuccess = () => {
        setRefresh(!refresh);
        setSelectedProject(null);
    };

    return (<Layout>
        <div className='container mt-4'>
            <h2 className='text-center mb-4'>Projects</h2>

            <div className='card shadow-sm mb-4'>
                <div className='card-body'>
                    <ProjectForm selectedProject={selectedProject} onSuccess={handleSuccess} />
                </div>
            </div>

            <ProjectList key={refresh} onEdit={handleEdit} />
        </div>
    </Layout>
    );
};

export default Projects;