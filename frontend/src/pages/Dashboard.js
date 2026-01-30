import { useEffect, useState } from 'react';
import api from '../api/axios';
import CreateJob from './CreateJob';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data.jobs);
    } catch {
      setError('Session expired. Please login again.');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const updateStatus = async (jobId, newStatus) => {
    try {
      await api.patch(`/jobs/${jobId}`, { status: newStatus });
      fetchJobs();
    } catch {
      alert('Failed to update status');
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm('Delete job?')) return;
    await api.delete(`/jobs/${jobId}`);
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100
                    px-6 py-10">

      {/* MAIN CONTAINER */}
      <div className="max-w-screen-xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row
                        items-center justify-between
                        gap-6 mb-12">

          <h2 className="text-3xl sm:text-4xl md:text-5xl
                         font-light tracking-wide text-gray-800">
            My Jobs
          </h2>

          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-lg
                       bg-red-600 text-white
                       text-sm sm:text-base
                       hover:bg-red-500
                       transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* CREATE JOB */}
        <CreateJob onJobCreated={fetchJobs} />

        {/* ERROR */}
        {error && (
          <p className="mt-6 text-center text-red-600">
            {error}
          </p>
        )}

        {/* JOB LIST */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-xl
                         p-6 flex flex-col justify-between"
            >
              {/* JOB INFO */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {job.companyName}
                </h3>
                <p className="text-gray-600 mt-1">
                  {job.role}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex flex-col gap-4">

                <select
                  value={job.status}
                  onChange={(e) => updateStatus(job._id, e.target.value)}
                  className="h-11 px-4 rounded-lg
                             border border-gray-300
                             text-sm md:text-base
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  onClick={() => deleteJob(job._id)}
                  className="h-11 rounded-lg
                             bg-red-500 text-white
                             text-sm md:text-base
                             hover:bg-red-400
                             transition-all duration-300"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {jobs.length === 0 && !error && (
          <p className="text-center text-gray-600 mt-16">
            No jobs added yet. Start by creating one above.
          </p>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
