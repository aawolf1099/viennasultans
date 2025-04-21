'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Cricket Field"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-8"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-[#DB3986] dark:text-white mb-4">
          Vienna Sultans
        </h1>
        <p className="text-xl md:text-2xl text-[#020123] dark:text-white">
          Cricket Club
        </p>
      </motion.div>
    </section>
  );
};

export default Hero; 