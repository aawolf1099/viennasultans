'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/gallery/team1.jpg',
    alt: 'Team Photo 1',
    category: 'Team'
  },
  {
    id: 2,
    src: '/gallery/team2.jpg',
    alt: 'Team Photo 2',
    category: 'Team'
  },
  {
    id: 3,
    src: '/gallery/match1.jpeg',
    alt: 'Match Action 1',
    category: 'Match'
  },
  {
    id: 4,
    src: '/gallery/match2.jpg',
    alt: 'Match Action 2',
    category: 'Match'
  },
  {
    id: 5,
    src: '/gallery/training1.jpg',
    alt: 'Training Session 1',
    category: 'Training'
  },
  {
    id: 6,
    src: '/gallery/training2.jpeg',
    alt: 'Training Session 2',
    category: 'Training'
  },
  {
    id: 7,
    src: '/gallery/tk.jpg',
    alt: 'Player Profile',
    category: 'Players'
  },
  {
    id: 8,
    src: '/gallery/zubi.jpg',
    alt: 'Player Profile',
    category: 'Players'
  }
];

const ImageGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(image => image.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="gallery" className="py-20 bg-[#020123]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h2 className="text-3xl font-bold text-[#009cd4] mb-8">Gallery</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-8">
            {['all', 'team', 'match', 'training', 'players'].map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#DB3986] text-white'
                    : 'bg-white dark:bg-[#020123]/80 text-[#DB3986] dark:text-[#009cd4] hover:bg-[#DB3986]/10 dark:hover:bg-[#009cd4]/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-lg border border-[#DB3986]/20 dark:border-[#009cd4]/20"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-[#020123]/80">
                  <p className="text-sm text-[#DB3986] dark:text-[#009cd4]">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageGallery; 