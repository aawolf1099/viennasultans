"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: "/gallery/team1.jpg", alt: "Team Photo 1" },
  { id: 2, src: "/gallery/team2.jpg", alt: "Team Photo 2" },
  { id: 3, src: "/gallery/match1.jpeg", alt: "Match Action 1" },
  { id: 4, src: "/gallery/match2.jpg", alt: "Match Action 2" },
  { id: 5, src: "/gallery/training1.jpg", alt: "Training Session 1" },
  { id: 6, src: "/gallery/training2.jpeg", alt: "Training Session 2" },
  { id: 7, src: "/gallery/tk.jpg", alt: "Player Profile" },
  { id: 8, src: "/gallery/zubi.jpg", alt: "Player Profile" },
];

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);

  // Shuffle on mount
  useEffect(() => {
    setImages([...galleryImages].sort(() => Math.random() - 0.5));
  }, []);

  // Prepare a 4x4 grid (16 items) randomly chosen with repetition
  const gridImages = useMemo(() => {
    if (images.length === 0) return [];
    const picks: GalleryImage[] = [];
    for (let i = 0; i < 16; i++) {
      const idx = Math.floor(Math.random() * images.length);
      picks.push(images[idx]);
    }
    return picks;
  }, [images]);

  return (
    <section id="gallery" className="py-16 bg-[#020123]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-[#00BFFF] mb-12"
        >
          Gallery
        </motion.h2>

        <div className="overflow-hidden h-[800px] relative">
          <motion.div
            className="absolute top-0 w-full"
            animate={{ y: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {/* First grid copy */}
            <div className="grid grid-cols-4 grid-rows-4 gap-6 mb-6">
              {gridImages.map((img, idx) => (
                <div
                  key={`${img.id}-${idx}`}
                  className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            {/* Second grid copy for seamless loop */}
            <div className="grid grid-cols-4 grid-rows-4 gap-6">
              {gridImages.map((img, idx) => (
                <div
                  key={`loop-${img.id}-${idx}`}
                  className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
