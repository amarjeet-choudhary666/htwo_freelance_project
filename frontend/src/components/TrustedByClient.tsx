import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

export function TrustedByClients(){
    return(
        <motion.div
            className="grid md:grid-cols-3 gap-4 mb-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Sarah Chen",
                role: "CTO at TechStart",
                company: "TechStart",
                avatar: "SC",
                content: "CloudPlatform transformed our infrastructure. We scaled from 1,000 to 1 million users with zero downtime.",
                rating: 5,
                metrics: "10x user growth"
              },
              {
                name: "Marcus Rodriguez",
                role: "Lead DevOps Engineer",
                company: "InnovateCorp",
                avatar: "MR",
                content: "Deployment time went from 2 hours to 2 minutes. The CI/CD integration is seamless.",
                rating: 5,
                metrics: "300% faster"
              },
              {
                name: "Emily Johnson",
                role: "Founder & CEO",
                company: "AppVenture",
                avatar: "EJ",
                content: "The 24/7 support team is incredible. When we had a critical issue, they resolved it in under 10 minutes.",
                rating: 5,
                metrics: "99.99% uptime"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100"
              >
                <div className="flex items-center mb-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs mr-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                    <p className="text-slate-600 text-xs">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + index * 0.2 }}
                    >
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-slate-700 leading-relaxed text-xs mb-3">"{testimonial.content}"</p>

                <motion.div
                  className="bg-slate-50 rounded-lg p-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-sm font-semibold text-slate-900">{testimonial.metrics}</div>
                  <div className="text-xs text-slate-500">Key Achievement</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
    )
}