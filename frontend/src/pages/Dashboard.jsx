import { useEffect, useState } from "react";
import { fetchJobs, runJob } from "../services/jobService";
import { Link } from "react-router-dom";
import TableSkeleton from "../components/TableSkeleton";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs({
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
      });
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [statusFilter, priorityFilter]);

  const handleRunJob = async (jobId) => {
    try {
      await runJob(jobId);
      loadJobs(); // refresh list
    } catch (error) {
      alert("Failed to run job");
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded text-sm font-medium";
    if (status === "pending") return `${base} bg-yellow-100 text-yellow-800`;
    if (status === "running") return `${base} bg-blue-100 text-blue-800`;
    if (status === "completed") return `${base} bg-green-100 text-green-800`;
    return base;
  };

  return (
    <div>
      <h2 className="text-5xl pb-5">Jobs Dashboard</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6 text-lg">
        <select
          className="border px-3 py-2 rounded w-48 text-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Status: All</option>
          <option value="pending">pending</option>
          <option value="running">running</option>
          <option value="completed">completed</option>
        </select>

        <select
          className="border px-3 py-2 rounded w-48"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">Priority: All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border rounded">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Task</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No jobs found
                  </td>
                </tr>
              )}

              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{job.id}</td>

                  <td className="p-3">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {job.taskName}
                    </Link>
                  </td>

                  <td className="p-3">{job.priority}</td>

                  <td className="p-3">
                    <span className={getStatusBadge(job.status)}>
                      {job.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {job.status === "pending" ? (
                      <button
                        onClick={() => handleRunJob(job.id)}
                        className="bg-black text-white px-3 py-1 rounded"
                      >
                        Run
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
