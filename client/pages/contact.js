import Head from 'next/head'
import ContactForm from '@/components/ContactForm'

export default function Contact(){
  return (
    <>
      <Head><title>Contact — getin10min</title></Head>
      <section className="section container-tight">
        <h1 className="text-4xl font-bold">Request a quote</h1>
        <p className="mt-2 text-slate-300">Fill the form and we will contact you via email. The brand name "getin10min" is just a name—quality takes thoughtful time.</p>
        <div className="mt-8">
          <ContactForm emailProvider="emailjs" />
        </div>
      </section>
    </>
  )
}
