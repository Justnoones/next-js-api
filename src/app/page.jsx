"use client"

import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {

  const router = useRouter()
  let [ name, setName ] = React.useState('');
  let [ email, setEmail ] = React.useState('');
  let [ message, setMessage ] = React.useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const data = {
      name,
      email,
      message
    };
    const res = await fetch('http://localhost:3000/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = res.json();
    console.log(result);

    router.push("/thank-you/");
  };

  return (
    <main className='flex justify-center items-center h-screen bg-slate-500'>
      <form onSubmit={e => submitHandler(e)} className='flex flex-col space-y-10 w-full items-center'>
        <h1 className='text-3xl text-black font-bold'>Feed Back Form</h1>
        <section className='w-3/6 flex flex-col space-y-3'>
          <label htmlFor="user-name" className='text-2xl font-bold'>User Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            name='name'
            id='user-name' 
            className='p-3 rounded-lg outline-none text-xl bg-inherit border-2 border-black placeholder:text-black'
            autoComplete='off'
            placeholder='Enter Your User Name'
          />
        </section>
        <section className='w-3/6 flex flex-col space-y-3'>
          <label htmlFor="email-address" className='text-2xl font-bold'>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            name='email'
            id='email-address'
            className='p-3 rounded-lg outline-none text-xl bg-inherit border-2 border-black placeholder:text-black'
            autoComplete='off'
            placeholder='Enter Your Email Address'
          />
        </section>
        <section className='w-3/6 flex flex-col space-y-3'>
          <label htmlFor="message" className='text-2xl font-bold'>Message</label>
          <textarea
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            id="message"
            rows={7}
            className='p-3 rounded-lg outline-none text-xl resize-none bg-inherit border-2 border-black placeholder:text-black'
            placeholder='Enter Your Feed Back'
          >
          </textarea>
        </section>
        <button type="submit" className='px-3 py-2 bg-inherit border-2 border-black rounded-lg text-lg'>Send Feed Back</button>
      </form>
    </main>
  )
}

export default Home