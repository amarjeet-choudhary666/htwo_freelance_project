import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animated component wrapper
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export function ReadyToStartFooter() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <AnimatedSection className="relative container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium mb-4"
          >
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>Limited Time Offer Contact Now </span>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-4 leading-tight"
            variants={fadeInUp}
          >
            Ready to Transform
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> Your Infrastructure?</span>
          </motion.h2>

          <motion.p
            className="text-base text-slate-300 mb-6 max-w-xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Join 50,000+ companies already using CloudPlatform to build, deploy, and scale their applications with confidence.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-sm px-6 py-2 shadow-xl" onClick={() => navigate('/get-in-touch')}>
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="border-white/30 text-black hover:bg-white/10 text-sm px-6 py-2 backdrop-blur-sm" onClick={() => navigate('/get-in-touch')}>
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-4 text-center"
            variants={staggerContainer}
          >
            {[
              "No credit card required",
              "14-day free trial",
              "Cancel anytime"
            ].map((benefit) => (
              <motion.div
                key={benefit}
                variants={fadeInUp}
                className="flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-slate-300 text-xs">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}