import CMSHostingFeatures from "@/components/CMSHostingFeatures";
import ExpertService from "@/components/Expert.Service";
import FreeDemoForm from "@/components/FreeDemoForm";
import { TrustedByClients } from "@/components/TrustedByClient";
import WindowsVPSPricingTable from "@/components/WindowsVPSpricing";

export function VPSwindows() {
    return (
        <div>
            {/* hero section */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

                    {/* Left Column */}
                    <div className="lg:w-1/2 text-white space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
                            Hosting Windows VPS in India
                        </h2>

                        <p className="text-gray-300 text-base leading-relaxed">
                            Cheap Windows VPS Hosting plans with the fastest and most powerful management. Manage your server with ease.
                        </p>

                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition shadow-md">
                            Get Started Now
                        </button>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-1/2 w-full  p-8 rounded-xl ">
                        <FreeDemoForm />
                    </div>
                </div>
            </section>

            {/* Hosting plans */}

            <WindowsVPSPricingTable />

            {/* FEATURES */}
            <CMSHostingFeatures />

            {/* expert service  */}
            <ExpertService />

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