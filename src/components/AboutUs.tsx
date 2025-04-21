'use client';

import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-[#020123] dark:bg-[#020123]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-left text-[#009cd4] mb-8">About Us</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="w-full h-64 rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/images/hero-bg.jpg"
                  alt="Cricket Field"
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
            </div>
            <div className="text-left">
              <p className="text-white dark:text-gray-300 mb-4">
                Vienna Sultans Cricket Club is a premier cricket team based in Vienna, Austria. 
                We are dedicated to promoting the sport of cricket and fostering a strong community 
                of cricket enthusiasts.
              </p>
              <p className="text-white dark:text-gray-300">
                Our team consists of passionate players from diverse backgrounds, united by their 
                love for the game. We participate in various tournaments and leagues, striving for 
                excellence both on and off the field.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs; 