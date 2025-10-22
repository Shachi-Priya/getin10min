import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(cur);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    setTheme(next);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={toggle}
      aria-label="Toggle theme"
      className="btn btn-ghost text-sm gap-2"
      style={{ backdropFilter: 'blur(8px)' }}
      title="Toggle light/dark"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </motion.button>
  );
}
