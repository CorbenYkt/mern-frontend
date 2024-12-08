import { useState } from 'react'
import { Header } from './components/header'
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { FullPost } from './pages/FullPost';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { AddPost } from './pages/AddPost';
function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen w-full max-w-full">
        <div className="flex-none">
          <Header />
        </div>
        <main className="flex-grow p-6">
          <div className="max-w-3xl mx-auto text-left">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<FullPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/posts/:id/edit" element={<AddPost />} />
            </Routes>
          </div>
        </main>
        <footer className="text-white p-4 text-center">
          Footer content here
        </footer>
      </div>
    </>
  )
}

export default App