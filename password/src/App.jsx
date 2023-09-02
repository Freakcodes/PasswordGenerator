import { useState, useCallback, useEffect,useRef } from 'react'

import './App.css'
import Abhay from './Abhay'

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [char, setChar] = useState(false);
  const [number, setNumber] = useState(false);
  const passwordRef= useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    let num = "0123456789";
    let specialchar = "!@#$%^&*()_"
    if (number) str += num;
    if (char) str += specialchar;
    for (let i = 0; i < length; i++) {
      const ch = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ch);

    }
      setPassword(pass);
  }, [char, number, length, setPassword])


  

  useEffect(() => {
    passwordGenerator();
  }, [length,number,char])
  const copyToClipBoard=useCallback(()=>{
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
    
  },[password])
  return (
    <>

      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className='w-full max-w-md bg-slate-500 text-center mx-auto rounded-lg px-2 py-4 mt-4'>
        <div className='flex gap-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3 rounded-md'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipBoard} className=' outline-none bg-red-400 rounded-lg px-4 text-white hover:bg-red-700'>COPY</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 py-2  '>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
              
            />
            <label className=' text-white text-lg'>Length: {length}</label>
            <div>

            </div>
            <input type="checkbox" defaultChecked={number
            } onChange={() => {
              setNumber((prev) => !prev)
            }} />
            <label className=' text-white text-lg'>Number</label>
            <input type="checkbox" defaultChecked={char
            } onChange={() => {
              setChar((prev) => !prev)
            }} />
            <label className=' text-white text-lg'>Characters</label>

          </div>

        </div>

      </div>

    </>
  )
}

export default App
