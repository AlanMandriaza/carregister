import React, { useState } from 'react';

function Requeriments({ selectedVehicle, jobs }) {
  const [newJob, setNewJob] = useState('');
  const [jobsForVehicle, setJobsForVehicle] = useState(jobs);

  const addJob = (event) => {
    event.preventDefault();
    if (newJob) {
      const updatedJobs = [...jobsForVehicle, newJob];
      setJobsForVehicle(updatedJobs);
      setNewJob('');
      // Update this job list in the parent component or backend as needed
    }
  };

  const removeJob = (jobIndex) => {
    const updatedJobs = jobsForVehicle.filter((_, index) => index !== jobIndex);
    setJobsForVehicle(updatedJobs);
    // Update this job list in the parent component or backend as needed
  };

  return (
    <div className="requeriments-sidebar right-sidebar">
      <h3>Trabajos para {selectedVehicle ? selectedVehicle.marca : ''}</h3>
      {jobsForVehicle.length > 0 ? (
        <ul>
          {jobsForVehicle.map((job, index) => (
            <li key={index}>
              {job}
              <button onClick={() => removeJob(index)}>Quitar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay trabajos asignados.</p>
      )}

      {/* Bootstrap Form for Adding Jobs */}
      <form onSubmit={addJob} className="form-inline mt-2 mb-2">
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          placeholder="Añadir trabajo"
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mb-2">Añadir</button>
      </form>
    </div>
  );
}

export default Requeriments;
