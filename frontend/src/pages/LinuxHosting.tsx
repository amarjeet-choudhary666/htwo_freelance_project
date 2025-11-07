import CMSHostingFeatures from "@/components/CMSHostingFeatures";
import ExpertService from "@/components/Expert.Service";
import FreeDemoForm from "@/components/FreeDemoForm";
import HostingFeaturesTable from "@/components/HostingFeaturesTable";
import { TrustedByClients } from "@/components/TrustedByClient";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { FaHeadset } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LinuxHostingSection() {
  const navigate = useNavigate();

  const benefits = [
    "Linux is open source, it can be customised according to the landscape of hosting to fulfil your demands.",
    "It is designed with strong security and encryption. Linux offers a safe and secure foundation for website hosting.",
    "Linux hosting is portable and can easily increase as soon as your website audience rises.",
    "Linux hosting is cost-effective and any small business or startup can easily go with it. Its licensing cost is also very low.",
    "Linux supports all types of apps and programming languages. You can use lots of applications easily with Linux hosting attributes.",
  ];

  const tips = [
    "Choose well-known providers: Various top Linux hosting providers such as Bluehost and SiteGround are well known. Select the best providers with the help of customer feedback and old records.",
    "Customer support responsiveness: Always watch the provider’s old records to make sure you are with the right and versatile Customer support is the most important for solving every issue easily.",
    "Compare prices: Before selecting a provider, first compare the different plans and choose the plan that fits your requirements and is under your budget.",
    "Important attributes: Choose the attributes like automated backups and 24/7 privacy support, that keep your website and data encrypted.",
  ];

  const plans = [
    {
      name: "Bronze Plan",
      price: "₹ 99 / Month",
      features: [
        "Storage: 10GB",
        "Domain: 1",
        "Sub Domain: Unlimited",
        "FTP: 5",
        "Addon Domain: 1",
        "Email: Unlimited",
        "MySQL: 10",
        "Bandwidth: 1TB Monthly",
      ],
      description: "Reliable hosting with essential features and 24/7 support.",
      color: "bg-white border border-gray-200",
    },
    {
      name: "Silver Plan",
      price: "₹ 249 / Month",
      features: [
        "Storage: 25GB",
        "Domain: 5",
        "Sub Domain: Unlimited",
        "FTP: 20",
        "Addon Domain: 5",
        "Email: Unlimited",
        "MySQL: 25",
        "Bandwidth: 1TB Monthly",
      ],
      description: "Perfect for growing websites with extra resources.",
      color: "bg-white border border-blue-400 shadow-md",
    },
    {
      name: "Gold Plan",
      price: "₹ 499 / Month",
      features: [
        "Storage: 50GB",
        "Domain: 50",
        "Sub Domain: Unlimited",
        "FTP: 100",
        "Addon Domain: 100",
        "Email: Unlimited",
        "MySQL: 100",
        "Bandwidth: 1TB Monthly",
      ],
      description: "Premium hosting with maximum performance and support.",
      color: "bg-white border border-gray-300 shadow-lg",
    },
  ];


  return (
    <div className="font-poppins">
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 px-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{
              animation: 'float 15s ease-in-out infinite reverse'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 relative z-10">

          {/* Left Column */}
          <div className="lg:w-1/2 text-white space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
              Linux Web Hosting
            </h2>

            <p className="text-gray-300 text-base leading-relaxed">
              Linux Hosting is used for applications on servers running the Linux operating system.
              It’s an ideal choice due to its powerful, secure, and open-source nature.
            </p>

            <ul className="space-y-3 text-gray-200">
              {[
                "Unbounded Domains",
                "99.9% Uptime Guarantee",
                "Extensive Disk Space",
                "Powered By Cloud Linux",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-green-400 text-lg">✔</span> {item}
                </li>
              ))}
            </ul>

            <p className="text-gray-300 text-base leading-relaxed">
              Get 100% stress-free, smartly managed Linux web hosting. Secure and powerful plans
              to provide the reliability and flexibility you need.
            </p>

            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition shadow-md"
              onClick={() => navigate('/get-in-touch')}
            >
              Get Started Now
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 w-full  p-8 rounded-xl">
            <FreeDemoForm />
          </div>
        </div>
      </section>

      {/* price section */}
      <section className="py-16 bg-gray-50 font-poppins">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Linux Web Hosting Plans
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-8 flex flex-col justify-between transition hover:scale-105 ${plan.color}`}
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-2 mb-6 text-gray-800">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex justify-between border-b border-gray-200 pb-1">
                        <span>{feature.split(":")[0]}</span>
                        <span className="font-medium">{feature.split(":")[1]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {plan.price}
                  </p>
                  <button 
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    onClick={() => navigate('/get-in-touch')}
                  >
                    Contact us
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <h1 className="flex items-center justify-center gap-2 text-lg font-semibold py-3">
              <FaHeadset className="text-blue-800" />
              We're Here to Help You
            </h1>
            <p className="text-xs">Have some questions?<span className="text-orange-500">Chat with us now,</span>or send us an email to get in touch.</p>
          </div>
        </div>
      </section>

      {/* Benifits */}
      <section className="py-10 bg-gray-50 font-poppins">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Benefits of Linux Hosting
          </h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {benefit}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-15">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Choosing a Linux Host
          </h2>
          <ul className="space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 mt-1" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {tip}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>



      {/* features */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Web Application Hosting With CMS
          </h2>
          <p className="text-gray-600 mb-12">
            Build your website around your favourite app. Our 1-click installer makes it easy to integrate hundreds of the latest, advanced web applications.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <CMSHostingFeatures />
        </div>
      </section>


      <section className="py-16 bg-gray-50 font-poppins">
        {/* Features Table */}
        <HostingFeaturesTable />

        {/* Conclusion */}
        <div className="mt-16 flex flex-col justify-center items-center text-center px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Conclusion</h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Linux hosting is at the top of the list due to its strong security, customization, budget-friendly features, and flexibility.
            If you want to start your journey, a shared Linux hosting plan is the best option to enjoy unlimited benefits and reliable hosting solutions.
            Start your world of Linux hosting in this digital age and contact us for more information!
          </p>
        </div>
      </section>

      {/* customer service */}
      <section>
        <ExpertService />
      </section>

      {/* trusted clients */}
      <section className="py-16 bg-gray-50 font-poppins">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Text Content */}
          <div className="lg:w-1/2 text-left">
            <h2 className="text-lg md:text-4xl font-bold text-gray-800 mb-4">
              Trusted By Clients And Industry Experts
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Trusted by clients and industry experts, we deliver reliable solutions
              with progressive strategies and collaborative execution.
            </p>
          </div>

          {/* Right: Logos / Visuals */}
          <div className="lg:w-2/1">
            <TrustedByClients />
          </div>
        </div>
      </section>
    </div>
  );
}

