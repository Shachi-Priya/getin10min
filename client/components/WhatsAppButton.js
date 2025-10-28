import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/8801540670260"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center 
                 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-400 to-indigo-400 
                 shadow-[0_0_25px_rgba(56,189,248,0.3)] 
                 hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] 
                 transition-all duration-500 backdrop-blur-md"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="#0f172a"
        width="22"
        height="22"
      >
        <path d="M16.1 4C9.8 4 4.7 9.1 4.7 15.4c0 2.5.8 4.8 2.1 6.8l-1.4 5.2 5.3-1.4c1.9 1.2 4.1 1.8 6.4 1.8 6.3 0 11.4-5.1 11.4-11.4S22.4 4 16.1 4zm0 20.7c-1.9 0-3.7-.6-5.2-1.7l-.4-.3-3.1.8.8-3.1-.3-.4c-1.1-1.6-1.7-3.4-1.7-5.3 0-5.2 4.3-9.5 9.5-9.5 5.2 0 9.5 4.3 9.5 9.5s-4.3 9.5-9.5 9.5zm5.3-7.2c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1c-.8-.3-2.8-1.1-4.2-3-.3-.4-.4-.7-.3-.9.1-.2.3-.5.5-.7.1-.1.2-.3.3-.4.1-.1.1-.2.1-.3 0-.1 0-.2 0-.3-.1-.3-.8-2.1-1.1-2.8-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.9 2.4 1 2.5c.1.1 1.8 3.2 4.7 4.5.7.3 1.3.6 1.8.7.8.3 1.5.3 2.1.2.6-.1 1.8-.8 2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </motion.a>
  );
}
