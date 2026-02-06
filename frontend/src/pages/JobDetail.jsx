import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJobById } from "../services/jobService";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await fetchJobById(id);
        setJob(data);
      } catch (err) {
        setError("Failed to load job details");
      }
    };

    loadJob();
  }, [id]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!job) {
    return <p>Loading...</p>;
  }

  let formattedPayload = "{}";
  try {
    formattedPayload = JSON.stringify(
      JSON.parse(job.payload),
      null,
      2
    );
  } catch {}

  return (
    <div className="max-w-3xl">
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-600 text-lg hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <h2 className="text-5xl font-semibold mb-6">
        Job Details
      </h2>

      <div className="bg-white border rounded text-lg p-6 space-y-4">
        <p>
          <strong>ID:</strong> {job.id}
        </p>

        <p>
          <strong>Task Name:</strong> {job.taskName}
        </p>

        <p>
          <strong>Status:</strong> {job.status}
        </p>

        <p>
          <strong>Priority:</strong> {job.priority}
        </p>

        <div>
          <strong>Payload:</strong>
          <pre className="bg-gray-100 p-4 rounded text-sm mt-2 overflow-x-auto">
{formattedPayload}
          </pre>
        </div>

        <p className="text-sm text-gray-500">
          Created at: {job.createdAt}
        </p>
      </div>
    </div>
  );
}
