import React, { useState } from "react";
import { FaTasks, FaEdit, FaTrash } from "react-icons/fa";
import "../../../src/App.css";


const ProjectCard = ({ id, title, description, taskCount, status = "Active", updatedAt, onView, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleView = () => {
    localStorage.setItem("lastProjectId", id);
    if (onView) onView();
  };

  return (<>{showModal && (
  <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
        <div className="modal-body">
          <p>{description}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}

    <div className="card shadow-sm w-100 h-100 project-card">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">
            <button
              onClick={onView}
              className="btn btn-link p-0 text-decoration-none fw-bold"
              style={{ fontSize: "1.1rem" }}
            >
              {title}
            </button>
          </h5>
          <span className={`badge ${status === "Completed" ? "bg-success" : "bg-primary"}`}>
            {status}
          </span>
        </div>

        {/* Updated At */}
        {updatedAt && (
          <small className="text-muted">
            Updated {new Date(updatedAt).toLocaleDateString()}
          </small>
        )}

        <p className="mt-2 mb-2" style={{ fontSize: "0.9rem", flexGrow: 1 }}>
          {description?.substring(0, 80)}...
        </p>
        {description?.length > 80 && (
          <button
            className="btn btn-sm btn-link p-0"
            onClick={openModal}
          >Read more
          </button>
        )}
        {status !== "done" && taskCount !== undefined && (

          <div className="mb-3 text-muted small">
            <FaTasks className="me-1" /> {taskCount} {taskCount === 1 ? 'Task' : 'Tasks'}
          </div>
        )}


        <div className="d-flex justify-content-between mt-auto">
          <button className="btn btn-sm btn-outline-primary" onClick={onView}>
            <FaTasks className="me-1" /> View
          </button>
          <button className="btn btn-sm btn-outline-warning" onClick={onEdit}>
            <FaEdit className="me-1" /> Edit
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
            <FaTrash className="me-1" /> Delete
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProjectCard;
