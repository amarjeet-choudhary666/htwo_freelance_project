import CMSHostingFeatures from "@/components/CMSHostingFeatures";
import ExpertService from "@/components/Expert.Service";
import FreeDemoForm from "@/components/FreeDemoForm";
import HostingFeaturesTable from "@/components/HostingFeaturesTable";
import { TrustedByClients } from "@/components/TrustedByClient";
import VPSLinuxPricing from "@/components/VPSLinuxPricing";

export function VPSLinux() {
    return (
        <div>

            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900  relative overflow-hidden py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

                    {/* Left Column */}
                    <div className="lg:w-1/2 text-white space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
                            Our Linux VPS Hosting is 100% worry-free and fully managed.
                        </h2>

                        <p className="text-gray-300 text-base leading-relaxed">
                            Cost effective Windows Hosting Services For All Your requirements Advantageous Feature Rich & State of the Art Windows Hosting.

                        </p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition shadow-md">
                            Get Started Now
                        </button>
                    </div>
                    {/* Right Column */}
                    <div className="lg:w-1/2 w-full  p-8 rounded-xl">
                        <FreeDemoForm />
                    </div>
                </div>
            </section>

            {/* VPS Linux pricing section */}
            <section>
                <VPSLinuxPricing />
            </section>

            {/* features */}
            <section>
                <CMSHostingFeatures />
            </section>

            <section className="py-12 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    {/* Hosting Features Table */}
                    <HostingFeaturesTable />

                    {/* Conclusion */}
                    <div className="mt-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Conclusion</h2>
                        <p className="text-gray-600 text-base md:text-lg">
                            Linux hosting is at the top of the list due to its strong security, customization, budget-friendly features, and flexibility.
                            If you want to start your journey, then a shared Linux hosting plan is the best option to enjoy unlimited benefits and strong hosting solutions.
                            Start exploring the world of Linux hosting in this digital era, and contact us for more information!
                        </p>
                    </div>
                </div>
            </section>

            {/* expert service */}
            <ExpertService/>

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
    )
}