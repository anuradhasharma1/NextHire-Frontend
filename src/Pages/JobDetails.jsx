import { getData, postData } from '../api/api';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            const data = await getData(`/api/jobs/${id}`);
            setJob(data);
            setLoading(false);
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        const data = await postData(`/api/applications/${id}/apply`, {}, true);
        setMessage(data.message);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Loading...</p>
        </div>
    );


    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
                <p className="text-blue-600 font-semibold mt-1">{job.company}</p>

                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <span>{job.location}</span>
                    <span>Rs. {job.salary}/month</span>
                    <span className="capitalize">{job.jobType}</span>
                </div>

                <p className="mt-4 text-gray-600">{job.description}</p>

                {message && (
                    <p className="mt-4 bg-green-100 text-green-600 p-3 rounded-lg text-sm">
                        {message}
                    </p>
                )}

                {user?.role === 'candidate' && (
                    <button
                        onClick={handleApply}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        Apply Now
                    </button>
                )}

                {!user && (
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        Login to Apply
                    </button>
                )}
            </div>
        </div>
    );
};



export default JobDetails