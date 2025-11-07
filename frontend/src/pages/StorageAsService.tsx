import FreeDemoForm from "@/components/FreeDemoForm";
import { TrustedByClients } from "@/components/TrustedByClient";

export function StorageAsService() {
    return (
        <div className="font-poppins">
            {/* hero section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

                    {/* Left Column */}
                    <div className="lg:w-1/2 text-white space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
                            Storage as a Service
                        </h2>

                        <p className="text-gray-300 text-base leading-relaxed">
                            The storage capacity that is being made available to the customer can vary reliably, and can be enlarged at short notice without the capital outlay needed to buy extra servers.

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
                </div>
            </section>

            {/* What is Storage */}
            <section className=" py-10 max-w-5xl mx-auto">
                <h1 className="text-4xl font-semibold py-5 text-gray-900">What is Storage as a Service?</h1>
                <p className="py-3 text-gray-700">
                    Storage as a Service (STaaS) is a process in which a provider rents storage resources to a customer through a subscription model. It provides a scalable, reliable, and efficient storage environment based on various technologies, including block, file, and object storage, all supported by guaranteed Service Level Agreements (SLAs). The storage capacity made available to the customer can be adjusted as needed and expanded on short notice without the capital expenditure required to purchase additional servers.
                </p>
                <p className="py-3 text-gray-700">
                    STaaS is especially popular among small to midsize businesses, as it eliminates the need for an upfront investment in hard drives, servers, and IT staff. Additionally, it offers features such as easy data sharing with just a few clicks and access to data from multiple devices including smartphones, laptops, and tablets, making data management and accessibility effortless.
                </p>
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