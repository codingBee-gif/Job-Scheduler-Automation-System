
import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';





function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', formData);

      const accessToken = response.data.accessToken;

      localStorage.setItem('accessToken', accessToken);

      navigate('/dashboard');

    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center
             bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/login-bg.jpg')" }}
>
    <div className=' h-full  p-10 w-full flex flex-col m-11 rounded-xl ml-12  ' >
      <h2 className='w-full  text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide

'>Move to Your Job Tracker</h2>
      <p className=' sm:text-base md:text-lg leading-relaxed sm:leading-normal m-2 ml-9 text-md font-semibold text-gray-600 mb-2 text-5xl gap-7'>All Your Job Applications in One Place</p>
      

      <form onSubmit={handleSubmit} className='flex flex-col p-7 ml-10'>
       
        <input className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5
h-12 md:h-14 lg:h-16 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 
 md:h-14 lg:h-16 sm:px-4 sm:py-2.5 text-sm sm:text-base  transition-all duration-300 flex-grow ease-in-ou border border-gray-300 px-3 py-2 mb-3 
           focus:outline-none focus:ring-2 focus:ring-blue-500 
           hover:border-blue-400 m-4 h-12 p-4 order-none rounded-xl  bg-white w-80 text shadow-2xl placeholder:text-base md:placeholder:text-lg
'
          name="email"
          placeholder="Enter your Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 placeholder:text-base md:placeholder:text-lg
 
h-12 md:h-14 lg:h-16 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 
 md:h-14 lg:h-16 sm:px-4 sm:py-2.5 text-sm sm:text-base  transition-all duration-300 flex-grow ease-in-ou border border-gray-300 px-3 py-2 mb-3 
           focus:outline-none focus:ring-2 focus:ring-blue-500 
           hover:border-blue-400 m-4 h-12 p-4 order-none rounded-xl  bg-white w-80 text shadow-2xl'
        />
         <div>
        <button
            type="submit"
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 ml-40
h-9 sm:h-10 md:h-12 lg:h-14
text-sm md:text-base lg:text-lg
px-3 md:px-5
transition-all duration-300 ease-in-out
hover:scale-105 hover:bg-green-500
bg-green-950 text-white
rounded
"
          >
            Log in
          </button>
      </div>
      </form>
      {/* <p className="mt-4 text-center   w-80 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-normal
">
  Don’t have an account?{' '}
  <span
    className="text-blue-600 cursor-pointer hover:underline transition-all duration-300 ease-in-out hover:text-lg"
    onClick={() => navigate('/register')}
  >
    Register
  </span> */}
  {/* LOGIN LINK */}
        <p className="mt-6  text-2xl  text-gray-600">
          Already have an account?{' '}
          <span
            className="text-blue-600 text-2xl cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
{/* </p> */}

    </div>
   
     
    
    </div>
  
    
  );
}

export default Login;
