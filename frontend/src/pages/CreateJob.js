import { useState } from 'react';
import api from '../api/axios';

function CreateJob({ onJobCreated }) {
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/jobs', formData);
      alert('Job created successfully');

      setFormData({
        companyName: '',
        role: '',
        notes: ''
      });

      if (onJobCreated) {
        onJobCreated();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">
      {/* CARD */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl
                      px-10 py-12">

        {/* HEADING */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl
                       font-light tracking-wide text-gray-800 mb-4">
          Create Job
        </h2>

        {/* SUBTEXT */}
        <p className="text-center text-gray-600 text-sm sm:text-base mb-10">
          Add a new job application to your tracker
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">

          {/* COMPANY NAME */}
          <div className="flex flex-col gap-1">
            <p className="text-sm sm:text-base text-gray-700">
              Company Name
            </p>
            <input
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full h-14 sm:h-16 px-5
                         rounded-xl border border-gray-300
                         text-base md:text-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition-all duration-300"
            />
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-1">
            <p className="text-sm sm:text-base text-gray-700">
              Role
            </p>
            <input
              name="role"
              placeholder="Enter role"
              value={formData.role}
              onChange={handleChange}
              className="w-full h-14 sm:h-16 px-5
                         rounded-xl border border-gray-300
                         text-base md:text-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition-all duration-300"
            />
          </div>

          {/* NOTES */}
          <div className="flex flex-col gap-1">
            <p className="text-sm sm:text-base text-gray-700">
              Notes
            </p>
            <textarea
              name="notes"
              placeholder="Any additional notes (optional)"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full resize-none px-5 py-4
                         rounded-xl border border-gray-300
                         text-base md:text-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition-all duration-300"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full h-14 sm:h-16
                       bg-green-700 text-white
                       text-base md:text-lg
                       rounded-xl mt-4
                       hover:bg-green-600 hover:scale-[1.02]
                       transition-all duration-300"
          >
            Add Job
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateJob;
