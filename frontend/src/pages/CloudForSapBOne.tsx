import { motion } from "framer-motion";
import FreeDemoForm from "@/components/FreeDemoForm";
import { TrustedByClients } from "@/components/TrustedByClient";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import cloudForSapBoNE from "../assets/cloudforsapherosection.avif"
import cloudsap from "../assets/sap-cloud.webp"

export function CloudForSapBone() {
  const navigate = useNavigate();

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <section className="relative w-full min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src={cloudForSapBoNE}
            alt="SAP Cloud Infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/70 to-indigo-900/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-6 gap-10 py-16">
          {/* Left Text Content */}
          <div className="lg:w-1/2 text-white space-y-6">
            <motion.h1
              className="text-4xl lg:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Cloud for <span className="text-blue-300">SAP Business One</span>
            </motion.h1>

            <motion.p
              className="text-lg text-blue-100 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Enterprise-grade SAP B1 hosting on secure cloud infrastructure
            </motion.p>

            <motion.p
              className="text-base text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Optimized performance, enhanced security, and seamless scalability for your SAP Business One implementation.
            </motion.p>

            {/* Feature Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-4"
            >
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm rounded-full text-sm border border-blue-400/30">
                  High Availability
                </span>
                <span className="px-3 py-1 bg-purple-600/50 backdrop-blur-sm rounded-full text-sm border border-purple-400/30">
                  Enterprise Security
                </span>
                <span className="px-3 py-1 bg-indigo-600/50 backdrop-blur-sm rounded-full text-sm border border-indigo-400/30">
                  24/7 Support
                </span>
              </div>
            </motion.div>

            {/* Contact Us Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition shadow-md"
                onClick={() => navigate('/get-in-touch')}
              >
                Contact Us
              </Button>
            </motion.div>
          </div>

          {/* Right Form */}
          <div className="lg:w-1/2 w-full">
            <div className="rounded-xl shadow-lg p-6">
              <FreeDemoForm />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1 space-y-4 sm:space-y-6">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                SAP Cloud Hosting Service
              </motion.h2>

              <div className="space-y-4 text-gray-600">
                <motion.p
                  className="text-sm sm:text-base font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Purchase intelligent high-performance servers that support SAP operations at an affordable range.
                </motion.p>

                <motion.p
                  className="text-sm sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  SAP is widely recognized and used by global giants. Hosting it requires a strong cloud platform with dedicated servers, maintenance, and monitoring for high performance and security.
                </motion.p>

                <motion.p
                  className="text-sm sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Hosting Safari provides fully managed SAP Cloud servers in India with top-notch infrastructure, security, and monitoring at an affordable range.
                </motion.p>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <motion.img
                className="w-full max-w-sm sm:max-w-md rounded-lg shadow-lg"
                src={cloudsap}
                alt="SAP Cloud"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-gray-900">
              Our Features
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              We host SAP ERP solutions on the state-of-the-art, geographically dispersed Asia's largest Tier IV & Tier III DC facilities, providing high-performance infrastructure and 99.995% uptime. Tier-IV DC ensures extreme fault tolerance and allows flexibility to upgrade dedicated infrastructure to meet business requirements.
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-700 leading-relaxed">
              Whatever infrastructure support you need, we provide experience, power, and flexibility. This is why we are a perfectly managed SAP Hosting Partner in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Clients Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by <span className="text-blue-600">Leading Businesses</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust us with their SAP cloud hosting needs
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { number: "500+", label: "SAP Instances" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" },
              { number: "10+", label: "Years Experience" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-blue-50 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Client Logos */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
              Our Valued Clients
            </h3>
            <div className="w-full max-w-4xl">
              <TrustedByClients />
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            className="mt-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 sm:p-8 rounded-2xl border border-blue-200">
              <div className="text-4xl text-blue-400 mb-4">"</div>
              <p className="text-sm sm:text-base text-gray-700 italic mb-4">
                HTwo's SAP cloud hosting has transformed our business operations. The reliability and performance of their infrastructure, combined with exceptional 24/7 support, has made them our trusted technology partner.
              </p>
              <div className="font-semibold text-gray-900">- Enterprise Client</div>
              <div className="text-xs text-gray-500 mt-1">Manufacturing Industry</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}