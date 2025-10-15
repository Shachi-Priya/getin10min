import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = (
    <ul className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      {['Services','Portfolio','Pricing','Contact'].map((n) => (
        <li key={n}>
          <Link href={`/${n.toLowerCase()}`} className="hover:text-cyan-300">{n}</Link>
        </li>
      ))}
      <li>
        <Link href="/contact" className="btn btn-primary">Get quotation</Link>
      </li>
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/70 border-b border-slate-800">
      <div className="container-tight flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image alt="getin10min" src="/logo.svg" width={140} height={32} priority />
          <span className="sr-only">getin10min</span>
        </Link>
        <nav className="hidden md:block">
          {nav}
        </nav>
        <button className="md:hidden btn btn-ghost" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          ☰
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-slate-800 bg-slate-900/80"
          >
            <div className="container-tight py-6">{nav}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
