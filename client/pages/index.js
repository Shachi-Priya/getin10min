import Head from 'next/head'
import HeroCanvas from '@/components/HeroCanvas'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <Head>
        <title>getin10min — Modern websites for growing businesses</title>
        <meta name="description" content="We craft fast, beautiful, SEO-friendly websites to help your business grow. Contact us for static and dynamic sites, branding, and more." />
      </Head>
      <section className="section container-tight">
        <HeroCanvas />
      </section>

      <section className="section container-tight">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Why choose getin10min?</h2>
          <p className="mt-3 text-slate-300">The name is catchy, but our focus is on quality. We deliver thoughtful design, clean code, and results.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            ["Lightning-fast", "Next.js + edge caching for speed."],
            ["Pixel-perfect", "Crisp UI with Tailwind & micro-interactions."],
            ["SEO-first", "Best practices baked in from day one."]
          ].map(([t,d],i)=>(
            <motion.div key={i} initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} className="card p-6">
              <h3 className="font-semibold text-lg">{t}</h3>
              <p className="text-slate-300 mt-2">{d}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/pricing" className="btn btn-primary">View Pricing</Link>
        </div>
      </section>
    </>
  )
}
