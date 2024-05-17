/* eslint-disable react/prop-types */
import { MdClose } from 'react-icons/md';
import { format} from 'timeago.js';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxios';
const Notification = ({notification, isLoading, refetch}) => {
    const { _id, date, text, status} = notification;
    const useAxios = useAxiosPublic()
    if(isLoading){
        return <h4 className='text-center'>Loading...</h4>
    }
    // delete notification
    const handleDelete = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You sure delete this notification?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await useAxios.delete(`/notification/${_id}`);
            if (res.data?.acknowledged) {
              Swal.fire({
                title: "Deleted!",
                text: "Your notification has been deleted.",
                icon: "success",
              });
              refetch();
            }
          }
        });
      };

      // update notification
      const handleNotification = async () => {
        const PatchData = {
          count: 0,
          status: "Read",
        };
        await useAxios.patch(`/notification/${_id}`, PatchData);
        refetch();
      };
    return (
        <div className='flex w-full justify-between items-center border hover:bg-gray-300 rounded-md p-2 cursor-pointer'>
            <div onClick={handleNotification} className='flex flex-col'>
                <h3 className={`${status === "Unread" ? "font-bold text-gray-900" : "font-medium text-gray-400" }`}>{text}</h3>
                <h4 className='text-sm text-gray-500'>{format(date)}</h4>
                <p className='text-gray-500 text-sm'>{status === "Unread" ? "Unread" : "Read" }</p>
            </div>
            <div>
                <button onClick={handleDelete} className='btn btn-sm btn-circle text-xl text-red-500'><MdClose/></button>
            </div>
        </div>
    );
};

export default Notification;