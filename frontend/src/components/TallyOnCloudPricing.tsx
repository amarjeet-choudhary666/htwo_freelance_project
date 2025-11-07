import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Database, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 }
};

interface PricingPlan {
  id: number;
  title: string;
  users: string;
  storage: string;
  ram: string;
  features: string[];
  priceMonthly: string;
  priceYearly: string;
  gst: string;
  image: string;
  popular: boolean;
  priority: string;
}

const TallyOnCloudPricing = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/services/category-type/2');
        if (!response.ok) {
          throw new Error('Failed to fetch pricing plans');
        }
        const data = await response.json();

        if (data.success && data.data) {
          const plans: PricingPlan[] = data.data.map((service: any, index: number) => ({
            id: service.id,
            title: service.name,
            users: service.description || `${service.name.split(' - ')[1]} User${service.name.includes('SINGLE') ? '' : 's'}`,
            storage: service.storage || 'N/A',
            ram: service.ram || 'N/A',
            features: service.features || [],
            priceMonthly: service.monthlyPrice ? `₹ ${service.monthlyPrice} / Month` : 'Contact Us',
            priceYearly: service.yearlyPrice ? `₹ ${service.yearlyPrice} / Yearly` : 'Contact Us',
            gst: 'GST Extra 18%',
            image: service.imageUrl || "https://www.hostingsafari.com/assets/img/customers/tally-icon-01.webp",
            popular: service.priority === 'HIGH', // Make HIGH priority plan popular
            priority: service.priority,
          }));

          // Sort plans to put HIGH priority in the middle
          const order = ['LOW', 'HIGH', 'MEDIUM'];
          plans.sort((a, b) => order.indexOf(a.priority) - order.indexOf(b.priority));

          setPricingPlans(plans);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching pricing plans:', err);
        setError(err instanceof Error ? err.message : 'Failed to load pricing plans');
        setPricingPlans([]); // No fallback, set empty array
      } finally {
        setLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading pricing plans...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && pricingPlans.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Failed to load pricing plans. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div
            className="inline-flex items-center bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
            variants={fadeInUp}
          >
            <Cpu className="w-4 h-4 mr-2" />
            Flexible Pricing Plans
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900"
            variants={fadeInUp}
          >
            Choose Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Cloud Solution
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Scalable plans designed to grow with your business needs
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              className="relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 group cursor-pointer"
              variants={scaleIn}
              whileHover={{ y: -10 }}
              onClick={() => toggleExpand(index)}
            >
              {/* ✅ Existing header */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 py-5">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`p-8 text-center relative overflow-hidden ${plan.title.includes("SILVER")
                  ? "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900"
                  : plan.title.includes("GOLD")
                    ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white"
                    : "bg-gradient-to-br from-purple-600 to-indigo-700 text-white"
                  }`}
              >
                <motion.img
                  src={plan.image}
                  alt={plan.title}
                  className="h-16 mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                />
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-sm opacity-90">{plan.users}</p>
              </div>

              {/* ✅ Storage & RAM */}
              <div className="p-6 bg-white border-b border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Database className="w-6 h-6 text-blue-500 mb-2" />
                    <p className="text-sm font-semibold text-gray-900">Storage</p>
                    <p className="text-xs text-gray-600">{plan.storage}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Cpu className="w-6 h-6 text-green-500 mb-2" />
                    <p className="text-sm font-semibold text-gray-900">RAM</p>
                    <p className="text-xs text-gray-600">{plan.ram}</p>
                  </div>
                </div>
              </div>

              {/* ✅ Features with Expand */}
              <div className="p-6 flex-1 bg-white">
                <ul className="space-y-3">
                  {(expandedCards[index] ? plan.features : plan.features.slice(0, 8)).map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-700">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      {feature}
                    </li>
                  ))}

                  {plan.features.length > 8 && (
                    <li>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(index);
                        }}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {expandedCards[index]
                          ? "Show Less"
                          : `+${plan.features.length - 8} more`}
                      </button>
                    </li>
                  )}
                </ul>

              </div>

              {/* ✅ Pricing */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-gray-900">{plan.priceMonthly}</p>
                  <p className="text-sm text-gray-600">{plan.priceYearly}</p>
                  <p className="text-xs text-gray-500 mt-1">{plan.gst}</p>
                </div>

                <motion.button
                  className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${plan.popular
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/get-in-touch'}
                >
                  <span className="flex items-center justify-center">
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { TallyOnCloudPricing };