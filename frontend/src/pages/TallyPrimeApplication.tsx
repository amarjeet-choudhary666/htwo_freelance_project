import FreeDemoForm from "@/components/FreeDemoForm";
import TallyPrimeProductPlans from "@/components/TallyPrimePricing";
import cloudserver from "../assets/Cloudimage.jpg"

export default function TallyPrimeApplication() {
  return (
    <div>
      <section
        className="w-full h-[700px] bg-cover bg-center bg-fixed relative flex items-center py-12"
        style={{
          backgroundImage: `url(${cloudserver})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-snug">
                Tally Prime Application
              </h1>
              <p className="text-sm md:text-base lg:text-lg mb-4 leading-relaxed opacity-90 max-w-2xl">
                Serving more than <span className="font-semibold text-[#FF7A00]">25,000+ customers</span> & <span className="font-semibold text-[#FF7A00]">1,000 tally partners</span> globally. With highly secure end-to-end encrypted network to access Tally application on cloud.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button className="bg-[#FF7A00] hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started Now
                </button>
                <button className="border-2 border-white hover:bg-white/10 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>99.9% Uptime Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Bank-Level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* RIGHT FORM SECTION */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
              <FreeDemoForm />
            </div>
          </div>
        </div>
      </section>

      <section>
        <TallyPrimeProductPlans />
      </section>
    </div>
  );
}
