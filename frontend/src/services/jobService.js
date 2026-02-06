import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchJobs = async (filters = {}) => {
  const response = await axios.get(`${API_BASE_URL}/jobs`, {
    params: filters,
  });
  return response.data;
};

export const runJob = async (jobId) => {
  const response = await axios.post(
    `${API_BASE_URL}/run-job/${jobId}`
  );
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await axios.post(
    `${API_BASE_URL}/jobs`,
    jobData
  );
  return response.data;
};

export const fetchJobById = async (jobId) => {
  const response = await axios.get(
    `${API_BASE_URL}/jobs/${jobId}`
  );
  return response.data;
};
