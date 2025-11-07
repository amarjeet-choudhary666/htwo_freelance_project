import { Cloud, Server, Shield, Zap, Users, Globe, CheckCircle, ArrowRight, Play, Award, TrendingUp, Headphones } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrustedByClients } from '@/components/TrustedByClient';
import { TallyOnCloudPricing } from '@/components/TallyOnCloudPricing';
import AnimatedSection from '@/components/AnimatedSection';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import background images
import bg1 from '../assets/bg1.avif';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import bg4 from '../assets/bg4.jpg';

// Ultra-fast animation variants for performance
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2 }
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Background carousel state
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const backgroundImages = [bg1, bg2, bg3, bg4];

  // Auto-change background every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {backgroundImages.map((bg, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${bg})`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentBgIndex ? 1 : 0,
              }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            />
          ))}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 z-10"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 z-10"
          animate={{
            scale: [1.1, 1, 1.1],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentBgIndex
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/70'
                }`}
              onClick={() => setCurrentBgIndex(index)}
            />
          ))}
        </div>

        <div ref={heroRef} className="relative container mx-auto px-4 sm:px-6 py-16 lg:py-20 z-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              className="space-y-4"
              initial="initial"
              animate={heroInView ? "animate" : "initial"}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs"
              >
                <Award className="w-3 h-3 text-yellow-400" />
                <span>Trusted by 50,000+ businesses</span>
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
                variants={fadeInUp}
              >
                Enterprise Cloud
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"> Infrastructure</span>
                <br />Built for Scale
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl"
                variants={fadeInUp}
              >
                Deploy, manage, and scale your applications with confidence. Our enterprise-grade cloud platform delivers 99.99% uptime, global reach, and unmatched performance.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-2"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm px-5 py-2 shadow-xl" onClick={() => navigate('/get-in-touch')}>
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="border-white/30 text-black hover:bg-white/10 text-sm px-5 py-2 backdrop-blur-sm">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="grid grid-cols-3 gap-4 pt-4"
                variants={fadeInUp}
              >
                {[
                  { value: "99.99%", label: "Uptime SLA", color: "text-cyan-400" },
                  { value: "<20ms", label: "Global Latency", color: "text-green-400" },
                  { value: "24/7", label: "Expert Support", color: "text-purple-400" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-3xl"></div>
              <motion.div
                className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center justify-between p-2 bg-white/10 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-xs font-medium">All Systems Operational</span>
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </motion.div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Server, value: "50K+", label: "Active Servers", color: "text-blue-400" },
                      { icon: Globe, value: "35", label: "Global Regions", color: "text-green-400" },
                      { icon: Users, value: "1M+", label: "Developers", color: "text-purple-400" },
                      { icon: Zap, value: "10B+", label: "API Calls/Month", color: "text-yellow-400" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="bg-white/10 rounded-lg p-3 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 + 0.2 }}
                      >
                        <item.icon className={`w-6 h-6 mx-auto mb-1 ${item.color}`} />
                        <div className="text-sm font-bold">{item.value}</div>
                        <div className="text-xs text-slate-400">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-medium mb-3"
            >
              <Zap className="w-3 h-3" />
              <span>Powerful Features</span>
            </motion.div>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
              variants={fadeInUp}
            >
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Scale</span>
            </motion.h2>
            <motion.p
              className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              From startups to Fortune 500 companies, our enterprise-grade cloud platform provides the tools and infrastructure to power your growth.
            </motion.p>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Cloud,
                title: "Auto-Scaling Infrastructure",
                description: "Intelligent auto-scaling that adapts to your traffic patterns. Scale from zero to millions of users seamlessly.",
                features: ["Horizontal & Vertical Scaling", "Load Balancing", "Traffic Prediction"],
                color: "blue"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security with advanced threat protection, compliance certifications, and zero-trust architecture.",
                features: ["SOC 2 Type II", "GDPR Compliant", "DDoS Protection"],
                color: "green"
              },
              {
                icon: Zap,
                title: "Global Edge Network",
                description: "Lightning-fast content delivery with 200+ edge locations worldwide. Sub-20ms latency guaranteed.",
                features: ["200+ Edge Locations", "Smart Routing", "Real-time Analytics"],
                color: "yellow"
              },
              {
                icon: Server,
                title: "Managed Databases",
                description: "Fully managed database services with automated backups, scaling, and high availability built-in.",
                features: ["PostgreSQL, MySQL, Redis", "Automated Backups", "Read Replicas"],
                color: "purple"
              },
              {
                icon: Globe,
                title: "Multi-Region Deployment",
                description: "Deploy to 35+ regions worldwide with a single click. Bring your applications closer to your users.",
                features: ["35+ Global Regions", "One-Click Deployment", "Disaster Recovery"],
                color: "indigo"
              },
              {
                icon: Headphones,
                title: "24/7 Expert Support",
                description: "Get help from our cloud architects and engineers anytime. Premium support with guaranteed response times.",
                features: ["< 1min Response Time", "Dedicated Support Manager", "Phone & Chat Support"],
                color: "red"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group bg-white rounded-xl p-4 text-blue-600 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-blue-200"
              >
                <div className="mb-3 p-2 bg-slate-50 rounded-lg w-fit group-hover:bg-blue-50 transition-colors">
                  <feature.icon className={`w-8 h-8 text-blue-600`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.features.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center text-xs text-slate-500"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.02 }}
                    >
                      <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <TallyOnCloudPricing />

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 rounded-full px-3 py-1 text-xs font-medium mb-3"
            >
              <Users className="w-3 h-3" />
              <span>Customer Stories</span>
            </motion.div>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
              variants={fadeInUp}
            >
              Trusted by
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Industry Leaders</span>
            </motion.h2>
            <motion.p
              className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Join thousands of companies that trust CloudPlatform to power their mission-critical applications.
            </motion.p>
          </AnimatedSection>

          <TrustedByClients />

          {/* Stats Section */}
          <AnimatedSection>
            <motion.div
              className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl p-6 text-white"
              whileInView={{ scale: [0.95, 1] }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-4 gap-4 text-center">
                {[
                  { value: "50,000+", label: "Active Customers" },
                  { value: "99.99%", label: "Average Uptime" },
                  { value: "10B+", label: "API Calls Monthly" },
                  { value: "35", label: "Global Regions" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-xl font-bold mb-1">{stat.value}</div>
                    <div className="text-slate-300 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;