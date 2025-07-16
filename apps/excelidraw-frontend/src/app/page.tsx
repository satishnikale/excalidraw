"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import { useDarkMode } from "@/hooks/useDarkMode";
import Header from "@/components/homepage/Header";
import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import Footer from "@/components/homepage/Footer";
import AuthModal from "@/components/homepage/AuthModel";
import { RecoilRoot } from "recoil";


function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const openSignInModal = () => {
    setAuthMode('signin');
    setIsAuthModalOpen(true);
  };

  const openSignUpModal = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const changeAuthMode = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
  };

  return (
    <RecoilRoot>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <Header
          onSignInClick={openSignInModal}
          onSignUpClick={openSignUpModal}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        <Hero onGetStartedClick={openSignUpModal} />
        <Features />
        <Footer />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          mode={authMode}
          onModeChange={changeAuthMode}
        />
      </motion.div>
    </RecoilRoot>
  );
}
export default App;