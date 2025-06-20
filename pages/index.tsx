import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Howitworks from '../components/Howitworks';
import Testimonials from '../components/Testimonials';
import Technology from '../components/Technology';
import Faq from '../components/Faq';
import Download from '../components/Download';

export default function Home() {
  return (
    <>
      <Hero />
      <Howitworks />
      <Features />
      <Technology />
      <Faq />
      <Testimonials />
      <Download />
    </>
  );
}