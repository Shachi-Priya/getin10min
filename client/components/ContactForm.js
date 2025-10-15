import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState('idle');
  const [plan, setPlan] = useState('static');
  const formRef = useRef();

  useEffect(() => {
    if (router.query.plan) setPlan(router.query.plan);
  }, [router.query.plan]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS env vars');
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          plan,
          user_name: e.target.name.value,
          user_email: e.target.email.value,
          user_phone: e.target.phone.value || '-',
          message: e.target.message.value || '-'
        },
        { publicKey }
      );

      if (result.status !== 200) throw new Error('EmailJS failed');
      setStatus('success');
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="card p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Full name</label>
          <input name="name" required className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" name="email" required className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3" placeholder="you@company.com" />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input name="phone" className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3" placeholder="+91 9xxxxxxxxx" />
        </div>
        <div>
          <label className="block text-sm mb-1">Plan</label>
          <select value={plan} onChange={(e)=>setPlan(e.target.value)} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3">
            <option value="static">Static Website</option>
            <option value="dynamic">Dynamic Website</option>
            <option value="dynamic-seo">Dynamic with SEO</option>
            <option value="complete">Complete Package</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Tell us about your project</label>
        <textarea name="message" rows="5" className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3" placeholder="What do you need? Any references?" />
      </div>
      <button className="btn btn-primary" disabled={status==='loading'}>
        {status==='loading' ? 'Sending...' : 'Send request'}
      </button>
      <p className="text-xs text-slate-400">Powered by EmailJS</p>
      {status==='success' && <p className="text-emerald-400 text-sm">Thanks! We’ll contact you shortly via email.</p>}
      {status==='error' && <p className="text-rose-400 text-sm">Oops, something went wrong. Please try again.</p>}
    </form>
  );
}
