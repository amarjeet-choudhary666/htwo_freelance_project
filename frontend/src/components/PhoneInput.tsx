import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
}

const PhoneInput = ({ 
  onChange, 
  placeholder = "Enter phone number", 
  className = "",
  required = false,
  id,
  name
}: PhoneInputProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // Popular countries to show first
  const popularCountries = ['IN', 'US', 'GB', 'CA', 'AU'];

  useEffect(() => {
    // Fetch countries from REST Countries API
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag');
        const data = await response.json();
        
        const formattedCountries: Country[] = data
          .filter((country: any) => country.idd?.root && country.idd?.suffixes?.[0])
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            dial_code: country.idd.root + (country.idd.suffixes[0] || ''),
            flag: country.flag
          }))
          .sort((a: Country, b: Country) => {
            // Sort popular countries first
            const aPopular = popularCountries.indexOf(a.code);
            const bPopular = popularCountries.indexOf(b.code);
            
            if (aPopular !== -1 && bPopular !== -1) {
              return aPopular - bPopular;
            }
            if (aPopular !== -1) return -1;
            if (bPopular !== -1) return 1;
            
            return a.name.localeCompare(b.name);
          });

        setCountries(formattedCountries);
        
        // Set India as default
        const defaultCountry = formattedCountries.find(c => c.code === 'IN') || formattedCountries[0];
        setSelectedCountry(defaultCountry);
      } catch (error) {
        console.error('Error fetching countries:', error);
        // Fallback to some popular countries
        const fallbackCountries: Country[] = [
          { name: 'India', code: 'IN', dial_code: '+91', flag: '🇮🇳' },
          { name: 'United States', code: 'US', dial_code: '+1', flag: '🇺🇸' },
          { name: 'United Kingdom', code: 'GB', dial_code: '+44', flag: '🇬🇧' },
          { name: 'Canada', code: 'CA', dial_code: '+1', flag: '🇨🇦' },
          { name: 'Australia', code: 'AU', dial_code: '+61', flag: '🇦🇺' }
        ];
        setCountries(fallbackCountries);
        setSelectedCountry(fallbackCountries[0]);
      }
    };

    fetchCountries();
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Only allow digits
    
    if (inputValue.length <= 10) {
      setPhoneNumber(inputValue);
      
      // Validate phone number
      if (inputValue.length > 0 && inputValue.length < 10) {
        setError('Phone number must be exactly 10 digits');
      } else if (inputValue.length === 10) {
        setError('');
      } else {
        setError('');
      }
      
      // Update parent component with full phone number
      const fullNumber = selectedCountry ? `${selectedCountry.dial_code}${inputValue}` : inputValue;
      onChange(fullNumber);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    
    // Update parent with new country code
    const fullNumber = `${country.dial_code}${phoneNumber}`;
    onChange(fullNumber);
  };

  return (
    <div className="relative">
      <div className={`flex h-9 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent ${className}`}>
        {/* Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-1 sm:px-2 h-full border-r border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors rounded-l-md"
          >
            <span className="mr-1 text-xs sm:text-sm">{selectedCountry?.flag}</span>
            <span className="text-xs font-medium text-gray-700 hidden sm:inline">{selectedCountry?.dial_code}</span>
            <span className="text-xs font-medium text-gray-700 sm:hidden">{selectedCountry?.dial_code?.slice(0, 3)}</span>
            <ChevronDown className="w-3 h-3 ml-1 text-gray-500" />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-50 w-72 sm:w-80 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="mr-2 sm:mr-3 text-sm sm:text-lg">{country.flag}</span>
                  <span className="flex-1 text-xs sm:text-sm truncate">{country.name}</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-500 ml-2">{country.dial_code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          id={id}
          name={name}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          required={required}
          className="flex-1 px-2 sm:px-3 text-xs sm:text-sm focus:outline-none rounded-r-md h-full"
          maxLength={10}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default PhoneInput;