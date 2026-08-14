import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogDetailPage from './pages/BlogDetailPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import { BookingModalProvider, useBookingHashListener } from './context/BookingModalContext.jsx'
import BookingModal from './components/BookingModal.jsx'

function Root() {
  useBookingHashListener()
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <BookingModal />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookingModalProvider>
        <Root />
      </BookingModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
