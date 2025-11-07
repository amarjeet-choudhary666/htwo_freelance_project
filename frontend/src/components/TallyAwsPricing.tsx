import { useState, useEffect } from 'react';

interface Service {
  id: number;
  name: string;
  description: string | null;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  features: string[];
  priority: string;
}

export default function TallyOnAwsPricing() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/services/category-type/3');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const services: Service[] = data.success ? data.data : data;

        const transformedPlans = services.map((service) => ({
          name: service.name,
          price: service.monthlyPrice ? `₹${service.monthlyPrice}` : 'Contact Us',
          period: 'month',
          description: service.description || 'No description available',
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
      <div className="min-h-[750px] bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[750px] bg-gray-50 py-12 flex items-center justify-center">
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
    <div className="min-h-[750px] bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tally on AWS Pricing</h2>
          <p className="text-gray-600 text-lg">Choose the perfect plan for your business needs</p>
        </div>

        {/* Pricing Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 max-w-md">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-xl p-6 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white border-2 border-blue-500 shadow-lg'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full font-semibold text-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Contact Us' && <span className="text-gray-600">/{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    plan.popular
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => window.location.href = '/get-in-touch'}
                >
                  Contact Us
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            All plans include AWS infrastructure, automatic updates, and 24/7 monitoring.
            <span className="text-blue-600 font-semibold"> Annual plans save up to 20%!</span>
          </p>
        </div>
      </div>
    </div>
  );
}