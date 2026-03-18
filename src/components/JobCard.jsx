import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/jobs/${job._id}`)}>
      <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
      <p className="text-blue-600 font-medium text-sm mt-1">{job.company}</p>
      <div className="flex gap-4 mt-2 text-sm text-gray-500">
        <span>{job.location}</span>
        <span>Rs. {job.salary}/month</span>
        <span className="capitalize">{job.jobType}</span>
      </div>
    </div>
  );
};

export default JobCard;