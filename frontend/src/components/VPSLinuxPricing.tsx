import { useState } from 'react';
import { Server } from 'lucide-react';
import { Button } from "@/components/ui/button"; // ShadCN Button
import { FaHeadset } from 'react-icons/fa';

export default function VPSPricingTable() {
    const [activeTab, setActiveTab] = useState('non-ha');

    const nonHAPlans = [
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v2', ram: 4, cores: 2, storage: 30, speed: 'Upto 3.00 GHZ', bandwidth: '1 TB', price: 740 },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 8, cores: 4, storage: 100, speed: 'Upto 3.00 GHZ', bandwidth: '1 TB', price: 850 },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 12, cores: 4, storage: 100, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: 1250, featured: true },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 12, cores: 8, storage: 100, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: 1550 },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 16, cores: 8, storage: 200, speed: 'Upto 3.00 GHZ', bandwidth: '1 TB', price: 1850 },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 24, cores: 8, storage: 150, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: 2050 },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 32, cores: 8, storage: 200, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: 2350 },
    ];

    const haPlans = [
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 10, cores: 2, storage: 100, speed: 'Upto 3.00 GHZ', bandwidth: '1 TB', price: '2999/-' },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 10, cores: 4, storage: 100, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: '3399/-' },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 12, cores: 4, storage: 100, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: '4199/-', featured: true },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 12, cores: 6, storage: 100, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: '4999/-' },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 16, cores: 6, storage: 100, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: '6099/-' },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 24, cores: 6, storage: 150, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: '7999/-' },
        { processor: 'E2136 / E2236 / E5-1650v3 / E5-2643v3', ram: 32, cores: 8, storage: 200, speed: 'Upto 3.30 GHZ', bandwidth: '1 TB', price: '10699/-' },
    ];

    const currentPlans = activeTab === 'non-ha' ? nonHAPlans : haPlans;
    const isHA = activeTab === 'ha';

    return (
        <div className="min-h-screen bg-white text-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <Server className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                    <h1 className="text-4xl font-bold mb-2">VPS Linux Plans</h1>
                    <p className="text-lg text-gray-700">Server Pricing That Makes Sense: Flexible and Predictable</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 rounded-lg p-1 inline-flex shadow-sm">
                        <Button
                            variant={activeTab === 'non-ha' ? 'default' : 'outline'}
                            className={activeTab === 'non-ha' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-800 hover:bg-gray-200 hover:text-blue-600'}
                            onClick={() => setActiveTab('non-ha')}
                        >
                            NON-HA SOLUTION
                        </Button>
                        <Button
                            variant={activeTab === 'ha' ? 'default' : 'outline'}
                            className={activeTab === 'ha' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-800 hover:bg-gray-200 hover:text-blue-600'}
                            onClick={() => setActiveTab('ha')}
                        >
                            HIGH AVAILABILITY
                        </Button>
                    </div>
                </div>

                {/* Pricing Table */}
                <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
                    <table className="w-full">
                        <thead className="bg-gray-100 text-gray-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Processor Model</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold">RAM (GB)</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold">Logical vCores</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold">Storage - SSD/NVME</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold">Clock Speed</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold">Bandwidth</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold">Price/Month</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentPlans.map((plan, index) => (
                                <tr key={index} className={`hover:bg-gray-50 transition-colors ${plan.featured ? 'bg-blue-50' : ''}`}>
                                    <td className="px-4 py-3 text-sm font-medium">{plan.processor}</td>
                                    <td className="px-4 py-3 text-sm text-center">{plan.ram}</td>
                                    <td className="px-4 py-3 text-sm text-center">{plan.cores}</td>
                                    <td className="px-4 py-3 text-sm text-center">{plan.storage}</td>
                                    <td className="px-4 py-3 text-sm text-center">{plan.speed}</td>
                                    <td className="px-4 py-3 text-sm text-center">{plan.bandwidth}</td>
                                    <td className="px-4 py-3 text-sm text-center font-bold text-blue-700">₹ {plan.price}</td>
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
                        <div>✓ 99.9% Uptime Guarantee</div>
                        <div>✓ 24/7 Technical Support</div>
                        <div>✓ DDoS Protection</div>
                        <div>✓ Full Root Access</div>
                        <div>✓ {isHA ? '15 Days Snapshot Backup' : 'No Backup Snapshot'}</div>
                        <div>✓ Data Center Tier {isHA ? 'IV' : 'III'}</div>
                    </div>
                </div>

                {/* Bottom Note */}
                <section>
                    <div className="text-center mt-12">
                        <h1 className="flex items-center justify-center gap-2 text-lg font-semibold py-3">
                            <FaHeadset className="text-blue-800" />
                            We're Here to Help You
                        </h1>
                        <p className="text-xs">Have some questions?<span className="text-orange-500">Chat with us now,</span>or send us an email to get in touch.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}