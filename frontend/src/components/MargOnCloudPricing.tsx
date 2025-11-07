import { Button } from "@/components/ui/button";
import {
  Users,
  Database,
  Cpu,
  Shield,
  Download,
  Globe,
  Settings,
  Key,
  Link,
  Lock,
  Server,
  Zap,
  Printer,
  UserCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MargOnCloudPricingSection() {
  const navigate = useNavigate();

  const plans = [
    {
      title: "🥈Marg on Cloud - SILVER",
      users: "Single User",
      storage: "10 GB",
      ram: "Shared 64 GB RAM",
      features: [
        { icon: Shield, text: "MARG" },
        { icon: Download, text: "Install any software" },
        { icon: UserCheck, text: "Restriction permission" },
        { icon: Printer, text: "Fast printing" },
        { icon: Database, text: "Free backup: Daily" },
        { icon: Globe, text: "Web access" },
        { icon: Users, text: "User friendly" },
        { icon: Settings, text: "Fully managed" },
        { icon: Lock, text: "NA" },
        { icon: Link, text: "Shared link" },
        { icon: Key, text: "NA" },
        { icon: Server, text: "Windows server" },
        { icon: Zap, text: "99.99% uptime" },
      ],
      logo: "/logos/silver-logo.png",
    },
    {
      title: "🥇Marg on Cloud - GOLD",
      users: "2 TO 5 Users",
      storage: "50 GB - SSD Storage",
      ram: "4 vCore / 8 GB RAM",
      features: [
        { icon: Shield, text: "MARG" },
        { icon: Download, text: "Install any software" },
        { icon: UserCheck, text: "Restriction permission" },
        { icon: Printer, text: "Remote printing" },
        { icon: Database, text: "Free backup: Daily" },
        { icon: Globe, text: "Web access / RDP access" },
        { icon: Users, text: "User friendly" },
        { icon: Settings, text: "Fully managed" },
        { icon: Lock, text: "Option of 2FA" },
        { icon: Link, text: "1 - Dedicated IP" },
        { icon: Key, text: "SSL Encryption" },
        { icon: Server, text: "Windows server" },
        { icon: Zap, text: "99.99% uptime" },
      ],
      logo: "/logos/gold-logo.png",
    },
    {
      title: "💎Marg on Cloud - DIAMOND",
      users: "6 TO 15 Users",
      storage: "150 GB - SSD Storage",
      ram: "6 vCore / 16 GB RAM",
      features: [
        { icon: Shield, text: "MARG" },
        { icon: Download, text: "Install any software" },
        { icon: UserCheck, text: "Restriction permission" },
        { icon: Printer, text: "Remote printing" },
        { icon: Database, text: "Free backup: Daily" },
        { icon: Globe, text: "Web access / RDP access" },
        { icon: Users, text: "User friendly" },
        { icon: Settings, text: "Fully managed" },
        { icon: Lock, text: "Option of 2FA" },
        { icon: Link, text: "1 - Dedicated IP" },
        { icon: Key, text: "SSL Encryption" },
        { icon: Server, text: "Windows server" },
        { icon: Zap, text: "99.99% uptime" },
      ],
      logo: "/logos/diamond-logo.png",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Plan Header */}
              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{plan.users}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700 font-medium">
                  <Database className="w-4 h-4" />
                  <span className="text-sm">{plan.storage}</span>
                  <span className="mx-1">•</span>
                  <Cpu className="w-4 h-4" />
                  <span className="text-sm">{plan.ram}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="flex-1 space-y-3">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="flex items-center gap-2">
                      <feature.icon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature.text}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Client Logo */}
              <div className="mt-6 flex justify-center items-center py-3 border-t border-gray-100">
                <img
                  src={plan.logo}
                  alt={`${plan.title} client logo`}
                  className="h-8 object-contain opacity-80"
                />
              </div>

              {/* CTA Buttons */}
              <div className="mt-4 text-center space-y-2">
                <div>
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                    onClick={() => navigate('/get-in-touch')}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}