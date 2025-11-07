import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import ChatBox from './ChatBox';

const FloatingSupportButtons = () => {
  return (
    <>
      {/* Live Chat */}
      <ChatBox />

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/918595515765"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <FaWhatsapp className="w-6 h-6" />
        <span className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Quick Chat Support
        </span>
      </motion.a>
    </>
  );
};

export default FloatingSupportButtons;