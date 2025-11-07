import BusinessEmailCards from "@/components/EmailFeatures";
import FreeDemoForm from "@/components/FreeDemoForm";
import { Link } from "react-router-dom";

export function EmailSolutions() {
    return (
        <div>
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900  relative overflow-hidden py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

                    {/* Left Column */}
                    <div className="lg:w-1/2 text-white space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug">
                            Professional Email Solutions
                        </h2>

                        <p className="text-gray-300 text-base leading-relaxed">
                            Choose the best email service for your business
                        </p>

                        <p className="text-gray-300 text-base leading-relaxed">
                            Secure, reliable, and professional email solutions
                        </p>
                        <div className="flex gap-4">
                            <Link to="/email/google-workspace" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition shadow-md">
                                Google Workspace
                            </Link>
                            <Link to="/email/business-zimbra" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition shadow-md">
                                Zimbra Email
                            </Link>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="lg:w-1/2 w-full  p-8 rounded-xl">
                        <FreeDemoForm />
                    </div>
                </div>
            </section>

            <section>
                <BusinessEmailCards />
            </section>
        </div>
    )
}