import { useState, useEffect } from 'react';
import { FaHeadset } from 'react-icons/fa';
import { Button } from "@/components/ui/button";

interface Service {
  id: number;
  name: string;
  description: string | null;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  features: string[];
  priority: string;
  ram: string;
  storage: string;
}

export const BusyOnCloudPricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/services/category-type/5');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const services: Service[] = data.data;

        // Sort services by priority: LOW, HIGH, MEDIUM (left, middle, right)
        const sortedServices = [...services].sort((a, b) => {
          const priorityOrder = { 'LOW': 0, 'HIGH': 1, 'MEDIUM': 2 };
          return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
        });

        const transformedPlans = sortedServices.map((service, index) => ({
          name: service.name,
          tagline: service.description || 'No description available',
          logo: index === 0 ? "https://www.hostingsafari.com/assets/img/customers/busy-1.webp" :
                index === 1 ? "https://www.hostingsafari.com/assets/img/customers/busy-4.webp" :
                "https://www.hostingsafari.com/assets/img/customers/busy-3.webp",
          price: {
            monthly: service.monthlyPrice || 0,
            yearly: service.yearlyPrice || 0
          },
          features: service.features,
          popular: service.priority === 'HIGH'
        }));

        setPlans(transformedPlans);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading pricing plans: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Busy on Cloud Plans</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan that fits your business requirements.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex mt-6 bg-gray-100 rounded-xl p-1">
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition
              ${billingCycle === 'monthly' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition
              ${billingCycle === 'yearly' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition
              ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}
          >
            <img
              src={plan.logo}
              alt={`${plan.name} logo`}
              className="w-20 h-20 object-contain mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-gray-600 mb-4">{plan.tagline}</p>
            <div className="text-center mb-4">
              <span className="text-3xl font-bold">₹{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}</span>
              <span className="text-gray-500 ml-1">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-6 text-gray-700 text-sm">
              {plan.features.map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              className={`w-full py-3 ${plan.popular ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
              onClick={() => window.location.href = '/get-in-touch'}
            >
              Contact Us
            </Button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-600">
        <p className="flex items-center justify-center gap-2">
          <FaHeadset className='text-blue-900' /> We're Here to Help You
        </p>
        <p className="mt-2 text-sm">
          Have questions? <span className="text-orange-500 cursor-pointer">Chat with us</span> or email us.
        </p>
      </div>
    </div>
  );
};
