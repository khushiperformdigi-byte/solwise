import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogDetailPage from './pages/BlogDetailPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import EventsPage from './pages/EventsPage.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminPosts from './pages/admin/AdminPosts.jsx'
import AdminPostEditor from './pages/admin/AdminPostEditor.jsx'
import AdminComments from './pages/admin/AdminComments.jsx'
import AdminGallery from './pages/admin/AdminGallery.jsx'
import AdminEvents from './pages/admin/AdminEvents.jsx'
import AdminEventEditor from './pages/admin/AdminEventEditor.jsx'
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
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPosts />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/new" element={<AdminPostEditor />} />
          <Route path="posts/:id" element={<AdminPostEditor />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/new" element={<AdminEventEditor />} />
          <Route path="events/:id" element={<AdminEventEditor />} />
        </Route>
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
