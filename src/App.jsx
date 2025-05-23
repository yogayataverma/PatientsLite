import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NavBar from './components/NavBar.jsx'
import Dashboard from './components/Dashboard.jsx'
import PatientForm from './components/PatientsForm.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Toaster 
          position="top-right"
          toastOptions={{
            success: {
              iconTheme: {
                primary: '#0ea5e9',
                secondary: 'white',
              },
            },
          }}
        />
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patient-form" element={<PatientForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
