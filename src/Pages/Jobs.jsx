import { useState,useEffect } from 'react'
import { getData } from '../api/api';
import JobCard from '../components/JobCard';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await getData('/api/jobs');
            setJobs(data);
            setLoading(false);
        };
        fetchJobs();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Loading jobs...</p>
        </div>
    );

    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>All Jobs</h1>
            {Jobs.length === 0 ? (
                <p className=' text-gray-500'>No Jobs Posted Yet!</p>
            ) : (
                <div className='grid gap-4'>
                    {jobs.map(job => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;