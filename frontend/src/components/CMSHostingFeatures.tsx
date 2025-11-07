import {
  Globe,
  Database,
  Zap,
  LayoutDashboard,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: <Globe className="w-8 h-8 text-blue-600" />,
    title: "Host Unlimited Domains",
    description:
      "Hosting Safari Java VPS plans have the quality of unlimited domains. You don’t need to purchase different plans for each site. With only one VPS to run all sites.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-blue-600" />,
    title: "Unlimited Subdomains",
    description:
      "You can create multiple subdomains for adding features or making your site multilingual. Subdomains are flexible and easy to manage.",
  },
  {
    icon: <Database className="w-8 h-8 text-blue-600" />,
    title: "Unlimited Database",
    description:
      "For multiple sites, you can create multiple independent databases. This ensures security and reliability for your websites.",
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-600" />,
    title: "1-Click Install Apps",
    description:
      "Choose from a range of pre-assembled applications and let our 1-click installer set up your website quickly and efficiently.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-blue-600" />,
    title: "Free Sitebuilder",
    description:
      "Build your website or online store in minutes without any coding or design skills using our free and reliable website builder.",
  },
  {
    icon: <ArrowRight className="w-8 h-8 text-blue-600" />,
    title: "Transfer Website",
    description:
      "Seamlessly migrate your website to Hosting Safari with zero downtime, keeping your business online at all times.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    title: "30 Day Money Back",
    description:
      "We give you the flexibility to cancel the plan within 30 days if you aren’t satisfied, ensuring peace of mind and risk-free hosting.",
  },
];

export default function CMSHostingFeatures() {
  return (
    <section className="py-16 bg-gray-50 font-poppins">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">
          Our Features
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-start gap-4"
            >
              <div>{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
