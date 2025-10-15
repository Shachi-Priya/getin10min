import Head from 'next/head'
import { motion } from 'framer-motion'

const services = [
  { t: 'Static Websites', d: 'Best for portfolios, landing pages, and simple company sites.' },
  { t: 'Dynamic Websites', d: 'Admin panels, blogs, gated content, dashboards and more.' },
  { t: 'Branding & Graphics', d: 'Logo, color system, social cards, and marketing assets.' },
  { t: 'SEO & Performance', d: 'On-page SEO, lighthouse optimization, analytics setup.' },
  { t: 'Maintenance', d: 'Retainers for content updates, feature adds and monitoring.' },
  { t: 'Integrations', d: 'Forms, payments, CRMs, chat widgets, and automations.' }
]

export default function Services() {
  return (
    <>
      <Head><title>Services — getin10min</title></Head>
      <section className="section container-tight">
        <h1 className="text-4xl font-bold">Services</h1>
        <p className="mt-2 text-slate-300">Everything you need to get online and grow.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {services.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="card p-6">
              <h3 className="font-semibold text-lg">{s.t}</h3>
              <p className="text-slate-300 mt-2">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
