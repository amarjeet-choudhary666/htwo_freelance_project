import { FeatureGrid } from "@/components/Features";
import { GetinTouch } from "@/components/GetInTouchForm";
import { TrustedByClients } from "@/components/TrustedByClient";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import navisionHeroSection from "../assets/bgnavision.jpg";
import navisionfeatures from "../assets/Simplifie.png";

export function NavisionOnCloud() {
  const navigate = useNavigate();

  return (
    <div className="font-poppins">

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={navisionHeroSection}
            alt="Cloud Technology Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-8 lg:gap-16 py-16">
          {/* Left Text */}
          <motion.div
            className="text-white max-w-2xl text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              NAV <span className="text-blue-300">(Navision)</span> On Cloud
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-blue-100 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Enterprise-grade & secure infrastructure for Navision
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              ERP hosting for impeccable performance
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-4"
            >
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="px-4 py-2 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm border border-blue-400/30">Secure Hosting</span>
                <span className="px-4 py-2 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm border border-blue-400/30">High Performance</span>
                <span className="px-4 py-2 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm border border-blue-400/30">24/7 Support</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition shadow-md"
                onClick={() => navigate('/get-in-touch')}
              >
                Get Started Today
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            className="w-full max-w-md lg:max-w-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="rounded-2xl lg:p-8">
              <GetinTouch />
            </div>
          </motion.div>
        </div>

        {/* Decorative */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>

      {/* Info Section */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Text */}
          <motion.div
            className="flex-1 text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                NAV <span className="text-blue-600">(Navision)</span> On Cloud
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto lg:mx-0"></div>
            </div>

            <div className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed">
              <p>
                NAVISION offers a comprehensive Enterprise Resource Planning (ERP) service as a cloud solution,
                meticulously tailored to meet your specific business needs while seamlessly integrating with
                other business solutions.
              </p>
              <p>
                To dramatically increase efficiency, Navision ERP integrates sales, purchasing, operations,
                accounting, and inventory management—providing a unified solution for small to midsize businesses.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "Cloud Infrastructure",
                "Data Security",
                "Scalable Solutions",
                "24/7 Monitoring",
                "Automated Backups",
                "Expert Support"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative max-w-lg">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-20"></div>
              <img
                src={navisionfeatures}
                alt="Navision Cloud Solution"
                className="relative rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Trusted Clients */}
      <section className="py-20 px-4 sm:px-6 md:px-24 lg:px-32 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-2xl font-semibold mb-4">Trusted By Clients And Industry Experts</h1>
            <p className="text-sm md:text-base text-gray-700">
              Uniquely repurpose strategic core competencies with progressive content. Assertively transition ethical imperatives and collaborative manufactured products.
            </p>
          </div>
          <div>
            <TrustedByClients />
          </div>
        </div>
      </section>
    </div>
  );
}
