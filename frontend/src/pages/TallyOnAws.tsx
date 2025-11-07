import FreeDemoForm from "@/components/FreeDemoForm";
import TallyOnAwsPricing from "@/components/TallyAwsPricing";
import { motion } from "framer-motion";
import tallyonaws from "../assets/tallyonaws.avif"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function TallyOnAws() {
  const whyChooseItems = [
    {
      icon: "🛡️",
      title: "Reliability",
      description: "Tally products are known for their trustworthiness and simplicity, combined with AWS's expertise in cloud computing. Teams from both companies have worked together to ensure Tally on AWS functions perfectly whenever and wherever you need it."
    },
    {
      icon: "🎯",
      title: "Everything in One Place",
      description: "Work directly with your Tally partner who will handle everything from requirements gathering to implementation and post-sales support. No need to coordinate with multiple vendors for solutions or issue resolution."
    },
    {
      icon: "💰",
      title: "Economical",
      description: "Tally Prime on AWS is available at incredibly competitive pricing points specifically designed to meet your business demands and budget constraints."
    },
    {
      icon: "🔄",
      title: "Flexibility",
      description: "Not sure which plan suits you best? Need to add more users? Your plan can be seamlessly upgraded or downgraded in minutes! Fully automated data and billing handling."
    },
    {
      icon: "💻",
      title: "Platform-Agnostic",
      description: "Access Tally through Chrome browser on Windows, Mac, and Linux systems, supporting both 64- and 32-bit configurations across offices and homes."
    }
  ];

  const benefits = [
    "TallyPrime accessible from anywhere in the world",
    "Greater flexibility for collaborative work on the same data",
    "Practical computer access to TallyPrime without local installation",
    "Minimal infrastructure and deployment expertise required",
    "Seamless scalability as your business grows",
    "Reduced IT maintenance and hardware costs"
  ];

  const features = [
    {
      icon: "🔄",
      title: "Real-time Data Sync",
      description: "Ensures everyone works with current data, reducing errors and enabling informed decision-making with accurate information."
    },
    {
      icon: "👥",
      title: "Multi-user Access Control",
      description: "Granular controls allowing you to define user permissions for data access and specific operations."
    },
    {
      icon: "💾",
      title: "Automated Backups",
      description: "Secure automated backups to Amazon S3, ensuring data recovery and protection against unpredictable conditions."
    },
    {
      icon: "🔒",
      title: "Enhanced Security",
      description: "Enterprise-grade security measures to keep your confidential financial data safe and secure."
    },
    {
      icon: "📊",
      title: "AWS Analytics Integration",
      description: "Seamless integration with AWS analytics and database services to transform financial data into actionable insights."
    },
    {
      icon: "⚡",
      title: "High Performance",
      description: "Leveraging AWS infrastructure for optimal performance and reliability during peak business hours."
    }
  ];

  const implementationSteps = [
    "Sign in to your AWS account",
    "Launch instance from EC2 dashboard, select AMI, configure instance details and security groups",
    "Use SSH client to coordinate with your EC2 instance using key pair",
    "Download Tally installer and configure settings according to business needs",
    "Create S3 bucket for Tally backups with proper versioning policies and permissions",
    "Set up automated backups using Tally's built-in feature and AWS CLI/SDKs"
  ];

  const bestPractices = [
    "Always keep Tally on AWS and instances updated with latest versions",
    "Implement least privilege principle for EC2 instances and users",
    "Ensure data encryption and proper access controls for S3 buckets",
    "Set up regular automated backups for disaster recovery",
    "Create AMI snapshots of EC2 instances for easy recovery",
    "Enable Multi-Factor Authentication (MFA) for AWS Console access",
    "Monitor AWS CloudTrail logs for security auditing",
    "Implement network security groups with minimum required ports"
  ];

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Hero Section */}
      <section className="relative bg-gray-900 min-h-[750px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 opacity-90"></div>
        <div className="absolute inset-0">
          <img
            src={tallyonaws}
            alt="Data Center"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Text Content */}
            <motion.div
              className="text-white space-y-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                className="inline-block bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 px-4 py-2 rounded-full text-sm text-blue-200"
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Powered by AWS Cloud
              </motion.div>
              <motion.h1
                className="text-4xl lg:text-5xl font-bold leading-tight"
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Tally on <span className="text-orange-500">AWS</span>
              </motion.h1>
              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Access your Tally Prime license and business data from anywhere,
                anytime with enterprise-grade cloud security and reliability.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Now
                </motion.button>
                <motion.button
                  className="border-2 border-white/30 hover:border-white/50 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInRight}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="rounded-xl p-6">
                <FreeDemoForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className=" bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TallyOnAwsPricing />
        </div>
      </section>

      {/* Why Choose Tally on AWS Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-orange-500">Tally on AWS</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of running Tally on AWS cloud infrastructure
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyChooseItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits & Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Benefits Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Key <span className="text-orange-500">Benefits</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Powerful <span className="text-orange-500">Features</span>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-xl">{feature.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Implementation & Best Practices Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Implementation Steps */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Implementation <span className="text-orange-500">Steps</span>
              </h2>
              <div className="space-y-3">
                {implementationSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg border border-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Best Practices */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Best <span className="text-orange-500">Practices</span>
              </h2>
              <div className="space-y-3">
                {bestPractices.map((practice, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg border border-blue-200"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                      ✓
                    </div>
                    <p className="text-gray-700 text-sm">{practice}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}