import { About } from './components/About';
import { Cta } from './components/Cta';
import { FAQ } from './components/FAQ';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { HowItWorks } from './components/HowItWorks';
import { Navbar } from './components/Navbar';
import { Pricing } from './components/Pricing';
import { ScrollToTop } from './components/ScrollToTop';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import HeroSection from '@/components/hero-section.tsx';
import './App.css';
import ScrollControlledChat from '@/components/scroll-controlled-chat.tsx';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ScrollControlledChat contactName="Покупатель" />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Pricing />
      <Testimonials />
      {/*<Team />*/}
      {/*<Newsletter />*/}
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
