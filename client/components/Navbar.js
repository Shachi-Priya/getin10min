// import Link from 'next/link';
// import Image from 'next/image';
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const nav = (
//     <ul className="flex flex-col md:flex-row gap-6 items-start md:items-center">
//       {['Home', 'Services', 'Portfolio', 'Pricing', 'Contact'].map((n) => (
//         <li key={n}>
//           <Link
//             href={n === 'Home' ? '/' : `/${n.toLowerCase()}`}
//             className="hover:text-cyan-300"
//           >
//             {n}
//           </Link>
//         </li>
//       ))}
//       <li>
//         <Link href="/contact" className="btn btn-primary">
//           Book a free call
//         </Link>
//       </li>
//     </ul>
//   );

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/70 border-b border-slate-800">
//       <div className="container-tight flex items-center justify-between py-4">
//         <Link href="/" className="flex items-center gap-3">
//           <Image
//             alt="getin10min"
//             src="/minlogo.png"
//             width={140}
//             height={32}
//             priority
//           />
//           <span className="sr-only">getin10min</span>
//         </Link>

//         <nav className="hidden md:block">{nav}</nav>

//         <button
//           className="md:hidden btn btn-ghost"
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle menu"
//         >
//           ☰
//         </button>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="md:hidden border-t border-slate-800 bg-slate-900/80"
//           >
//             <div className="container-tight py-6">{nav}</div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const itemVariants = {
  initial: { y: 6, opacity: 0 },
  animate: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.03, duration: 0.25 },
  }),
};

function NavItem({ href, label, index }) {
  return (
    <motion.li
      custom={index}
      variants={itemVariants}
      initial="initial"
      animate="animate"
      className="group relative"
    >
      <Link
        href={href}
        className="inline-flex items-center text-sm md:text-base transition"
      >
        <span
          className="
            transition
            group-hover:text-cyan-300
            group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]
          "
        >
          {label}
        </span>
        {/* underline reveal */}
        <span
          className="
            pointer-events-none absolute -bottom-1 left-0 h-px w-0
            bg-gradient-to-r from-cyan-300/80 to-cyan-300/0
            transition-all duration-300 ease-out
            group-hover:w-full
          "
        />
      </Link>
    </motion.li>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const items = ['Home', 'Services', 'Portfolio', 'Pricing', 'Contact'];

  const nav = (
    <ul className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      {items.map((n, i) => (
        <NavItem
          key={n}
          index={i}
          label={n}
          href={n === 'Home' ? '/' : `/${n.toLowerCase()}`}
        />
      ))}
      <motion.li
        variants={itemVariants}
        initial="initial"
        animate="animate"
        custom={items.length}
      >
        <Link href="/contact" className="btn btn-primary shadow-soft">
          Book a free call
        </Link>
      </motion.li>
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/60 border-b border-slate-800">
      <div className="container-tight flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            alt="getin10min"
            src="/minlogo2.png"
            width={112} // smaller logo
            height={26}
            priority
            className="opacity-95 hover:opacity-100 transition"
          />
          <span className="sr-only">getin10min</span>
        </Link>

        {/* desktop nav with premium hover */}
        <nav className="hidden md:block">{nav}</nav>

        {/* mobile menu button */}
        <button
          className="md:hidden btn btn-ghost"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* mobile dropdown with soft glass + staggered items */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden border-t border-slate-800 bg-slate-900/75"
          >
            <motion.div
              className="container-tight py-6"
              initial="initial"
              animate="animate"
            >
              {nav}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
