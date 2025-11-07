import CMSHostingFeatures from "@/components/CMSHostingFeatures";
import ExpertService from "@/components/Expert.Service";
import FreeDemoForm from "@/components/FreeDemoForm";
import { TrustedByClients } from "@/components/TrustedByClient";
import WindowsHostingFeaturesTable from "@/components/WindowsHostingFeaturesTable";
import { FaHeadset } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function WindowsHosting() {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Bronze Plan",
            price: "₹ 99 / Month",
            description: "Guaranteed speed with 24/7 support that gives an edge over competition",
            features: {
                Storage: "10GB",
                Domain: "1",
                "Sub Domain": "Unlimited",
                FTP: "5",
                "Addon Domain": "1",
                Email: "Unlimited",
                MySQL: "10",
                Bandwidth: "1TB Monthly",
                Panel: "Plesk",
            },
            color: "bg-white border border-gray-200",
        },
        {
            name: "Silver Plan",
            price: "₹ 149 / Month",
            description: "Guaranteed speed with 24/7 support that gives an edge over competition",
            features: {
                Storage: "25GB",
                Domain: "2",
                "Sub Domain": "Unlimited",
                FTP: "20",
                "Addon Domain": "5",
                Email: "Unlimited",
                MySQL: "25",
                Bandwidth: "1TB Monthly",
                Panel: "Plesk",
            },
            color: "bg-white border border-blue-400 shadow-md",
        },
        {
            name: "Gold Plan",
            price: "₹ 299 / Month",
            description: "Guaranteed speed with 24/7 support that gives an edge over competition",
            features: {
                Storage: "50GB",
                Domain: "50",
                "Sub Domain": "Unlimited",
                FTP: "100",
                "Addon Domain": "100",
                Email: "Unlimited",
                MySQL: "100",
                Bandwidth: "1TB Monthly",
                Panel: "Plesk",
            },
            color: "bg-white border border-gray-300 shadow-lg",
        },
    ];

    return (
        <div>
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

                    {/* Left Column */}
                    <div className="lg:w-1/2 text-white space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
                            Affordable Windows Hosting Services Hosting
                        </h2>

                        <p className="text-gray-300 text-base leading-relaxed">
                            Cost effective Windows Hosting Services For All Your requirements Advantageous Feature Rich & State of the Art Windows Hosting.
                        </p>

                        <ul className="space-y-3 text-gray-200">
                            {[
                                "Lightning Fast Website",
                                "Best for ASP.NET",
                                "99.9% Uptime Guarantee",
                                "Powered By Cloud Linux",
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="text-green-400 text-lg">✔</span> {item}
                                </li>
                            ))}
                        </ul>

                        <p className="text-gray-300 text-base leading-relaxed">
                            Get 100% Stress-Free, smartly managed Linux Web Hosting. Secure & Most Powerful Linux Hosting Plans. Effortlessly get the power and flexibility you need.
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

            {/* PRICING SECTION */}
            <section className="py-16 bg-gray-50 font-poppins">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
                        Windows Hosting Plans
                    </h2>
                    <p className="text-gray-600 mb-12">
                        Server Pricing That Makes Sense: Flexible and Predictable
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`rounded-xl p-8 flex flex-col justify-between transform transition hover:scale-105 ${plan.color}`}
                            >
                                {/* Plan Header */}
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2 text-gray-900">{plan.name}</h3>
                                    <p className="text-gray-700 mb-6">{plan.description}</p>

                                    {/* Features List */}
                                    <ul className="space-y-2 mb-6 text-gray-800">
                                        {Object.entries(plan.features).map(([key, value], index) => (
                                            <li key={index} className="flex justify-between border-b border-gray-200 pb-1">
                                                <span>{key}</span>
                                                <span className="font-medium">{value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Price & Button */}
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

            <section>
                <CMSHostingFeatures />
            </section>

            {/*table section  */}
            <section className="py-8  bg-gray-50">
                <div className="container mx-auto">
                    <WindowsHostingFeaturesTable />
                </div>
            </section>

            {/* Expert service */}
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
    )
}