import React, { useCallback, useMemo, useState } from 'react'
import Auth from './pages/auth/Auth';
import { Button } from './components/ui/button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import Chat from './pages/chat/Chat';
import demo from './Demo';
import Demo from './Demo';


export const App = () => {
  const [add,setadd]=useState(0);
  const [minus,setminus]=useState(100)
  const check=useMemo(()=>{
    console.log("kenil");
    return add%2===0;
  },[add]);
  const a=useCallback(()=>{
    console.log("a");
  },[])
  return (
    // <BrowserRouter>
    // <Routes>
    // <Route path="/auth" element={<Auth/>} />
    // <Route path="/profile" element={<Profile/>} />
    // <Route path="/chat" element={<Chat/>} />
    // <Route path="*" element={<Navigate to="/auth"/>}/>
    // </Routes>
    // </BrowserRouter>
    <>
      <button onClick={()=>setadd(add+1)} className='m-10'>ADD</button>
      <p className='m-10'>:{add}</p>
      <p className='m-10'>{check?"Even":"ODD"}</p>
      <button onClick={()=>setminus(minus-1)} className='m-10'>Minus</button>
      <p className='m-10'>:{minus}</p><br /><br />
      <Demo a={a}/>
    </>
  )
}
export default App;
