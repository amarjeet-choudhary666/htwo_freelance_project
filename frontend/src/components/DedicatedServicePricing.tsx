import { useState } from 'react';
import { Server } from 'lucide-react';
import { Button } from "@/components/ui/button"; // ShadCN Button

export default function DedicatedServerPricing() {
  const [activeTab, setActiveTab] = useState('amd');

  const amdServers = [
    { processor: '2x AMD EPYC 7282', cores: '32C', threads: '64T', speed: '≥ 2.8 GHz', ram: '256 GB', primary: '2 x 3.84 TB NVME', secondary: 'Add-On', raid: 'Included', price: '22,000' },
    { processor: 'AMD EPYC 7k62', cores: '48C', threads: '96T', speed: '≥ 2.40 GHz', ram: '256 GB', primary: '2x3.84 TB SSD', secondary: 'Add-On', raid: 'Included', price: '24,999' },
    { processor: '2x AMD EPYC 7k62', cores: '96C', threads: '192T', speed: '≥ 2.6 GHz', ram: '256 GB', primary: '3.2 TB NVME', secondary: 'Add-On', raid: 'Included', price: '29,999' },
    { processor: '2x AMD EPYC 7k62', cores: '96C', threads: '192T', speed: '≥ 3.3 GHz', ram: '512 GB', primary: '2 x 3.2TB NVME', secondary: 'Add-On', raid: 'Included', price: '33,999' }
  ];

  const intelServers = [
    { processor: '2 x Intel Xeon E5-2670-V3', cores: '24C', threads: '48T', speed: '≥ 2.30 GHz', ram: '64 GB', primary: '2 x 480 GB SSD', secondary: 'Add-On', raid: 'Included', price: '5,999' },
    { processor: '2 x Intel Xeon E5-2680 V4', cores: '28C', threads: '56T', speed: '≥ 2.40 GHz', ram: '64 GB', primary: '2 x 480 GB SSD', secondary: 'Add-On', raid: 'Included', price: '6,999' },
    { processor: 'Intel Xeon Gold 6132', cores: '14C', threads: '28T', speed: '≥ 3.70 GHz', ram: '64 GB', primary: '3 x 480 GB SSD', secondary: 'Add-On', raid: 'Included', price: '8,999' },
    { processor: '2 x Intel Xeon Gold 6132', cores: '28C', threads: '56T', speed: '≥ 2.60 GHz', ram: '128 GB', primary: '3 x 480 GB SSD', secondary: 'Add-On', raid: 'Included', price: '12,999' },
    { processor: 'Intel Xeon Gold 6154', cores: '18C', threads: '36T', speed: '≥ 3.70 GHz', ram: '256 GB', primary: '1 TB SSD', secondary: 'Add-On', raid: 'Included', price: '12,999' },
    { processor: 'Intel Xeon Gold 2 x 6154', cores: '36C', threads: '72T', speed: '≥ 3.70 GHz', ram: '256 GB', primary: '3x800 GB SAS SSD', secondary: 'Add-On', raid: 'Included', price: '19,999' }
  ];

  const servers = activeTab === 'amd' ? amdServers : intelServers;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Server className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold mb-2">Dedicated Server Plans</h1>
          <p className="text-lg text-gray-700">Server Pricing That Makes Sense: Flexible and Predictable</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1 inline-flex shadow-sm">
            <Button 
              variant={activeTab === 'amd' ? 'default' : 'outline'} 
              className={activeTab === 'amd' ? 'bg-blue-600 text-white' : 'text-gray-800'}
              onClick={() => setActiveTab('amd')}
            >
              AMD EPYC Servers
            </Button>
            <Button 
              variant={activeTab === 'intel' ? 'default' : 'outline'} 
              className={activeTab === 'intel' ? 'bg-blue-600 text-white' : 'text-gray-800'}
              onClick={() => setActiveTab('intel')}
            >
              Intel Xeon Servers
            </Button>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Processor Model</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Physical Cores</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Logical vCores</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Clock Speed</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">RAM (GB)<br/>2999 MHz</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Primary Drive</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Secondary Drive</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">RAID Card</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Price/Month</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {servers.map((server, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{server.processor}</td>
                  <td className="px-4 py-3 text-sm text-center">{server.cores}</td>
                  <td className="px-4 py-3 text-sm text-center">{server.threads}</td>
                  <td className="px-4 py-3 text-sm text-center">{server.speed}</td>
                  <td className="px-4 py-3 text-sm text-center">{server.ram}</td>
                  <td className="px-4 py-3 text-sm text-center">{server.primary}</td>
                  <td className="px-4 py-3 text-sm text-center">{server.secondary}</td>
                  <td className="px-4 py-3 text-sm text-center text-green-600 font-medium">{server.raid}</td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-blue-700">₹ {server.price}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
                        onClick={() => window.location.href = '/get-in-touch'}
                      >
                        Contact Us
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Features Footer */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Plans Include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-800">
            <div>✓ RAID Card Included</div>
            <div>✓ Secondary Drive Add-On Available</div>
            <div>✓ 99.9% Uptime Guarantee</div>
            <div>✓ 24/7 Technical Support</div>
            <div>✓ DDoS Protection</div>
            <div>✓ Full Root Access</div>
          </div>
        </div>
      </div>
    </div>
  );
}
