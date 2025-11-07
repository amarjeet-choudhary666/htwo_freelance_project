"use client";
import FreeDemoForm from "@/components/FreeDemoForm";
import { TrustedByClients } from "@/components/TrustedByClient";
import { Check } from "lucide-react";
import Backup from "../assets/backup.webp"

// ✅ Moved mock data OUTSIDE component
const backupSoftware = [
    {
        name: "Veeam",
        description:
            "Veeam provides all-in-one data protection solutions with support for many platforms and flexible recovery point objectives (RPOs).",
    },
    {
        name: "Commvault",
        description:
            "Commvault offers a robust backup and recovery platform with thousands of SaaS deployments, fulfilling enterprise requirements.",
    },
    {
        name: "Acronis",
        description:
            "Acronis delivers a suite of data protection tools with a strong focus on cybersecurity and data safety.",
    },
];

const backupStrategies = [
    {
        title: "Local Backups",
        description:
            "Create local backups on external hard drives (HDDs) or Network-Attached Storage (NAS) devices for quick access to essential data.",
    },
    {
        title: "Cloud Backups",
        description:
            "Take up cloud backups for external data protection, safe against physical disasters that can affect on-premise backups.",
    },
    {
        title: "Snapshot-Based & Incremental Backups",
        description:
            "Implement snapshot-based and incremental backup solutions to optimize storage usage and backup efficiency.",
    },
    {
        title: "Disk Imaging",
        description:
            "Utilize disk imaging for comprehensive system protection, allowing full system restoration when needed.",
    },
    {
        title: "Testing Recovery Processes",
        description:
            "Regularly test and verify recovery processes to ensure they work properly and minimize surprises during critical situations.",
    },
];

// ✅ Wrapper for consistent sections
const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <section className="max-w-6xl mx-auto py-16 px-6">{children}</section>
);

export function BackupAndRecovery() {
    return (
        <div className="font-poppins">
            {/* ✅ Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
                    <div className="lg:w-1/2 text-white space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
                            Backup & Recovery
                        </h2>
                        <p className="text-gray-300 text-base leading-relaxed">
                            The businesses that migrate their company or move away feeling
                            very comfortable in terms of backup.
                        </p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition shadow-md">
                            Get Started Now
                        </button>
                    </div>

                    <div className="lg:w-1/2 w-full p-8 rounded-xl">
                        <FreeDemoForm />
                    </div>
                </div>
                </div>
            </section>

            {/* ✅ Info Section */}
            <SectionWrapper>
                <div className="flex flex-col lg:flex-row items-center gap-10">
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl font-semibold text-gray-900 pb-6">
                            Backup & Recovery
                        </h1>
                        <p className="text-gray-700 leading-relaxed pb-5">
                            Businesses that migrate their operations to the cloud feel more
                            secure when it comes to backups...
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            The responsibility for protecting a company's data often lies with
                            the organization itself...
                        </p>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <img
                            src={Backup}
                            alt="Backup and Recovery"
                            className="w-full max-w-sm lg:max-w-md object-contain"
                        />
                    </div>
                </div>
            </SectionWrapper>

            {/* ✅ Benefits Section */}
            <SectionWrapper>
                <h1 className="text-4xl font-semibold text-gray-900 pb-6">
                    Benefits of Data Backup & Recovery
                </h1>
                <div className="space-y-5">
                    {[
                        "Prevent business disruption caused by data loss...",
                        "Quickly recover from hardware failures...",
                        "Meet regulatory compliance requirements...",
                        "Enable point-in-time restoration...",
                        "Protect intellectual property and sensitive data...",
                    ].map((text, i) => (
                        <p key={i} className="flex items-start text-gray-700 leading-relaxed">
                            <Check className="text-green-600 mr-2 mt-1" />
                            {text}
                        </p>
                    ))}
                </div>
            </SectionWrapper>

            {/* ✅ Strategies Section */}
            <SectionWrapper>
                <h1 className="text-4xl font-semibold text-gray-900 pb-6">
                    Backup & Recovery Strategies
                </h1>
                <div className="space-y-6">
                    {backupStrategies.map((item, index) => (
                        <div key={index} className="border-l-4 border-blue-600 pl-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {item.title}
                            </h2>
                            <p className="text-gray-700 mt-2 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* ✅ Software Section */}
            <SectionWrapper>
                <h1 className="text-4xl font-semibold text-gray-900 pb-6">
                    Choosing Backup Software
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {backupSoftware.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg border border-gray-200 p-6"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                {item.name}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* ✅ Conclusion Section */}
            <SectionWrapper>
                <h2 className="text-3xl font-semibold text-gray-900 pb-4">
                    Conclusion
                </h2>
                <p className="text-gray-700 leading-relaxed pb-4">
                    A strong Data Backup and Recovery plan is essential for every
                    business...
                </p>
                <p className="text-gray-700 leading-relaxed pb-4">
                    Protect your data, protect your business – it’s your duty...
                </p>
            </SectionWrapper>

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
