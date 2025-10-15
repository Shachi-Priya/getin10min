import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function HeroCanvas() {
  return (
    <div className="relative h-[420px] md:h-[520px] w-full">
      <Suspense fallback={<div className="absolute inset-0 animate-pulse bg-slate-900/50 rounded-2xl" />}>
        <Scene />
      </Suspense>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute inset-0 flex items-center justify-center text-center px-6"
      >
        <div className="max-w-3xl">
          <span className="badge mb-4">Websites that help your business grow</span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Build modern, fast, and elegant sites with <span className="text-cyan-300">getin10min</span></h1>
          <p className="mt-4 text-slate-300">The name is fun—delivery is smart. We design, develop and iterate rapidly to launch what actually moves your metrics.</p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="/pricing" className="btn btn-primary">See Pricing</a>
            <a href="/contact" className="btn btn-ghost">Request a Quote</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
