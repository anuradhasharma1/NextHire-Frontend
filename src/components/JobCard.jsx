import { useNavigate } from 'react-router-dom';
import { deleteData } from '../api/api';
import { useAuth } from '../context/AuthContext';

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = async (e) => {
    e.stopPropagation();  //stop card click from firing
    const confirm = window.confirm('Are you sure to delete this Job?');
    if (!confirm) return;

    const data = await deleteData(`/api/jobs/${job._id}`);
    if (data.message === 'Job deleted successfully!') {
      onDelete(job._id); //it tells job.jsx to remove it from the list
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/jobs/${job._id}`)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-black">{job.title}</h3>
          <p className="text-[#10B981] font-medium text-sm mt-1">{job.company}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span>{job.location}</span>
            <span>Rs. {job.salary}/month</span>
            <span className="capitalize">{job.jobType}</span>
          </div>
        </div>
        {/* only show delete button if logged in user posted this job*/}
        {user && user.id === job.postedBy?._id && (
          <button onClick={handleDelete} className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm'>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;