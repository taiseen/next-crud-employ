import { BiEdit, BiTrashAlt } from 'react-icons/bi';

// This <Component /> call from 🟨 index.js 🟨
export default function Table() {

    return (
        <table className='min-w-full table-auto'>

            {/* 🟨🟨🟨 Table Header 🟨🟨🟨 */}
            <thead>

                {/* 🟨🟨🟨 Row 🟨🟨🟨 */}
                <tr className='bg-gray-800'>

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

                <tr className='bg-gray-100 text-center'>
                    <td className='px-16 py-2 flex items-center'>
                        <img src="#" alt="" />
                        <span className='text-center ml-2 font-semibold'>Img + User Name</span>
                    </td>
                    <td className='px-16 py-2'>
                        <span>taiseen@gmail.com</span>
                    </td>
                    <td className='px-16 py-2'>
                        <span>$25000</span>
                    </td>
                    <td className='px-16 py-2'>
                        <span>10-05-2022</span>
                    </td>
                    <td className='px-16 py-2'>
                        <button className='cursor-pointer'>
                            <span className='bg-green-500 px-5 py-1 rounded-full text-white'>Active</span>
                        </button>
                    </td>
                    <td className='px-16 py-2 flex items-center justify-around bg-green-400'>
                        <button className='cursor-pointer'>
                            <BiEdit size={25} color={"rgb(35,200,95)"} />
                        </button>
                        <button className='cursor-pointer'>
                            <BiTrashAlt size={25} color={"rgb(245,65,95)"} />
                        </button>
                    </td>
                </tr>

            </tbody>

        </table>
    )
}

