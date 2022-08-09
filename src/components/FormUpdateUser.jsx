import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, getUsers, updateUser } from '../lib/crudHelper';
import { SuccessSMS, ErrorSMS, Spinner } from '.';
import { BiEraser } from 'react-icons/bi';


// This <Component /> call from 🟨 index.js 🟨
export default function FormUpdateUser({ formId, formData, setFormData }) {

    const queryClient = useQueryClient();

    // for data fetching, backend data calling...
    const { isLoading, isError, data, error } = useQuery(['users', formId], () => getUser(formId));


    // react query mutation for update backend data... POST | PUT | DELETE 
    const updateMutation = useMutation((newData) => updateUser(formId, newData), {
        onSuccess: async (data) => {
            // update the Table UI Data...
            // queryClient.setQueryData(['users'], (oleValue) => [data]);
            queryClient.prefetchQuery(['users'], getUsers);
        }
    });


    if (isLoading) return <Spinner />
    if (isError) return <div className='text-lg text-red-700 text-center py-3'>Got Error - {error}</div>


    // these data come from backend
    const { name, email, salary, date, status } = data;
    const [firstName, lastName] = name ? name.split(' ') : formData;


    // user form Update by this function, when user edit its info...
    const handleSubmit = async (e) => {
        // stop browser to reloading...
        e.preventDefault();

        // prevent user submit empty form data...
        // if (Object.keys(formData).length === 0) return window.alert("Don't Have Form Data");

        let userName = `${formData.firstName ?? firstName} ${formData.lastName ?? lastName}`

        let updatedObject = Object.assign({}, data, formData, { name: userName });
        // data.name = 'admin', formData.name = 'client', 
        // data.name = 'client' [override it's values...]  


        console.log(updatedObject);

        await updateMutation.mutate(updatedObject);
    }


    // if (Object.keys(formData).length > 0) return <SuccessSMS message='Data Added' />
    // if (Object.keys(formData).length > 0) return <ErrorSMS message='Error' />



    return (
        // grab the data of these input boxes & return as an object

        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>

            <div className='input-type'>
                <input
                    type="text"
                    name='firstName'
                    defaultValue={firstName}
                    placeholder='First Name'
                    className='border w-full px-5 py-3 focus:outline-none rounded-md'
                    onChange={setFormData}
                />
            </div>

            <div className='input-type'>
                <input
                    type="text"
                    name='lastName'
                    defaultValue={lastName}
                    placeholder='Last Name'
                    className='border w-full px-5 py-3 focus:outline-none rounded-md'
                    onChange={setFormData}
                />
            </div>

            <div className='input-type'>
                <input
                    type="email"
                    name='email'
                    defaultValue={email}
                    placeholder='Email'
                    className='border w-full px-5 py-3 focus:outline-none rounded-md'
                    onChange={setFormData}
                />
            </div>

            <div className='input-type'>
                <input
                    type="text"
                    name='salary'
                    defaultValue={salary}
                    placeholder='Salary'
                    className='border w-full px-5 py-3 focus:outline-none rounded-md'
                    onChange={setFormData}
                />
            </div>

            <div className='input-type'>
                <input
                    type="date"
                    name='date'
                    defaultValue={date}
                    placeholder='Date'
                    className='border px-5 py-3 focus:outline-none rounded-md'
                    onChange={setFormData}
                />
            </div>

            {/* 🔘🔘🔘 Radio Button Container 🔘🔘🔘 */}
            <div className='flex items-center gap-10'>
                <div className='form-check'>
                    <input
                        type="radio"
                        name='status'
                        value='active'
                        id='radioDefault1'
                        defaultChecked={status == 'active'}
                        className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-100 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                        onChange={setFormData}
                    />
                    <label
                        htmlFor="radioDefault1"
                        className='inline-block text-gray-800 cursor-pointer'>
                        Active
                    </label>
                </div>

                <div className='form-check'>
                    <input
                        type="radio"
                        name='status'
                        value='inactive'
                        id='radioDefault2'
                        defaultChecked={status !== 'active'}
                        className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-100 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                        onChange={setFormData}
                    />
                    <label
                        htmlFor="radioDefault2"
                        className='inline-block text-gray-800 cursor-pointer'>
                        Inactive
                    </label>
                </div>
            </div>

            <button className='flex items-center justify-center text-md w-2/6 bg-orange-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-orange-400 hover:text-orange-400 duratison-150'>
                Update <span className='px-1'> <BiEraser size={20} /> </span>
            </button>
        </form>
    )
}
