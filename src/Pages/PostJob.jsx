import { postData } from '../api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PostJob = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '', description: '', company: '', location: '', salary: '', jobType: 'full-time'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await postData('/api/jobs', formData, true);
            if (data._id) {
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
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-[#2E1F1F] rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#ffff] mb-6">Post a Job</h2>

                {error && (
                    <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-[#ffff]">Job Title</label>
                        <input type="text" name="title" value={formData.title}
                            onChange={handleChange} placeholder="Backend Developer"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]"
                            required />
                    </div>

                    <div>
                        <label className="text-sm text-[#ffff]">Company Name</label>
                        <input type="text" name="company" value={formData.company}
                            onChange={handleChange} placeholder="Google India"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]"
                            required />
                    </div>

                    <div>
                        <label className="text-sm text-[#ffff]">Location</label>
                        <input type="text" name="location" value={formData.location}
                            onChange={handleChange} placeholder="Patna, Bihar"
                            className="w-full  border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]"
                            required />
                    </div>

                    <div>
                        <label className="text-sm text-[#ffff]">Salary (per month)</label>
                        <input  type="number" name="salary" value={formData.salary}
                            onChange={handleChange} placeholder="80000"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]"
                            required />
                    </div>

                    <div>
                        <label className="text-sm text-[#ffff]">Job Type</label>
                        <select name="jobType" value={formData.jobType}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]">
                            <option value="full-time" >Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="internship">Internship</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-[#ffff]">Description</label>
                        <textarea name="description" value={formData.description}
                            onChange={handleChange} placeholder="Job description..."
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#361111d7]"
                            required />
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full bg-[#FF6B6B] text-white py-2 rounded-lg hover:bg-[#FF5252] transition font-semibold">
                        {loading ? 'Posting...' : 'Post Job'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJob