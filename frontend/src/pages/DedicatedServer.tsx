import AddOnStorageTable from "@/components/AddOnStorageTable";
import DedicatedServerFeatures from "@/components/DedicatedServerFeatures";
import DedicatedServerPricing from "@/components/DedicatedServicePricing";
import FreeDemoForm from "@/components/FreeDemoForm";
import { TrustedByClients } from "@/components/TrustedByClient";
import { Cpu, Shield, Key, Settings, CheckCircle } from "lucide-react"; // icons for benefits 

export function DedicatedServer() {


    const benefitsData = [
        {
            icon: <Cpu className="w-6 h-6 text-blue-500" />,
            title: "Maximum Performance",
            description:
                "With assigned servers, you leverage the full power of all available RAM and CPU resources, ensuring your website or application operates at peak performance.",
        },
        {
            icon: <Shield className="w-6 h-6 text-green-500" />,
            title: "Enhanced Security",
            description:
                "Dedicated servers offer a fortress of security. Since the server is not shared with others, the risk of security breaches from neighboring sites is minimized.",
        },
        {
            icon: <Key className="w-6 h-6 text-purple-500" />,
            title: "Complete Control",
            description:
                "Gain root/admin access to the server and enjoy unparalleled control over configurations, installations, and security settings.",
        },
        {
            icon: <Settings className="w-6 h-6 text-yellow-500" />,
            title: "Customization",
            description:
                "Install any software and tools to meet your specific requirements, tailoring the server environment to your exact needs.",
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-red-500" />,
            title: "Reliability",
            description:
                "With no shared neighbors, you experience unparalleled reliability as your site's performance is not impacted by other users.",
        },
    ];

    const points = [
        "Assess your website's traffic and resource requirements to choose the right server specifications.",
        "Ensure the hosting provider offers robust security features and compliance standards.",
        "Check for scalability options to handle future growth without downtime.",
        "Evaluate the level of technical support and maintenance services provided.",
        "Compare pricing plans to find a cost-effective solution that meets your budget."
    ];

    return (
        <div className="font-poppins">
            {/* hero section */}
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

                <div className="relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

                    {/* Left Column */}
                    <div className="lg:w-1/2 text-white space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
                            Dedicated Server India
                        </h2>

                        <p className="text-gray-300 text-base leading-relaxed">
                            Our dedicated server technology expertise is at your disposal. Host your resource-intensive website, configure it to fit your needs, or run it on a scalable infrastructure.
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
                </div>
            </section>

            {/* pricing section */}
            <DedicatedServerPricing />

            {/* add storgage scetion  */}
            <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
                <div className="max-w-7xl mx-auto">
                    <AddOnStorageTable />
                </div>
            </section>

            {/* benifits */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Benefits of Dedicated Servers
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            Dedicated server hosting is the essence of web hosting distinction, involving the rental of a complete physical server dedicated simply to your web projects.
                            This allows you to bring the full benefits of complete resource dedication, ensuring unparalleled performance and reliability.
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefitsData.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex items-start gap-4"
                            >
                                <div className="flex-shrink-0">{benefit.icon}</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                    <p className="text-gray-700">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* features */}
            <section className="py-16 bg-gray-50">
                <DedicatedServerFeatures />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Choosing a Dedicated Host
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            Important considerations to ensure your dedicated hosting provides maximum performance and reliability.
                        </p>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-6 max-w-3xl mx-auto text-gray-800 text-lg">
                        {points.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex-shrink-0 mt-1 w-6 h-6 text-white bg-blue-600 rounded-full flex items-center justify-center font-bold">
                                    {index + 1}
                                </span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Conclusion */}
                    <div className="mt-12 text-center">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Conclusion
                        </h3>
                        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
                            Assigned servers provide an unequalled mixture of performance and control. They are the essence of web hosting for high-traffic websites with compliance requirements. For those undertaking a digital journey that demands unrelenting performance and complete control, start exploring dedicated servers today and <span className="font-semibold text-blue-600">contact us for more!</span>
                        </p>
                    </div>
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