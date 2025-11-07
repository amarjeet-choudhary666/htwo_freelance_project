import { Mail, Tag, Database, Shield, Repeat, Cpu, CheckCircle, Headphones } from 'lucide-react';
import { motion } from "framer-motion";

const emailFeatures = [
  {
    icon: <Mail size={32} className="text-orange-500" />,
    title: "Robust Webmail",
    description: "Designed to be used by anyone, anywhere, anytime you want."
  },
  {
    icon: <Tag size={32} className="text-orange-500" />,
    title: "White Label",
    description: "White label personalised email to match your domain name."
  },
  {
    icon: <Database size={32} className="text-orange-500" />,
    title: "Flexible Storage",
    description: "All plans include 5GB storage with additional storage available."
  },
  {
    icon: <Shield size={32} className="text-orange-500" />,
    title: "Spam Protection",
    description: "Keep your business email safe from online threats."
  },
  {
    icon: <Repeat size={32} className="text-orange-500" />,
    title: "Auto-Responder",
    description: "Setup automated pre-written email responses to recipients."
  },
  {
    icon: <Cpu size={32} className="text-orange-500" />,
    title: "Robust Technology",
    description: "Reliable, scalable and high-performing Email solution."
  },
  {
    icon: <CheckCircle size={32} className="text-orange-500" />,
    title: "99.9% Uptime",
    description: "High reliability & availability for your Business Email."
  },
  {
    icon: <Headphones size={32} className="text-orange-500" />,
    title: "24x7 Support",
    description: "Award-winning Business Email support from pros."
  }
];

export default function BusinessEmailCards() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
          All Business Email (Zimbra) Plans Include
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {emailFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
