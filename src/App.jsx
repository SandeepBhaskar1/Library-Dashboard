import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header'
import Stats from './components/Stats'
import BookTable from './components/Books'
import BookFormModal from './components/BookFormModal'
import About from '../pages/About'

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Header onAdd={() => setOpenModal(true)} />
      <Routes>
        <Route path='/' element={
          <>
            <Stats />
            <BookTable />
          </>
        } />

        <Route path='/about' element={<About />} />
      </Routes>

      <BookFormModal open={openModal} onClose={() => setOpenModal(false)} />

    </>
  )
}

export default App
