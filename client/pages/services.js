// pages/services.js
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Import icons from react-icons (you can swap styles — I used lucide/fi/md mix)
import { FiMonitor, FiSettings, FiTrendingUp, FiTool } from 'react-icons/fi'
import { MdOutlineBrush, MdIntegrationInstructions } from 'react-icons/md'

const services = [
  {
    t: 'Static Websites',
    d: 'Lightning-fast brochure sites for portfolios, launches, and simple company pages.',
    bullets: ['Modern, responsive layouts', 'SEO-ready markup', 'Deployed in days'],
    icon: <FiMonitor className="text-cyan-400 text-3xl" />,
    cta: { href: '/pricing#customizer', label: 'Start with a static site' },
  },
  {
    t: 'Dynamic Websites',
    d: 'Powerful, data-driven apps — dashboards, blogs, gated content, and portals.',
    bullets: ['Auth & roles', 'Forms, CRUD & search', 'Analytics built-in'],
    icon: <FiSettings className="text-cyan-400 text-3xl" />,
    cta: { href: '/pricing#customizer', label: 'Scope a dynamic build' },
  },
  {
    t: 'Branding & Graphics',
    d: 'Standout visuals that match your voice — from logo to on-brand social assets.',
    bullets: ['Logo + color system', 'Web & social templates', 'Hero images & icons'],
    icon: <MdOutlineBrush className="text-cyan-400 text-3xl" />,
    cta: { href: '/pricing#customizer', label: 'Add a brand pack' },
  },
  {
    t: 'SEO & Performance',
    d: 'Be discoverable and fast. We tune technical SEO and Core Web Vitals the right way.',
    bullets: ['Meta, sitemap, schema', 'Lighthouse/CWV fixes', 'Analytics & events'],
    icon: <FiTrendingUp className="text-cyan-400 text-3xl" />,
    cta: { href: '/pricing#customizer', label: 'Optimize my site' },
  },
  {
    t: 'Maintenance',
    d: 'Stay fresh after launch — updates, small features, and proactive monitoring.',
    bullets: ['Monthly updates', 'Bug fixes & QA', 'Performance checks'],
    icon: <FiTool className="text-cyan-400 text-3xl" />,
    cta: { href: '/pricing#customizer', label: 'Pick a support plan' },
  },
  {
    t: 'Integrations',
    d: 'Connect what you use — forms, payments, CRMs, chat, and automations.',
    bullets: ['Stripe / Razorpay', 'HubSpot / Airtable', 'Intercom / Crisp'],
    icon: <MdIntegrationInstructions className="text-cyan-400 text-3xl" />,
    cta: { href: '/pricing#customizer', label: 'Add integrations' },
  },
]

export default function Services() {
  return (
    <>
      <Head><title>Services — getin10min</title></Head>

      <section className="section container-tight">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">Services</h1>
          <p className="mt-2 text-slate-300">
            Everything you need to get online and grow — pick a starting point and tailor it to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {services.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="card p-6 border border-slate-700/50 hover:border-cyan-400/60 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {s.icon}
                  <h3 className="font-semibold text-lg">{s.t}</h3>
                </div>
                <Link
                  href={s.cta.href}
                  className="btn btn-outline btn-xs sm:btn-sm whitespace-nowrap"
                >
                  {s.cta.label}
                </Link>
              </div>

              <p className="text-slate-300 mt-3">{s.d}</p>

              <ul className="mt-4 space-y-2 text-sm">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-slate-300">
                    <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-3 text-xs text-slate-400">
                <span className="badge">Customizable</span>
                <span className="badge">Fast turnaround</span>
                <span className="badge">Transparent pricing</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link href="/pricing#customizer" className="btn btn-primary">
            Build your custom package
          </Link>
          <p className="text-slate-400 text-sm mt-2">
            See live pricing in your currency and pick exactly what you need.
          </p>
        </div>
      </section>
    </>
  )
}
