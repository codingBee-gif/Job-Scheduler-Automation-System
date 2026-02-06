import { useState } from "react";
import { createJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [payloadText, setPayloadText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!taskName || !priority) {
      setError("Task name and priority are required");
      return;
    }

    try {
      await createJob({
        taskName,
        priority,
        payload: {
          message: payloadText, // 👈 wrapped as object
        },
      });

      navigate("/");
    } catch (err) {
      setError("Failed to create job");
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">
        Create New Job
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 space-y-5 shadow-sm"
      >
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            Task Name
          </label>
          <input
            className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-black"
            placeholder="Send Welcome Email"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            className="w-full border px-3 py-2 rounded-lg text-sm"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Payload (Text)
          </label>
          <input
            className="w-full border px-3 py-2 rounded-lg text-sm"
            placeholder="e.g. test@test.com"
            value={payloadText}
            onChange={(e) => setPayloadText(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Create Job
          </button>
        </div>
      </form>
    </div>
  );
}
