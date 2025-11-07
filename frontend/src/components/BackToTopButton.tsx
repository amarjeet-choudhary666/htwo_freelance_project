import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useManualScrollToTop } from '../hooks/useScrollToTop';

interface BackToTopButtonProps {
  showAfter?: number;
  className?: string;
  smooth?: boolean;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  showAfter = 300,
  className = '',
  smooth = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = useManualScrollToTop({ smooth });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`fixed bottom-24 right-8 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;