import FreeDemoForm from "@/components/FreeDemoForm";
import {
  CheckCircle,
  Star,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Users,
  Database,
} from "lucide-react";
import { FaHeadset, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import LiveChat from "@/components/ChatBox";
import TallyOnAwsPricing from "@/components/TallyAwsPricing";
import featured from "../assets/feature-17.svg"
import { TallyOnCloudPricing } from "@/components/TallyOnCloudPricing";

const features = [
  "Access to your data from anywhere, at any time",
  "Automatic updates and tight security",
  "Reduces time and additional expenses",
  "Adaptable to your business needs",
  "Collaboration and secure data exchange",
  "Any time a tally is needed, it can be accessed remotely",
  "Organize your data without consolidating it",
  "No data corruption, slow performance, or memory outage.",
];



// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function TallyOnCloud() {
  return (
    <div className="font-poppins overflow-hidden">                                         
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%239C92AC' fill-opacity='0.03' /%3E%3C/svg%3E\")",
              opacity: 0.35,
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-12 relative z-10">
          {/* Left Content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm border border-orange-400/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4 mr-2" />
              Trusted by 25,000+ Customers Worldwide
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={fadeInUp}
            >
              <span className="block">Tally on Cloud</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
                Just at ₹290/-*
              </span>
            </motion.h1>

            <motion.p className="text-xl mb-4 text-blue-100 font-medium" variants={fadeInUp}>
              24×7 Access • Best Pricing • Firewall Protected
            </motion.p>

            <motion.p className="mb-8 text-slate-300 leading-relaxed text-lg" variants={fadeInUp}>
              Join 25,000+ customers & 1,000 Tally partners globally with our highly encrypted,
              secure cloud infrastructure for seamless Tally access.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <motion.button
                className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </motion.button>

              <motion.button
                className="group border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center">
                  Watch Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div className="grid grid-cols-3 gap-6 text-center lg:text-left" variants={fadeInUp}>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center text-green-400 mb-1">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="font-semibold">99.99%</span>
                </div>
                <span className="text-sm text-slate-400">Uptime SLA</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center text-blue-400 mb-1">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-semibold">24/7</span>
                </div>
                <span className="text-sm text-slate-400">Support</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center text-purple-400 mb-1">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-semibold">25K+</span>
                </div>
                <span className="text-sm text-slate-400">Happy Users</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <FreeDemoForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="lg:w-1/2" variants={fadeInUp}>
              <motion.div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Database className="w-4 h-4 mr-2" />
                Advanced Cloud Technology
              </motion.div>

              <motion.h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" variants={fadeInUp}>
                Tally on Cloud
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Public Cloud
                </span>
              </motion.h2>

              <motion.p className="mb-8 text-gray-600 text-lg leading-relaxed" variants={fadeInUp}>
                Access your Tally account from any device and OS with our advanced cloud technology.
                Your data remains secure, stable, and reliable with enterprise-grade infrastructure
                available 24/7, anywhere in the world.
              </motion.p>

              <motion.div className="space-y-4" variants={staggerContainer}>
                {features.map((feature) => (
                  <motion.div key={feature} className="flex items-start group" variants={fadeInUp}>
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="lg:w-1/2 flex justify-center" variants={fadeInUp}>
              <motion.div className="relative" whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-2xl opacity-20" />
                <img
                  className="relative max-w-full h-auto rounded-2xl shadow-2xl"
                  src={featured}
                  alt="Tally on Cloud"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <TallyOnCloudPricing/>

      {/* Support Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6">
          <motion.div className="text-center" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold mb-4">
              <FaHeadset className="text-2xl mr-3" />
              We're Here to Help You 24/7
            </div>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Our expert support team is always ready to assist you with any questions or technical issues.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <motion.a
        href="https://wa.me/your-number"
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 group inline-flex items-center justify-center"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-5 h-5" />
        <span className="sr-only">Chat on WhatsApp</span>

        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </motion.a>

      <LiveChat />
    </div>
  );
}
