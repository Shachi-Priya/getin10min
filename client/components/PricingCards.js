import { motion } from 'framer-motion';
import { PLANS } from '../utils/plans';
import Link from 'next/link';

export default function PricingCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PLANS.map((p, idx) => (
        <motion.div
          key={p.key}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: idx * 0.05 }}
          viewport={{ once: true }}
          className={`card p-6 ${p.highlight ? 'ring-2 ring-cyan-400' : ''}`}
        >
          <div className="flex items-center justify-between">
            <span className="badge">{p.badge}</span>
            {p.subtitle && <span className="text-xs text-slate-400">{p.subtitle}</span>}
          </div>
          <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
          <div className="mt-2">
            <span className="line-through text-slate-500 mr-2">{p.price}</span>
            <span className="text-3xl font-extrabold text-cyan-300">{p.sale}</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {p.features.map(([name, ok], i) => (
              <li key={i} className={`flex items-center gap-2 ${ok ? 'text-slate-200' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 inline-flex items-center justify-center rounded-full ${ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {ok ? '✓' : '✕'}
                </span>
                {name}
              </li>
            ))}
          </ul>
          <Link href={`/contact?plan=${p.key}`} className="btn btn-primary w-full mt-6">Get Quotation</Link>
        </motion.div>
      ))}
    </div>
  );
}
