'use client';

import { motion } from 'framer-motion';

interface ClubOwner {
  name: string;
  role: string;
  image: string;
}

const clubOwners: ClubOwner[] = [
  {
    name: "Micheal Subhan",
    role: "Founder & President",
    image: "/images/mas.jpg"
  },
  {
    name: "Hammad Rana",
    role: "Vice President",
    image: "/images/hammad.jpg"
  },
  {
    name: "Tauqir Asif",
    role: "Treasurer",
    image: "/images/tk.jpg"
  }
];

const ClubOwners = () => {
  return (
    <section id="team" className="py-20 bg-[#020123]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-left text-[#009cd4] mb-8">Club Owners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clubOwners.map((owner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-[#020123]/80 rounded-lg shadow-lg overflow-hidden border border-[#DB3986]/20 dark:border-[#009cd4]/20"
              >
                <div className="w-full h-64 relative">
                  <img
                    src={owner.image}
                    alt={owner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-[#DB3986]">
                  <h3 className="text-xl font-semibold text-white dark:text-white mb-2">{owner.name}</h3>
                  <p className="text-white">{owner.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClubOwners; 