import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Home from "@/pages/Home"
import Services from "@/pages/Services"
import Solutions from "@/pages/Solutions"
import Portfolio from "@/pages/Portfolio"
import About from "@/pages/About"
import Contact from "@/pages/Contact"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground font-body">
        <Navbar />
        <main>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/services"  element={<Services />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about"     element={<About />} />
            <Route path="/contact"   element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
