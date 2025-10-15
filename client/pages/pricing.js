import Head from 'next/head'
import PricingCards from '@/components/PricingCards'

export default function Pricing(){
  return (
    <>
      <Head><title>Pricing — getin10min</title></Head>
      <section className="section container-tight">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Pricing</h1>
          <p className="text-slate-300 mt-2">Transparent plans inspired by modern agencies. Pick one and request a tailored quote.</p>
        </div>
        <PricingCards />
      </section>
    </>
  )
}
