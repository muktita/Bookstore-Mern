import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBooks'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import ShowBook from './pages/ShowBook'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/create" element={<CreateBook />} />
      <Route path="/book/details/:d" element={<ShowBook />} />
      <Route path="/book/edit/:id" element={<EditBook />} />
      <Route path="/book/delete/:d" element={<DeleteBook />} />
    </Routes>
  )
};

export default App