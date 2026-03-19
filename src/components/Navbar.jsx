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
        <nav className="bg-[#241919] shadow-md px-8 py-4 flex justify-between items-center">
            <Link to="/" className=" flex items-center text-3xl font-bold text-[#FFFFFF]">
                NextHire
                <img width={60} className="  invert" src="/logo.png " alt="" />
            </Link>


            <div className="flex items-center gap-4">
                <Link to="/jobs" className="text-[#FFFFFF] hover:text-white font-bold transition">
                    Jobs
                </Link>

                {user?.role === 'company' && (
                    <Link to="/post-job" className="text-gray-600 hover:text-[#ffff] transition">
                        Post Job
                    </Link>
                )}

                {user?.role === 'candidate' && (
                    <Link to="/my-applications" className="text-[#ffff] font-semibold hover:text-[#7A6F6F] transition">
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
                            className="bg-[#FF6B6B] font-semibold text-white px-4 py-1 rounded-lg hover:bg-[#2E1F1F] transition text-sm">
                            Login
                        </Link>
                        <Link to="/register"
                            className="border border-[#FF6B6B] text-[#FFFFFF] px-4 py-1 rounded-lg hover:bg-[#2E1F1F] transition text-sm font-semibold ">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;