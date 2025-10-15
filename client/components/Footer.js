import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800">
      <div className="container-tight py-10 flex flex-col md:flex-row gap-8 md:gap-0 justify-between">
        <div>
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} getin10min — All rights reserved.</p>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="/privacy" className="hover:text-cyan-300">Privacy</Link>
          <Link href="/terms" className="hover:text-cyan-300">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
