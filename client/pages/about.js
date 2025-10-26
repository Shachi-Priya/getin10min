import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaUserAstronaut, FaUserTie, FaHandshake } from 'react-icons/fa';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — getin10min</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </Head>

      {/* AURORA BACKDROP */}
      <div
        className="min-h-screen w-full relative bg-aurora"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <section className="section container-tight text-center">
          {/* heading */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent drop-shadow">
              About getin10min
            </span>
          </motion.h1>

          <motion.p
            className="mt-3 text-slate-300/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            We’re a product-focused team building sleek, scalable, and fast web
            applications that empower businesses and delight users.
          </motion.p>

          {/* quick value chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="chip">⚡ Fast Delivery</span>
            <span className="chip">🔒 Full Security</span>
            <span className="chip">🧠 Modern Stack</span>
            <span className="chip">🤝 10+ Happy Projects</span>
          </div>

          {/* glass cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Partner Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="card card-premium p-6 flex flex-col items-center justify-between text-center"
            >
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="icon-ring"
              >
                <FaHandshake className="text-5xl text-cyan-300 drop-shadow-lg" />
              </motion.div>
              <h3 className="text-xl font-semibold mt-4 text-slate-100">
                Our Partner
              </h3>
              <Link
                href="https://www.neovatech.in/"
                target="_blank"
                className="link font-medium text-lg mt-2"
              >
                Neovatech.in
              </Link>
              <p className="text-slate-300/80 text-sm mt-3">
                Collaborating with{' '}
                <span className="text-cyan-300">Neovatech</span> for
                enterprise-grade solutions and next-gen infrastructure.
              </p>
            </motion.div>

            {/* Worker Card - Rimon */}
            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="card card-premium p-6 flex flex-col items-center text-center"
            >
              <motion.div
                animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="icon-ring"
              >
                <FaUserAstronaut className="text-5xl text-cyan-400 drop-shadow-lg" />
              </motion.div>
              <h3 className="text-lg font-semibold mt-4 text-slate-100">
                Rimon Debnath <span className="verify-badge">✔</span>
              </h3>
              <p className="text-sm text-cyan-300 mb-1">
                🚀 Full Stack Developer
              </p>
              <p className="text-slate-300/80 text-sm">
                React.js • Node.js • Next.js • AWS • Docker
                <br />
                Building scalable modern web apps | Product-focused |
                Remote-ready
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  href="https://www.linkedin.com/in/rimon12/"
                  className="btn btn-primary text-sm"
                >
                  Contact
                </Link>
              </div>
            </motion.div>

            {/* Worker Card - Shachi */}
            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="card card-premium p-6 flex flex-col items-center text-center"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="icon-ring"
              >
                <FaUserTie className="text-5xl text-cyan-400 drop-shadow-lg" />
              </motion.div>
              <h3 className="text-lg font-semibold mt-4 text-slate-100">
                Shachi Priya <span className="verify-badge">✔</span>
              </h3>
              <p className="text-sm text-cyan-300 mb-1">
                💻 Sr. Full Stack Developer
              </p>
              <p className="text-slate-300/80 text-sm">
                Sr. Developer • Backend Architecture | UX | Scalable Systems |
                Distributed Systems Expert
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  href="https://www.linkedin.com/in/shachi-priya-87136018a/"
                  className="btn btn-primary text-sm"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Excellence / Stats */}
          <motion.div
            className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="card card-premium p-8"
            >
              <h3 className="text-3xl font-bold text-cyan-300 mb-2">10+</h3>
              <p className="text-slate-200 font-medium">
                Successful Projects Delivered
              </p>
              <p className="text-slate-300/80 text-sm mt-3">
                From startups to growing businesses — shipped with care,
                precision, and impact.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="card card-premium p-8"
            >
              <h3 className="text-3xl font-bold text-cyan-300 mb-2">100%</h3>
              <p className="text-slate-200 font-medium">Client Satisfaction</p>
              <p className="text-slate-300/80 text-sm mt-3">
                Speed, quality, transparency — that’s our default.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="card card-premium p-8"
            >
              <h3 className="text-2xl font-bold text-cyan-300 mb-2">
                ⚙ Latest Tools
              </h3>
              <p className="text-slate-200 font-medium">
                Secure & scalable by design
              </p>
              <p className="text-slate-300/80 text-sm mt-3">
                React, Next.js, Node.js, Docker, AWS — rapid delivery with
                strong security practices.
              </p>
            </motion.div>
          </motion.div>

          {/* Summary line */}
          <motion.div
            className="mt-20 text-slate-300/90 text-sm max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p>
              At <span className="text-cyan-300 font-medium">getin10min</span>,
              we don’t just build websites — we engineer experiences that stand
              out, perform fast, and scale with your growth.
            </p>
          </motion.div>

          {/* footer */}
          <motion.div
            className="mt-16 text-slate-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="divider-soft" />
            <p className="mt-4">Our Team Work 😊 • 100+ happy connections</p>
            <p className="mt-2 text-slate-500">
              We innovate, collaborate, and deliver web experiences built for
              the future.
            </p>
          </motion.div>
        </section>
      </div>

      {/* premium CSS enhancements for this page only */}
      <style jsx global>{`
        /* aurora gradient backdrop (lightweight CSS only) */
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
        /* glass ring/border accent using mask trick (keeps it fast) */
        .card-premium {
          position: relative;
          overflow: hidden;
        }
        .card-premium::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem; /* match .card rounded-2xl */
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(34, 211, 238, 0.5),
            rgba(129, 140, 248, 0.35)
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .card-premium:hover::before {
          background: linear-gradient(
            135deg,
            rgba(34, 211, 238, 0.7),
            rgba(129, 140, 248, 0.5)
          );
        }
        .icon-ring {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 86px;
          height: 86px;
          border-radius: 9999px;
          background: radial-gradient(
            closest-side,
            rgba(34, 211, 238, 0.15),
            transparent
          );
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25),
            inset 0 0 0 1px rgba(148, 163, 184, 0.15);
        }
        .verify-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          font-size: 12px;
          border-radius: 999px;
          color: #0b1220;
          background: linear-gradient(180deg, #67e8f9, #22d3ee);
          box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.6);
          transform: translateY(-1px);
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 9999px;
          font-size: 12px;
          line-height: 1;
          color: #e5e7eb;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(8px) saturate(120%);
          border: 1px solid rgba(148, 163, 184, 0.18);
        }
        .divider-soft {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(148, 163, 184, 0.35),
            transparent
          );
        }
        .drop-shadow {
          text-shadow: 0 2px 22px rgba(56, 189, 248, 0.35);
        }
      `}</style>
    </>
  );
}
