import { FaServer, FaShieldAlt, FaDatabase, FaGlobe, FaDesktop, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

const features = [
  {
    icon: FaServer,
    title: "Speed, Reliability & Multi-user",
    description: "Run your application on high-end CPU and branded servers with guaranteed 99.9% uptime and seamless multi-user collaboration.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FaShieldAlt,
    title: "Secured Tally Data",
    description: "Enterprise-grade security with multi-location auto backup, encryption, and advanced threat protection.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: FaDatabase,
    title: "Local Backup",
    description: "Flexible backup solutions with manual download options and automated scheduled backups for complete data control.",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: FaGlobe,
    title: "Use From Anywhere",
    description: "Access your Tally application securely from any location with our global cloud infrastructure.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: FaDesktop,
    title: "Any Device - Reliable All-Time",
    description: "Cross-platform compatibility with consistent performance across all devices and operating systems.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: FaDollarSign,
    title: "Economical - Save Money",
    description: "Cost-effective solutions without compromising on server quality, support, or performance.",
    gradient: "from-teal-500 to-green-500",
  },
];

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Background Gradient on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

      {/* Icon Container */}
      <div className="relative mb-6">
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg group-hover:blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
        <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl text-white shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
          <Icon className="w-7 h-7" />
        </div>

        {/* Feature Number */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {index + 1}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
        {feature.description}
      </p>

      {/* Hover Border Effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
        <div className="absolute inset-[2px] rounded-2xl bg-white"></div>
      </div>
    </motion.div>
  );
};

export const FeatureGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Exclusive <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Features</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover why thousands of businesses trust our premium Tally hosting solutions
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-600 mb-6 text-lg">
            Ready to experience premium Tally hosting?
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/get-in-touch')}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};