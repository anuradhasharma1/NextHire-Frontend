import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
                NextHire
            </Link>

            <div className="flex items-center gap-4">
                <Link to="/jobs" className="text-gray-600 hover:text-blue-600 transition">
                    Jobs
                </Link>

                {user?.role === 'company' && (
                    <Link to="/post-job" className="text-gray-600 hover:text-blue-600 transition">
                        Post Job
                    </Link>
                )}

                {user?.role === 'candidate' && (
                    <Link to="/my-applications" className="text-gray-600 hover:text-blue-600 transition">
                        My Applications
                    </Link>
                )}

                {user ? (
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Hi, {user.name}!</span>
                        <button onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition text-sm">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login"
                            className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition text-sm">
                            Login
                        </Link>
                        <Link to="/register"
                            className="border border-blue-600 text-blue-600 px-4 py-1 rounded-lg hover:bg-blue-50 transition text-sm">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;