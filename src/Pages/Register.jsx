import { postData } from '../api/api';
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'



const Register = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({ name: '', email: '', password: '', role: 'candidate' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await postData('/api/auth/register', formData);
            if (data.message === 'Registered successfully!') {
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Something went wrong !');
        }
        setLoading(false);
    };
    return (
        <div className="min-h-screen  flex items-center justify-center">
            <div className="bg-[#2E1F1F] p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-[#ffff] mb-6">
                    Create Account
                </h2>

                {error && (
                    <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-[#ffff]">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Anuradha Sharma"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]"
                            required
                        />
                    </div>

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

                    <div>
                        <label className="text-sm text-[#ffff]">Register as</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]"
                        >
                            <option value="candidate">Candidate</option>
                            <option value="company">Company</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF6B6B] text-white py-2 rounded-lg hover:bg-[#FF5252] transition font-semibold"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#10B981] hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};



export default Register;