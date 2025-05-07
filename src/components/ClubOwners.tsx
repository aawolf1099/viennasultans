"use client";

import Image from "next/image";

interface ClubOwner {
  name: string;
  role: string;
  image: string;
}

const clubOwners: ClubOwner[] = [
  {
    name: "Michael Subhan",
    role: "Founder & President",
    image: "/images/mas.jpg",
  },
  {
    name: "Hammad Rana",
    role: "Co Founder & Vice President",
    image: "/images/hammad.jpg",
  },
  {
    name: "Tauqir Asif",
    role: "Co Founder & Treasurer",
    image: "/images/tk.jpg",
  },
];

const ClubOwners = () => (
  <section id="team" className="py-16 bg-[#020123]">
    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-[#00BFFF]">Club Owners</h2>
      <p className="mt-2 text-gray-300 max-w-lg mx-auto">
        Meet the dedicated leaders driving our community forward.
      </p>
    </div>

    {/* Carousel / Cards */}
    <div className="relative flex justify-center px-4">
      <div className="flex flex-row overflow-x-auto sm:overflow-visible space-x-6 px-4 snap-x snap-mandatory scrollbar-hide">
        {clubOwners.map((owner) => (
          <div
            key={owner.name}
            className="snap-start flex-shrink-0 sm:flex-shrink w-64 sm:w-64 md:w-72 bg-[#0D0D2B] border-l-4 border-[#00BFFF] rounded-2xl p-6 text-center"
          >
            <div className="mx-auto w-28 h-28 rounded-full overflow-hidden border-2 border-[#00BFFF] mb-4">
              <Image
                src={owner.image}
                alt={owner.name}
                width={112}
                height={112}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-white">{owner.name}</h3>
            <p className="mt-2 text-gray-400">{owner.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ClubOwners;
