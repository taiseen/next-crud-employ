import { BiUserPlus } from 'react-icons/bi';
import { Form, Table } from '../components';
import Head from 'next/head'
import { useState } from 'react';


const Home = () => {

  const [visible, setVisible] = useState(false);

  return (
    <section>
      <Head>
        <title>CRUD Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='py-10'>
        <h1 className='text-xl md:text-5xl text-center font-bold py-10'>Employee Management</h1>

        <div className="container mx-auto flex justify-between py-5 border-b">

          <div className="left flex gap-3">

            <button onClick={() => setVisible(pre => !pre)} className='px-4 py-2 flex bg-indigo-500 text-white border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800 duration-200'>
              Add Employee <span className='pl-2'> <BiUserPlus size={22} /></span>
            </button>

          </div>

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

export default Home