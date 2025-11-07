import FreeDemoForm from "@/components/FreeDemoForm";
import { TrustedByClients } from "@/components/TrustedByClient";
import Recovery from "../assets/Recovery.webp"

export function DisasterServiceAsRecovery() {
    return (
        <div className="font-poppins">
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

                    {/* Left Column */}
                    <div className="lg:w-1/2 text-white space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
                            Disaster Recovery as a Service
                        </h2>

                        <p className="text-gray-300 text-base leading-relaxed">
                            Comprehensive Disaster Recovery as a service solution designed to suit your enterprise business IT recovery on demand.
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

            {/* Disaster Recovery as a Service Summary */}
            <section className="flex flex-col lg:flex-row min-h-[750px] items-center lg:justify-between px-6 lg:px-20 py-12 gap-10">
                {/* Left */}
                <div className="lg:w-full space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-semibold">Disaster Recovery as a Service</h1>
                    <p>
                        Comprehensive Disaster Recovery as a Service solution designed to suit your enterprise business IT recovery on demand.
                        We design customer-specific solutions using multiple combinations of methods (storage, back-up and replication, etc.)
                        and infrastructure (on-premises, private, public, hybrid cloud & hosted cloud, etc.) to minimize the impact (RPO) of disruption
                        and recover faster (RTO).
                    </p>
                    <p>
                        This disaster continuity plan is also known as a business continuity plan. DRaaS solutions can be opted as per the budget
                        constraints and the need of the business. Managed DRaaS provides a more effective and untroubled approach. Reliable DRaaS
                        providers make a swift failover process so that you experience minimal to no downtime. They take care of all the IT tasks
                        at the failover site, whether it is managing the servers, looking after security, or upgrading them.
                    </p>
                </div>

                {/* Right */}
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src={Recovery}
                        alt="Disaster Recovery"
                        className="w-full max-w-md object-cover rounded-lg shadow-lg"
                    />
                </div>
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
    )
}