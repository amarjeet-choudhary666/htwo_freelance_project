import { Headphones, Globe, Lock, Zap, Settings, Database } from "lucide-react";

const featuresData = [
  {
    icon: <Headphones className="w-8 h-8 text-blue-500" />,
    title: "Technical Assistance",
    description:
      "With dedicated hosting, members receive priority technical support, allowing swift resolution of technical issues.",
  },
  {
    icon: <Globe className="w-8 h-8 text-green-500" />,
    title: "Dedicated IP Address",
    description:
      "Each site has a unique IP address, allowing multiple sites to use their own IP addresses without conflicts.",
  },
  {
    icon: <Lock className="w-8 h-8 text-red-500" />,
    title: "Privacy and Security",
    description:
      "The server is fully isolated. Providers implement firewalls, malware detection, and phishing alerts for enhanced security.",
  },
  {
    icon: <Zap className="w-8 h-8 text-purple-500" />,
    title: "Guaranteed Uptime & Easy Upgrade",
    description:
      "Dedicated servers allow bandwidth, RAM, and CPU upgrades to match your website's growing requirements.",
  },
  {
    icon: <Settings className="w-8 h-8 text-yellow-500" />,
    title: "Complete Control & Administrative Access",
    description:
      "Install and configure software as you like. Perform upgrades, migrations, and operations management efficiently.",
  },
  {
    icon: <Database className="w-8 h-8 text-indigo-500" />,
    title: "Advanced Technology Features",
    description:
      "Dedicated servers include top-end hardware like Desktop HDDs, Enterprise SATA, and high-performance servers.",
  },
];

export default function DedicatedServerFeatures() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Features
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Dedicated servers provide a suite of features to ensure maximum performance, security, and control for your hosting needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-start gap-4"
            >
              <div className="mb-2">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
