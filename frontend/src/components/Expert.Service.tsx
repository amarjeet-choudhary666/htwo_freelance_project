import { FaHeadset } from 'react-icons/fa';
import conactUs from "../assets/photo-1551836022-d5d88e9218df.avif"

export default function ExpertService() {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <img
        src={conactUs}
        alt="Expert Service Background"
        className="absolute inset-0 w-full h-[500px] object-cover brightness-50"
      />

      {/* Overlay Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-16">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-600 p-4 rounded-full shadow-lg">
            <FaHeadset className="w-8 h-8" />
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          24/7 Expert Service
        </h2>

        <p className="text-sm md:text-lg max-w-xl mx-auto mb-6">
          Our team of experts is available around the clock to assist you. 
          From technical support to troubleshooting, we’ve got you covered anytime, anywhere.
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300">
          Contact Now
        </button>
      </div>
    </section>
  );
}
