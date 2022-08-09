import { deleteAction, toggleChangeAction } from '../redux/reducer';
import { BiUserPlus, BiX, BiCheck } from 'react-icons/bi';
import { deleteUser, getUsers } from '../lib/crudHelper';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Table } from '../components';
import Head from 'next/head'


const Home = () => {

  // for updating data/records... use this lib...
  const queryClient = useQueryClient();

  // read ==> operation at redux store... state...
  const visible = useSelector(state => state.app.client.toggleFrom);
  const deleteId = useSelector(state => state.app.client.deletedId);

  // write ==> operation at redux store... state...
  const dispatch = useDispatch();

  // by user click, change Redux store state data...
  const handler = () => dispatch(toggleChangeAction())


  // confirm delete permission...
  const deleteHandler = async () => {

    if (deleteId) {
      await deleteUser(deleteId);
      await queryClient.prefetchQuery(['users'], getUsers);
      await dispatch(deleteAction(null));
    }
  }


  const cancelHandler = async () => await dispatch(deleteAction(null))



  return (
    <section>

      <Head>
        <title>CRUD Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/user.ico" />
      </Head>


      <main className='py-10'>

        <h1 className='text-xl md:text-5xl text-center font-bold py-10'>Employee Management</h1>

        <div className="container mx-auto flex justify-between py-5 border-b">

          <div className="left flex gap-3">

            <button onClick={handler} className='px-4 py-2 flex bg-indigo-500 text-white border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800 duration-200'>
              Add Employee <span className='pl-2'> <BiUserPlus size={22} /></span>
            </button>

          </div>

          {
            deleteId
              ? DeleteComponent({ deleteHandler, cancelHandler })
              : null
          }
        </div>


        {
          visible && <Form />
        }


        <div className="container mx-auto">
          <Table />
        </div>

      </main>

    </section>
  )
}

export default Home;






const DeleteComponent = ({ deleteHandler, cancelHandler }) => {

  return (
    <div className='flex gap-5 items-center'>
      <p>Are you sure?</p>

      <button
        className='flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'
        onClick={deleteHandler}
      >
        Yes
        <span className='pl-1'>
          <BiCheck color='rgb(255,255,255)' size={24} />
        </span>

      </button>


      <button
        className='flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50'
        onClick={cancelHandler}
      >
        No
        <span className='pl-1'>
          <BiX color='rgb(255,255,255)' size={24} />
        </span>

      </button>

    </div>
  )
}