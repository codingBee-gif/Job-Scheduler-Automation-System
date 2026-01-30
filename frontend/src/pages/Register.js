import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import QuestionBoard from "../cards/QuestionBoard";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100" style={{ backgroundImage: "url('/Register-bg.jpg')" }}>

      {/* ⬇️ THIS IS THE KEY CONTAINER */}
      <div className="w-full max-w-screen-xl px-10
                      flex flex-col lg:flex-row
                      items-center lg:items-start
                      justify-between gap-16">

        {/* ✅ REGISTER CARD (ACTUALLY BIG NOW) */}
        <div className="w-full lg:w-3/5 xl:w-1/2
                        bg-white rounded-3xl shadow-2xl
                        px-12 py-14">

          <h2 className="text-4xl sm:text-5xl md:text-6xl
                         font-light text-center mb-10">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="h-16 px-6 rounded-xl border
                         text-lg md:text-xl
                         focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="h-16 px-6 rounded-xl border
                         text-lg md:text-xl
                         focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="h-16 px-6 rounded-xl border
                         text-lg md:text-xl
                         focus:ring-2 focus:ring-blue-500"
            />

            <button
              className="h-16 bg-blue-600 text-white
                         rounded-xl text-xl
                         hover:bg-blue-700 transition-all"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-10 text-lg">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>

        {/* QUESTION CARDS */}
        <div className="w-full lg:w-2/5">
          <QuestionBoard />
        </div>

      </div>
    </div>
  );
}

export default Register;
