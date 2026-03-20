import { getData } from '../api/api';
import { useState, useEffect } from 'react'
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

    // remove deleted job from list without refreshing!
    const handleDelete = (deletedId) => {
        setJobs(jobs.filter(job => job._id !== deletedId));
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Loading jobs...</p>
        </div>
    );

    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-4xl font-bold flex gap-3 text-[#ffff] mb-6'>All Jobs
                <img className='w-10 invert' src="/job.png" alt="" />
            </h1>

            {jobs.length === 0 ? (
                <p className=' text-gray-500'>No Jobs Posted Yet!</p>
            ) : (
                <div className='grid gap-4'>
                    {jobs.map(job => (
                        <JobCard key={job._id} job={job} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;