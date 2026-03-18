import { getData } from '../api/api';
import { useEffect, useState } from 'react';


const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            const data = await getData('/api/applications/mine');
            setApplications(data);
            setLoading(false);
        };
        fetchApplications();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Loading...</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Applications</h1>
            {applications.length === 0 ? (
                <p className="text-gray-500">You have not applied for any jobs yet!</p>
            ) : (
                <div className="grid gap-4">
                    {applications.map(app => (
                        <div key={app._id} className="bg-white rounded-xl shadow-md p-5">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {app.job?.title}
                            </h3>
                            <p className="text-gray-500 text-sm">{app.job?.company}</p>
                            <p className="text-gray-500 text-sm">{app.job?.location}</p>
                            <span className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold
                ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : ''}
                ${app.status === 'accepted' ? 'bg-green-100 text-green-600' : ''}
                ${app.status === 'rejected' ? 'bg-red-100 text-red-600' : ''}
              `}>
                                {app.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyApplications;