import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Activity, FileText, Briefcase, Calculator } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinux, FaWindowRestore, FaAws, FaMicrosoft, FaHandshake } from 'react-icons/fa';
import { SiSap } from 'react-icons/si';
import { MdEmail, MdOutlineStorage, MdBackup } from 'react-icons/md';
import { FcDataRecovery } from 'react-icons/fc';
import { IoBagSharp } from 'react-icons/io5';
import headerLogo from '../assets/headerlogo1.png';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

interface DropdownItem {
  name: string;
  href?: string;
  icon: React.ComponentType<any>;
  description: string;
  badge?: string;
  hasSubDropdown?: boolean;
  subDropdownItems?: DropdownItem[];
}

interface NavigationItem {
  name: string;
  href?: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const subDropdownTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show header at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false);
        setActiveDropdown(null);
        setIsMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    {
      name: 'Cloud Services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Tally On Cloud', href: '/tally-on-cloud', icon: Calculator, description: 'Tally Prime on secure cloud', badge: 'Popular' },
        { name: 'Tally On AWS', href: '/tally-on-aws', icon: FaAws, description: 'Tally Prime on AWS cloud', badge: 'Popular' },
        { name: 'Tally Prime Application', href: '/tally-prime-application', icon: Activity, description: 'Complete Tally Prime solution', badge: 'Popular' },
        { name: 'Busy On Cloud', href: '/busy-on-cloud', icon: Briefcase, description: 'Busy accounting on cloud', badge: 'Popular' },
        { name: 'Marg On Cloud', href: '/marg-on-cloud', icon: FileText, description: 'Marg ERP on secure cloud', badge: 'Popular' },
        { name: 'Navision/AX On Cloud', href: '/navision-on-cloud', icon: FaMicrosoft, description: 'Microsoft Dynamics on cloud', badge: 'Popular' },
        { name: 'Cloud for SAP B-One', href: '/sap-s4-hana-on-cloud', icon: SiSap, description: 'SAP Business One on cloud', badge: 'Popular' },
      ]
    },
    {
      name: 'Web Hosting',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Linux Hosting', href: '/linuxhosting', icon: FaLinux, description: 'Secure Linux web hosting' },
        { name: 'Windows Hosting', href: '/windowshosting', icon: FaWindowRestore, description: 'Reliable Windows hosting' },
      ]
    },
    { name: 'Dedicated Server', href: '/dedicated-server' },
    {
      name: 'VPS Server',
      hasDropdown: true,
      dropdownItems: [
        { name: 'VPS Linux', href: '/vpslinux', icon: FaLinux, description: 'Linux Virtual Private Server' },
        { name: 'VPS Windows', href: '/vpswindows', icon: FaWindowRestore, description: 'Windows Virtual Private Server' },
      ]
    },
    {
      name: 'Other Services',
      hasDropdown: true,
      dropdownItems: [
        {
          name: 'Email Solution',
          href: '/email',
          icon: MdEmail,
          description: 'Professional email solutions',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Google Workspace', href: '/email/google-workspace', icon: MdEmail, description: 'Professional email from Google' },
            { name: 'Business Email (Zimbra)', href: '/email/business-zimbra', icon: MdEmail, description: 'Zimbra based business email' },
          ]
        },
        { name: 'Storage as Service', href: '/storage-as-a-service', icon: MdOutlineStorage, description: 'Cloud storage solutions' },
        { name: 'Backup & Recovery', href: '/backup-recovery', icon: MdBackup, description: 'Latest updates and insights' },
        { name: 'Disaster Recovery As a Service', href: '/disaster-recovery-as-a-service', icon: FcDataRecovery, description: 'Get in touch' },
      ]
    },
    {
      name: 'Contact Us',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Get in touch', href: '/get-in-touch', icon: FaHandshake, description: 'Get in touch' },
        { name: 'Join As A Partner', href: '/join-as-a-partner', icon: IoBagSharp, description: 'Join our team' }
      ]
    },
  ];

  const dropdownVariants = { hidden: { opacity: 0, y: -10, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 } };
  const mobileMenuVariants = { hidden: { opacity: 0, height: 0 }, visible: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 } };

  return (
    <header className={`bg-white font-poppins fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="group hover:opacity-90 transition-all duration-300 flex items-center">
              <img
                src={headerLogo}
                alt="Htwo Logo"
                className="w-45 h-16  py-1 object-contain transition-transform duration-300 hover:scale-110"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex text-[15px] items-center space-x-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => { setActiveDropdown(null); setActiveSubDropdown(null); }}
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 font-medium transition-all duration-200 rounded-xl ${activeDropdown === item.name ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                  >
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <button
                    className={`flex items-center space-x-1 px-3 py-2 font-medium transition-all duration-200 rounded-xl ${activeDropdown === item.name ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </button>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 text-xs w-96 bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden z-50"
                    >
                      <div className="px-6 py-4 border-b text-lg border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Explore our {item.name.toLowerCase()}</p>
                      </div>
                      <div className="p-2">
                        {item.dropdownItems?.map((dropdownItem) => {
                          const Icon = dropdownItem.icon;
                          return (
                            <motion.div key={dropdownItem.name} whileHover={{ scale: 1.02 }} transition={{ duration: 0.1 }}>
                              <Link
                                to={dropdownItem.href || '#'}
                                className="flex items-start space-x-4 p-4 hover:bg-gray-50/50 rounded-xl transition-all duration-200 group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-xl group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-200">
                                  <Icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{dropdownItem.name}</div>
                                    {dropdownItem.badge && (
                                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${dropdownItem.badge === 'Popular'
                                        ? 'bg-orange-100 text-orange-700'
                                        : dropdownItem.badge === 'New'
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-blue-100 text-blue-700'
                                        }`}>{dropdownItem.badge}</span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">{dropdownItem.description}</div>
                                </div>
                                {dropdownItem.hasSubDropdown && <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90 group-hover:text-blue-600 transition-colors" />}
                              </Link>

                              {/* Nested SubDropdown */}
                              {dropdownItem.hasSubDropdown && activeSubDropdown === dropdownItem.name && (
                                <div
                                  className="ml-4 mt-2 border-l border-gray-200 pl-4"
                                  onMouseEnter={() => clearTimeout(subDropdownTimeoutRef.current!)}
                                  onMouseLeave={() => { subDropdownTimeoutRef.current = setTimeout(() => setActiveSubDropdown(null), 300); }}
                                >
                                  {dropdownItem.subDropdownItems?.map((subItem) => {
                                    const SubIcon = subItem.icon;
                                    return (
                                      <Link
                                        key={subItem.name}
                                        to={subItem.href || '#'}
                                        className="flex items-center space-x-3 p-3 hover:bg-gray-50/50 rounded-xl transition-all duration-200"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <SubIcon className="w-5 h-5 text-blue-600" />
                                        <div>
                                          <div className="font-medium text-gray-900">{subItem.name}</div>
                                          <div className="text-sm text-gray-500">{subItem.description}</div>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <motion.div className="hidden lg:flex items-center space-x-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <SignedOut>
              <SignInButton>
                <Button className="bg-transparent border border-gray-300 cursor-pointer hover:bg-gray-50/50 text-gray-700 shadow-lg hover:shadow-xl px-4 py-2 rounded-xl font-semibold transition-all duration-200">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-transparent border border-blue-500 cursor-pointer hover:bg-blue-50/50 text-blue-600 shadow-lg hover:shadow-xl px-4 py-2 rounded-xl font-semibold transition-all duration-200">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div className="lg:hidden flex items-center space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50/50">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }} className="lg:hidden mt-4 pb-4 border-t border-gray-200 overflow-hidden">
              <div className="flex flex-col space-y-1 pt-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50/50 font-medium transition-all duration-200 rounded-xl"
                        onClick={() => { setIsMenuOpen(false); setActiveDropdown(null); }}
                      >
                        <span>{item.name}</span>
                      </Link>
                    ) : (
                      <button
                        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50/50 font-medium transition-all duration-200 rounded-xl"
                        onClick={() => item.hasDropdown && setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        <span>{item.name}</span>
                        {item.hasDropdown && <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                      </button>
                    )}

                    {/* Mobile Dropdown */}
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="flex flex-col ml-4 mt-2 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <div key={dropdownItem.name}>
                            <Link
                              to={dropdownItem.href || '#'}
                              className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50/50 rounded-xl transition-all duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <span className="flex items-center space-x-2">
                                <dropdownItem.icon className="w-4 h-4 text-blue-600" />
                                <span>{dropdownItem.name}</span>
                              </span>
                              {dropdownItem.hasSubDropdown && <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeSubDropdown === dropdownItem.name ? 'rotate-180' : ''}`} />}
                            </Link>

                            {/* Mobile SubDropdown */}
                            {dropdownItem.hasSubDropdown && activeSubDropdown === dropdownItem.name && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="flex flex-col ml-4 mt-1 space-y-1">
                                {dropdownItem.subDropdownItems?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href || '#'}
                                    className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50/50 roundxl transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <subItem.icon className="w-4 h-4 text-blue-600 mr-2" />
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
