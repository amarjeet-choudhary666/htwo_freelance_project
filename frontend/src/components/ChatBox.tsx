import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';

const LiveChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can we help you today?", sender: 'agent', time: '10:00 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        text: "Thanks for your message! We'll get back to you shortly.",
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="live-chat-container font-sans">
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-full shadow-lg z-50 cursor-pointer inline-flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={toggleChat}
        role="button"
        aria-label={isChatOpen ? "Close live chat" : "Open live chat"}
      >
        {isChatOpen ? <FaTimes className="w-5 h-5" /> : <FaComments className="w-5 h-5" />}
        <span className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isChatOpen ? "Close Chat" : "Live Chat"}
        </span>
      </motion.div>

      {/* Chat Box */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 h-[400px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <FaUser className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Customer Support</h3>
                  <p className="text-blue-100 text-xs">Online • We're here to help</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
              <div className="flex flex-col space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm break-words ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveChat;
