'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section id="home" className="relative h-screen flex justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Cricket Field"
          className={`w-full h-full object-cover ${theme === 'dark' ? 'brightness-50' : 'brightness-75'}`}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center py-26"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white dark:text-white mb-4">
          Vienna Sultans
        </h1>
        <p className="text-xl md:text-2xl text-white dark:text-white">
          Cricket Club
        </p>
      </motion.div>
    </section>
  );
};

export default Hero; 