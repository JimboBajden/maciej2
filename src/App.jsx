import { useState } from 'react'
import Layout from './pages/Layout'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import './App.css'
import Blogs from './pages/Blogs';
import Skibidi from './components/skibidi';
import Ulubione from './pages/Ulubione';
import Edit from './pages/Edit';
import Search from './pages/Search';
import Selected from './pages/Selected';

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='ulubione' element={<Ulubione/>}></Route>
          <Route path="/Edit/:id" element={<Edit />} />
          <Route path='/Search' element={<Search/>}/>
          <Route path='/Selected/:id' element={<Selected/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
