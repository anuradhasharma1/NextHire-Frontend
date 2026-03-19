import { postData } from '../api/api';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await postData('/api/auth/login', formData);
      if (data.token) {
        login(data.user, data.token);
        navigate('/jobs');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1B1212] flex items-center justify-center">
      <div className="bg-[#2E1F1F] p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#ffff] mb-6">
          Welcome Back!
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-[#ffff]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="anuradha@gmail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#ffff]">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-[#FF6B6B] text-white py-2 rounded-lg hover:bg-[#FF5252] transition font-semibold"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-[#ffff] mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#10B981] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;