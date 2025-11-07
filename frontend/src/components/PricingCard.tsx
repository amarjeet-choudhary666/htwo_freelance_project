import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";
import AnimatedSection from "../components/AnimatedSection";

export default function PricingSection() {
  const [expandedPlans, setExpandedPlans] = useState<Set<number>>(new Set());

  const plans = [
    {
      name: "TALLY ON CLOUD",
      price: "$29",
      period: "/month",
      description: "Perfect for startups and small projects",
      features: [
        "Manager Server",
        "Auto Backup",
        "Highly Secure",
        "Unlimited Companies",
        "DATA STORAGE - 10 GB",
        "SHARED 64 GB RAM",
        "ERP9 / PRIME",
        "DIGITAL SIGNATURE",
        "RESTRICTION PERMISSION",
        "REMOTE PRINTING",
        "AUTO BACKUP : DAILY",
        "WEB ACCESS",
        "USER FRIENDLY",
        "FULLY MANAGED",
        "SHARED LINK",
        "WINDOWS SERVER",
        "99.99% UPTIME",
        "Firewall Enabled",
        "IDS / IPS / EDR"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "TALLY ON CLOUD",
      price: "$29",
      period: "/month",
      description: "Perfect for startups and small projects",
      features: [
        "Manager Server",
        "Auto Backup",
        "Highly Secure",
        "Unlimited Companies",
        "DATA STORAGE - 10 GB",
        "SHARED 64 GB RAM",
        "ERP9 / PRIME",
        "DIGITAL SIGNATURE",
        "RESTRICTION PERMISSION",
        "REMOTE PRINTING",
        "AUTO BACKUP : DAILY",
        "WEB ACCESS",
        "USER FRIENDLY",
        "FULLY MANAGED",
        "SHARED LINK",
        "WINDOWS SERVER",
        "99.99% UPTIME",
        "Firewall Enabled",
        "IDS / IPS / EDR"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "TALLY ON CLOUD",
      price: "₹ 250",
      period: "/month",
      description: "Perfect for startups and small projects",
      features: [
        "Manager Server",
        "Auto Backup",
        "Highly Secure",
        "Unlimited Companies",
        "DATA STORAGE - 10 GB",
        "SHARED 64 GB RAM",
        "ERP9 / PRIME",
        "DIGITAL SIGNATURE",
        "RESTRICTION PERMISSION",
        "REMOTE PRINTING",
        "AUTO BACKUP : DAILY",
        "WEB ACCESS",
        "USER FRIENDLY",
        "FULLY MANAGED",
        "SHARED LINK",
        "WINDOWS SERVER",
        "99.99% UPTIME",
        "Firewall Enabled",
        "IDS / IPS / EDR"
      ],
      popular: false,
      cta: "Start Free Trial"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <motion.div
            variants={{}}
            className="inline-flex items-center space-x-2 bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-medium mb-3"
          >
            <TrendingUp className="w-3 h-3" />
            <span>Transparent Pricing</span>
          </motion.div>
          <motion.h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3" variants={{}}>
            Scale with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Confidence</span>
          </motion.h2>
          <motion.p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed" variants={{}}>
            Predictable pricing that grows with your business. No hidden fees, no surprises. Start free and scale as you grow.
          </motion.p>
        </AnimatedSection>

        <motion.div
          className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto"
          variants={{}}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={{}}
              whileHover={{ y: -5 }}
              className={`relative rounded-xl p-4 transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-500 shadow-lg scale-[1.02]"
                  : "bg-white border border-slate-200 shadow-md hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    Most Popular
                  </span>
                </motion.div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-slate-600 text-sm mb-3">{plan.description}</p>
                <div className="flex items-baseline justify-center mb-1">
                  <span className="text-2xl font-bold text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-base text-slate-600 ml-1">{plan.period}</span>}
                </div>
                {plan.name !== "Enterprise" && (
                  <p className="text-xs text-slate-500">14-day free trial</p>
                )}
              </div>

              <ul className="space-y-2 mb-4">
                {plan.features.slice(0, 9).map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.1 }}
                  >
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-xs">{feature}</span>
                  </motion.li>
                ))}

                {plan.features.length > 9 && (
                  <li>
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => {
                        setExpandedPlans(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has(index)) {
                            newSet.delete(index);
                          } else {
                            newSet.add(index);
                          }
                          return newSet;
                        });
                      }}
                    >
                      {expandedPlans.has(index) ? 'Show less' : `+${plan.features.length - 9} more`}
                    </button>
                  </li>
                )}

                {expandedPlans.has(index) &&
                  plan.features.slice(9).map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex + 9}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-xs">{feature}</span>
                    </motion.li>
                  ))}
              </ul>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className={`w-full text-xs ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md"
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </motion.div>

              {plan.name !== "Enterprise" && (
                <p className="text-center text-xs text-slate-500 mt-2">
                  No setup fees • Cancel anytime
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
