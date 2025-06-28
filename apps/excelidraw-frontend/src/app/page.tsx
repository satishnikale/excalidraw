"use client"
import { Navbar } from '@/components/homepage/Navbar';
import { Hero } from '@/components/homepage/Hero';
import { Feature } from '@/components/homepage/Feature';
import { Pricing } from '@/components/homepage/Pricing';
import { CallToAction } from '@/components/homepage/CallToAction';
import { Footer } from '@/components/homepage/Footer';


function App() {
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-poppins">
      {/* Navigation */}
     <Navbar />
      {/* Hero Section  */}
     <Hero />
      {/* Features Section */}
      <Feature />
      {/* Pricing Section */}
      <Pricing />
      {/* CTA Section */}
      <CallToAction />
      {/* Footer */}
      <Footer />
    </div>
  );
}
export default App;