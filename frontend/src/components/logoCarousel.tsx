import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { fetchPartners } from '../api/partners';
import type { Partner } from '../api/partners';

const LogoCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        setLoading(true);
        const data = await fetchPartners();
        setPartners(data);
      } catch (err) {
        setError('Failed to load partners');
        console.error('Error loading partners:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  const companies = partners.map(partner => ({
    name: partner.name,
    logo: partner.logoUrl || '/placeholder-logo.png' // Fallback if no logo
  }));

  // Only show partners if available, otherwise show empty carousel
  const displayCompanies = companies;

  // Duplicate for seamless loop
  const carouselItems = [...companies, ...companies, ...companies];

  if (loading) {
    return (
      <section className="py-16 bg-slate-50 border-b">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Trusted by industry leaders worldwide
            </h2>
            <p className="text-slate-600 font-medium">
              Our solutions power the world's most innovative companies
            </p>
          </div>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-slate-50 border-b">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Trusted by industry leaders worldwide
            </h2>
            <p className="text-slate-600 font-medium">
              Our solutions power the world's most innovative companies
            </p>
          </div>
          <div className="text-center text-red-600">
            <p>Unable to load partner logos at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  // If no partners available, don't show the carousel section
  if (displayCompanies.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50 border-b">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Trusted by industry leaders worldwide
          </h2>
          <p className="text-slate-600 font-medium">
            Our solutions power the world's most innovative companies
          </p>
        </div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            ref={carouselRef}
            className="flex"
            animate={{
              x: [0, -1680], // Adjust based on your content width
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {carouselItems.map((company, index) => (
              <motion.div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 px-4"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex justify-center items-center cursor-pointer bg-white rounded-xl shadow-sm p-2  transition-all duration-300 hover:shadow-md min-w-[160px]">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-10 w-18 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 mix-blend-multiply"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;