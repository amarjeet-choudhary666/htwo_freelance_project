import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: 'demo' | 'contact';
}

const SuccessPopup = ({ 
  isOpen, 
  onClose, 
  title = "Thank You for Your Submission!", 
  message = "We will reach out to you within 24 hours.",
}: SuccessPopupProps) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Popup Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative text-center">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex justify-center mb-3"
                >
                  <CheckCircle className="w-12 h-12" />
                </motion.div>
                
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-green-100 text-sm">
                  {message}
                </p>
              </div>

              {/* Simple Action Button */}
              <div className="p-6">
                <Button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopup;