import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Cpu, Laptop, FileText, Code } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";


export function WhoCanPartner() {
  const navigate = useNavigate();

  const partners = [
    {
      title: "QuickBooks ProAdvisor",
      description: `By hosting QuickBooks Desktop on a cloud server, you can enjoy benefits like remote access, data security, automatic backups, multi-user collaboration, and scalability. QuickBooks Online is cloud-based and allows you to work with clients directly.`,
      icon: <Users className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Certified Public Accountants (CPAs)",
      description: `Cloud servers provide automated backups and disaster recovery, ensuring integrity and availability of critical client data. Scalability allows CPAs to adjust resources based on client needs.`,
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
    },
    {
      title: "Intuit Reselling Partners (IRPs)",
      description: `IRPs should select providers offering reliability, security, performance, scalability, and customer support. Cloud servers enable flexible access to Intuit software, enhanced collaboration, and efficient support.`,
      icon: <Cpu className="w-8 h-8 text-purple-600" />,
    },
    {
      title: "IT Service Providers",
      description: `Cloud servers allow cost optimization via pay-as-you-go models, streamline operations, improve service delivery, and provide Infrastructure as a Service, reducing physical hardware maintenance.`,
      icon: <Laptop className="w-8 h-8 text-red-600" />,
    },
    {
      title: "Accounting Firms",
      description: `Accounting firms should choose providers with reliability, security, compliance, and performance. Cloud servers host accounting software and integrate seamlessly with other cloud tools.`,
      icon: <FileText className="w-8 h-8 text-yellow-600" />,
    },
    {
      title: "Software Companies",
      description: `Software companies leverage cloud servers for scalability, improved performance, and reduced infrastructure management complexity. Cloud hosting supports modern software deployment and CRM tools like Salesforce.`,
      icon: <Code className="w-8 h-8 text-indigo-600" />,
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-20 bg-gray-50 min-h-[800px] text-black">
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">Who Can Partner?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <Card key={index} className="hover:shadow-2xl transition-shadow duration-300 bg-white text-black">
            <CardContent className="flex flex-col items-start gap-4 p-6">
              <div className="mb-2">{partner.icon}</div>
              <h3 className="text-xl font-semibold">{partner.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{partner.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          onClick={() => navigate('/get-in-touch')}
        >
          Get Free Demo
        </Button>
      </div>
    </section>
  );
}
