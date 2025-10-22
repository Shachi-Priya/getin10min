import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Add Google Font
const fontLink =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';

const PROJECTS = [
  {
    slug: 'cartkoro',
    title: 'CartKoro',
    url: 'https://www.cartkoro.com/',
    desc: 'A blazing fast e-commerce platform with smart product browsing, minimal checkout friction, and elegant modern UX designed for higher conversions.',
    images: [
      '/portfolio/cartkoro/01.png',
      '/portfolio/cartkoro/02.png',
      '/portfolio/cartkoro/03.png',
    ],
  },
  {
    slug: 'restaurant-order',
    title: 'Table Order & Booking',
    url: 'https://restaurant-order-booking-jet.vercel.app/?tableNo=7',
    desc: 'A smooth, mobile-first table ordering system that simplifies reservations and integrates real-time order updates for restaurants.',
    images: [
      '/portfolio/restaurant-order/1.png',
      '/portfolio/restaurant-order/2.png',
      '/portfolio/restaurant-order/3.png',
    ],
  },
  {
    slug: 'royal-krishna-coaching',
    title: 'Royal Krishna Coaching',
    url: 'https://royal-krishna-coaching.vercel.app/',
    desc: 'An education site featuring dynamic content sections, detailed program listings, and a lightweight motion-enhanced UI.',
    images: [
      '/portfolio/royal-krishna-coaching/1.png',
      '/portfolio/royal-krishna-coaching/2.png',
      '/portfolio/royal-krishna-coaching/3.png',
    ],
  },
  {
    slug: 'neovatech',
    title: 'Neovatech',
    url: 'https://www.neovatech.in/',
    desc: 'Corporate landing with bold gradients, animated sections, and a tech-forward visual identity for modern B2B impact.',
    images: [
      '/portfolio/neovatech/1.png',
      '/portfolio/neovatech/2.png',
      '/portfolio/neovatech/3.png',
    ],
  },
  {
    slug: 'mahadev-tours',
    title: 'Mahadev Tours & Travels',
    url: 'https://mahadevtourandtravelspatna.com/',
    desc: 'Responsive travel platform with destination visuals, easy inquiries, and refined color system for trust and clarity.',
    images: [
      '/portfolio/mahadev-tours/1.png',
      '/portfolio/mahadev-tours/2.png',
      '/portfolio/mahadev-tours/3.png',
    ],
  },
  {
    slug: 'expocity',
    title: 'Expocity',
    url: 'https://expocity.vercel.app/',
    desc: 'Event and expo hub with smooth scrolling sections, motion hero, and fast-loading static generation for SEO.',
    images: [
      '/portfolio/expocity/1.png',
      '/portfolio/expocity/2.png',
      '/portfolio/expocity/3.png',
    ],
  },
];

function useAutoSlide(length, delay = 2800) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % length), delay);
    return () => clearInterval(t);
  }, [length, delay]);
  return [idx, setIdx];
}

function ProjectCard({ p, expanded, onExpand }) {
  const [slide, setSlide] = useAutoSlide(p.images.length);
  const current = useMemo(
    () => p.images[slide] ?? p.images[0],
    [p.images, slide]
  );

  return (
    <motion.div
      layout
      className="card overflow-hidden group"
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'tween', duration: 0.25 }}
    >
      <div className="relative h-40 md:h-44 lg:h-48">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0.0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Image
              src={current}
              alt={p.title}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              style={{ objectFit: 'cover' }}
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-2 right-3 flex gap-1.5">
          {p.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition ${
                i === slide ? 'w-4 bg-cyan-300' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold tracking-tight">{p.title}</h3>
          <Link href={p.url} target="_blank" className="link whitespace-nowrap">
            Visit →
          </Link>
        </div>

        <p className="text-slate-300 text-sm mt-1 line-clamp-2">{p.desc}</p>

        <div className="mt-4 flex items-center justify-between">
          <button className="btn btn-ghost text-sm" onClick={onExpand}>
            View details
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="px-5 pb-5"
          >
            <p className="mt-2 text-sm text-slate-200">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={p.url} target="_blank" className="btn btn-primary">
                Open live project
              </Link>
              <button className="btn btn-ghost" onClick={onExpand}>
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Portfolio() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <Head>
        <title>Portfolio — getin10min</title>
        <link rel="stylesheet" href={fontLink} />
      </Head>

      {/* full-page gradient background */}
      <div
        className="min-h-screen w-full"
        style={{
          background: `
            linear-gradient(160deg, #0f172a 0%, #1e293b 35%, #0b1220 70%, #020617 100%)
          `,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <section className="section container-tight">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-slate-100"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            Portfolio
          </motion.h1>

          <motion.p
            className="mt-2 text-slate-300 max-w-xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            A showcase of real-world projects built for speed, design
            consistency, and business impact — crafted with precision and
            polish.
          </motion.p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.slug}
                p={p}
                expanded={openIndex === i}
                onExpand={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
