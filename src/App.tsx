import GridBackground from './components/GridBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import SectionDivider from './components/SectionDivider'
import TechStack from './components/TechStack'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Connect from './components/Connect'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <TechStack />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Connect />
      </main>
      <Footer />
    </>
  )
}
