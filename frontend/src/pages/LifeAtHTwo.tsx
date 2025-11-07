import { GetinTouch } from "@/components/GetInTouchForm";
import { Mail, PhoneCall } from "lucide-react";

export default function LifeAtHtwo() {
    const contactData = [
        {
            title: "Pre-Sales Questions",
            email: "sales@htwo.cloud",
            phone: "+91-8076225440"
        },
        {
            title: "Sales",
            email: "sales@htwo.cloud",
            phone: "011-8595327337"
        },
        {
            title: "Support",
            email: "info@htwo.cloud",
            phone: "+91-8595515765"
        }
    ];

    return (
        <div className="min-h-screen bg-white font-poppins">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden py-20 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold pb-5">
                        Get in Touch with HTwo
                    </h1>
                    <p className="text-sm md:text-base">
                        Have a question? Send us a note using the form below and someone
                        from the team will get in
                        <br />
                        touch with you soon.
                    </p>
                </div>
            </section>

            {/* Contact Form Section */}
            <div className="w-full flex justify-center items-center py-10 px-4">
                <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <GetinTouch />
                </div>
            </div>

            <section className="flex flex-col md:flex-row justify-between items-stretch gap-6 px-6 md:px-10 py-10">
                {contactData.map((item, index) => (
                    <div key={index} className="flex-1 bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h2>
                        <p className="flex items-center text-gray-600 mb-2">
                            <Mail className="w-5 h-5 mr-2 text-gray-500" />
                            <a href={`mailto:${item.email}`} className="hover:underline">
                                {item.email}
                            </a>
                        </p>
                        <p className="flex items-center text-gray-600">
                            <PhoneCall className="w-5 h-5 mr-2 text-gray-500" />
                            <a href={`tel:${item.phone}`} className="hover:underline">
                                {item.phone}
                            </a>
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
}
