import { FeatureGrid } from "@/components/Features";
import { MargOnCloudPricingSection } from "@/components/MargOnCloudPricing";
import { TrustedByClients } from "@/components/TrustedByClient";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FreeDemoForm from "@/components/FreeDemoForm";

export function MargOnCloud() {
  const navigate = useNavigate();

  return (
    <div className="bg-white font-poppins">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Left Column */}
          <div className="lg:w-1/2 text-white space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
              Marg ERP on Cloud
            </h2>

            <p className="text-gray-300 text-base leading-relaxed">
              Complete accounting with GST solution. Access your business from anywhere, anytime with enhanced security and performance.
            </p>

            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition shadow-md"
              onClick={() => navigate('/get-in-touch')}
            >
              Get Free Demo
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          {/* Right Column */}
          <div className="lg:w-1/2 w-full p-8 rounded-xl">
            <FreeDemoForm />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Affordable Pricing Plans
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>
          <div className="w-full">
            <MargOnCloudPricingSection />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Marg on Cloud?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Access your Marg ERP from any device with enhanced security and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              "Real-time data synchronization saves you money on Marg licenses",
              "Entire pay-as-you-go SaaS solution",
              "NFC servers ensure security of Marg Data",
              "Automatic backups on off-site and on-site servers",
              "Complete data security from hackers",
              "Access from any device (Laptop, PC, Mobile)",
              "Our team manages and installs servers",
              "GST compliant accounting solution"
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 sm:p-5 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      <FeatureGrid />


      {/* Trusted Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Trusted by Businesses
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers using our Marg cloud services
            </p>
          </div>
          <div className="flex justify-center">
            <TrustedByClients />
          </div>
        </div>
      </section>
    </div>
  );
}