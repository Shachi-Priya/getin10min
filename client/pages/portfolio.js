import Head from 'next/head'

const items = Array.from({length:8}).map((_,i)=> ({
  t: `Project ${i+1}`,
  d: 'A modern, responsive website with motion and polish.',
}))

export default function Portfolio(){
  return (
    <>
      <Head><title>Portfolio — getin10min</title></Head>
      <section className="section container-tight">
        <h1 className="text-4xl font-bold">Portfolio</h1>
        <p className="mt-2 text-slate-300">A snapshot of things we can do.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {items.map((it,i)=>(
            <div key={i} className="card overflow-hidden group">
              <div className="h-40 bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 group-hover:from-cyan-400/30 transition"></div>
              <div className="p-5">
                <h3 className="font-semibold">{it.t}</h3>
                <p className="text-slate-300 text-sm mt-1">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
