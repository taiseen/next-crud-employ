import { toggleChangeAction, updateAction, deleteAction } from '../redux/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../lib/crudHelper';
import { Spinner } from '.';
import Image from 'next/image';


// This <Component /> call from 🟨 index.js 🟨
export default function Table() {

    const { isLoading, isError, data, error } = useQuery(['users'], getUsers);

    if (isLoading) return <Spinner />
    if (isError) return <div className='text-lg text-red-500 text-center py-3'>Got Error - {error}</div>


    return (
        <table className='min-w-full table-auto'>

            {/* 🟨🟨🟨 Table Header 🟨🟨🟨 */}
            <thead>

                {/* 🟨🟨🟨 Row 🟨🟨🟨 */}
                <tr className='bg-gray-800 w-fit'>

                    {/* 🟨🟨🟨 Column's 🟨🟨🟨 */}
                    <th className='px-16 py-2'>
                        <span className='text-gray-200'>Name</span>
                    </th>
                    <th className='px-16 py-2'>
                        <span className='text-gray-200'>Email</span>
                    </th>
                    <th className='px-16 py-2'>
                        <span className='text-gray-200'>Salary</span>
                    </th>
                    <th className='px-16 py-2'>
                        <span className='text-gray-200'>Joining Date</span>
                    </th>
                    <th className='px-16 py-2'>
                        <span className='text-gray-200'>Status</span>
                    </th>
                    <th className='px-16 py-2'>
                        <span className='text-gray-200'>Actions</span>
                    </th>
                </tr>

            </thead>


            {/* 🟨🟨🟨 Table Body 🟨🟨🟨 */}
            <tbody className='bg-gray-300'>
                {
                    data.length
                        ? data.map(person => <TableRow key={person._id} {...person} />)
                        : <h1>No data found</h1>
                }
            </tbody>

        </table>
    )
}



// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// dedicated child for this component...
const TableRow = ({ _id, name, avatar, email, salary, date, status }) => {

    // read ==> operation at redux store... state...
    const visible = useSelector((state) => state.app.client.toggleFrom);
    const dispatch = useDispatch();


    const onUpdate = () => {

        // change the value of the store
        dispatch(toggleChangeAction(_id))

        // user click at update/edit icon... for edit info...
        if (visible) {
            dispatch(updateAction(_id))
        }
    }


    const onDelete = () => {

        // if edit window is not open, at then delete this...
        if (!visible) {
            dispatch(deleteAction(_id))
        }

    }



    return (
        <tr className='bg-gray-100 text-center' >
            <td className='px-16 py-2 flex items-center'>
                <img src={avatar || "#"} alt="userImage" className='h-10 w-10 rounded-full object-cover' />

                {/* <Image
                    src={avatar || "#"}
                    alt="Picture of the user"
                    width={40}
                    height={40}
                /> */}

                <span className='text-center ml-3 font-semibold'>{name || 'Unknown'}</span>
            </td>
            <td className='px-16 py-2'>
                <span>{email || 'Unknown'}</span>
            </td>
            <td className='px-16 py-2'>
                <span>${salary || '00'}</span>
            </td>
            <td className='px-16 py-2'>
                <span>{date || 'Unknown'}</span>
            </td>
            <td className='px-16 py-2'>
                <button className='cursor-pointer'>
                    <span className={`${status === 'inactive' ? 'bg-red-500' : 'bg-green-500'} px-5 py-1 rounded-full text-white`}>
                        {status.charAt(0).toUpperCase() + status.slice(1) || 'Unknown'}
                    </span>
                </button>
            </td>
            <td className='px-16 py-2 space-x-2 '>
                <button className='cursor-pointer' onClick={onUpdate}>
                    <BiEdit size={25} color={"rgb(35,200,95)"} />
                </button>
                <button className='cursor-pointer' onClick={onDelete}>
                    <BiTrashAlt size={25} color={"rgb(245,65,95)"} />
                </button>
            </td>
        </tr >
    )
}