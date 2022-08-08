import { useQueryClient, useMutation } from '@tanstack/react-query';
import { addUser } from '../lib/crudHelper';
import { BiPlus } from 'react-icons/bi';
import { SuccessSMS, ErrorSMS } from '.';
import { useReducer } from 'react';
import Spinner from './Spinner';


const formReducer = (state, event) => {

    const { name, value } = event.target;

    return {
        ...state, [name]: value
    }
}


// This <Component /> call from 🟨 index.js 🟨
export default function Form() {


    // const [] = useReducer(() => { }, {});
    const [formData, setFormData] = useReducer(formReducer, {});

    const addMutation = useMutation(addUser, {
        onSuccess: () => {
            console.log('data input');
        }
    });

    /*  
        input value's ==> into Object{ }

        we can get the data from this form,
        when we click on this "add button", 
        so we need to get the data of this input text boxes in the form of {Object},
        so we can pass that {Object} to the backend &
        store that data as a new record in the Database.
    */


    /*  
        get input value's dynamically ==> setFormData() 
        
        by type something inside first name input text box, 
        that is going to call ==> setFormData() function & 
        this setFormData() function is going to create a property called firstName,
        and then it's going to get the value of this input text box 
        and pass that value into firstName property...
        spread operator are going to override the previous value...
    */


    const handleSubmit = (e) => {
        // stop browser to reloading...
        e.preventDefault();

        // prevent user submit empty form data...
        if (Object.keys(formData).length === 0) return console.log("Don't Have Form Data")


        let { firstName, lastName, email, salary, date, status } = formData;

        const model = {
            name: firstName + ' ' + lastName,
            avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
            email,
            salary,
            date,
            status: status ?? 'active',
        }

        addMutation.mutate(model);
    }

    // if (Object.keys(formData).length > 0) return <SuccessSMS message='Data Added' />
    if (Object.keys(formData).length > 0) return <ErrorSMS message='Error' />
    if (addMutation.isLoading) return <Spinner />



    return (
        // grab the data of these input boxes & return as an object

        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>

            <div className='input-type'>
                <input
                    type="text"
                    name='firstName'
                    placeholder='First Name'
                    className='border w-full px-5 py-3 focus:outline-none rounded-md'
                    onChange={setFormData}
                />
            </div>

            <div className='input-type'>
                <input
                    type="text"
                    name='lastName'
                    placeholder='Last Name'
                    className='border w-full px-5 py-3 focus:outline-none rounded-md'
                    onChange={setFormData}
                />
            </div>

            <div className='input-type'>
                <input
                    type="email"
                    name='email'
                    placeholder='Email'
                    className='border w-full px-5 py-3 focus:outline-none rounded-md'
                    onChange={setFormData}
                />
            </div>

            <div className='input-type'>
                <input
                    type="text"
                    name='salary'
                    placeholder='Salary'
                    className='border w-full px-5 py-3 focus:outline-none rounded-md'
                    onChange={setFormData}
                />
            </div>

            <div className='input-type'>
                <input
                    type="date"
                    name='date'
                    placeholder='Salary'
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
                        className='radioStyle checked:bg-green-500 checked:border-green-500'
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
                        className='radioStyle checked:bg-red-500 checked:border-red-500'
                        onChange={setFormData}
                    />
                    <label
                        htmlFor="radioDefault2"
                        className='inline-block text-gray-800 cursor-pointer'>
                        Inactive
                    </label>
                </div>
            </div>

            <button className='flex items-center justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 duratison-150'>
                Add <span className='px-1'> <BiPlus size={20} /> </span>
            </button>
        </form>
    )
}
