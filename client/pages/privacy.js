import Head from 'next/head';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — getin10min</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </Head>

      <div
        className="min-h-screen w-full relative bg-aurora"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <section className="section container-tight">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent drop-shadow">
              Privacy Policy
            </h1>
            <p className="mt-3 text-slate-300/90 max-w-2xl mx-auto">
              We value your privacy. This page outlines how{' '}
              <span className="text-cyan-300 font-medium">getin10min</span>{' '}
              collects, uses, and safeguards your data. Our approach is guided
              by trust, clarity, and security.
            </p>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-10">
            {[
              {
                icon: '📦',
                title: '1. Data We Collect',
                text: `We only collect essential personal data such as your name, email address, and message details — strictly for communication and service delivery.`,
              },
              {
                icon: '💡',
                title: '2. How We Use Information',
                text: `Your data is used exclusively to respond to inquiries, manage projects, and improve our services. We never sell or share your data.`,
              },
              {
                icon: '🍪',
                title: '3. Cookies & Analytics',
                text: `We use cookies to personalize experience and measure performance. You may disable cookies in your browser without affecting core functionality.`,
              },
              {
                icon: '🛡️',
                title: '4. Data Security',
                text: `All information is stored securely with encryption and firewall protection. Only authorized personnel can access sensitive data.`,
              },
              {
                icon: '⚖️',
                title: '5. Your Rights',
                text: `You can request access, correction, or deletion of your data anytime. We comply with global privacy standards (GDPR, CCPA).`,
              },
              {
                icon: '🔗',
                title: '6. Third-Party Services',
                text: `We may use trusted partners (like EmailJS, analytics) that also adhere to international data protection laws.`,
              },
              {
                icon: '🔁',
                title: '7. Policy Updates',
                text: `We update this policy as needed to reflect changes in law or our practices. The latest version is always published here.`,
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-6 border-l border-slate-700/60"
              >
                <div className="card card-premium p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{s.icon}</span>
                    <h2 className="text-xl font-semibold text-cyan-300">
                      {s.title}
                    </h2>
                  </div>
                  <p className="text-slate-300/90 text-sm leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Callout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-16 flex flex-col items-start md:items-center md:text-center"
          >
            <h3 className="text-lg text-slate-300 font-medium">
              Have any privacy concerns?
            </h3>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl
                         bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400
                         text-slate-900 font-semibold px-6 py-2.5 text-sm md:text-base
                         shadow-md hover:brightness-110 hover:-translate-y-[2px]
                         transition-all duration-300"
            >
              📧 Contact Our Team
            </a>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-16 text-slate-500 text-xs md:text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p>
              This Privacy Policy applies to all users of{' '}
              <span className="text-cyan-300">getin10min</span>.
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} getin10min. All rights reserved.
            </p>
          </motion.div>
        </section>
      </div>

      {/* Styling */}
      <style jsx global>{`
        .bg-aurora {
          background: radial-gradient(
              1200px 600px at -10% -10%,
              rgba(56, 189, 248, 0.15),
              transparent 60%
            ),
            radial-gradient(
              900px 500px at 110% 0%,
              rgba(129, 140, 248, 0.12),
              transparent 55%
            ),
            linear-gradient(
              160deg,
              #0f172a 0%,
              #1e293b 35%,
              #0b1220 70%,
              #020617 100%
            );
        }
        .card-premium {
          position: relative;
          background: rgba(15, 23, 42, 0.55);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 1rem;
          backdrop-filter: blur(14px) saturate(130%);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        .card-premium:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(34, 211, 238, 0.2);
        }
      `}</style>
    </>
  );
}
