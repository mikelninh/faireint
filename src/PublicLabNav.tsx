import { ExternalLink } from 'lucide-react'

type Active = 'reality' | 'tradeoffs' | 'workshop' | 'diw'

const links: { id: Active; label: string; href: string }[] = [
  { id: 'reality', label: 'Haushaltscheck', href: '?reality=1' },
  { id: 'tradeoffs', label: 'Trade-offs', href: '?optimizer=1' },
  { id: 'diw', label: 'DIW-Steuerlab', href: '?diw=1' },
  { id: 'workshop', label: 'Workshop', href: '?workshop=1' },
]

export default function PublicLabNav({ active }: { active?: Active }) {
  return <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/95 backdrop-blur-xl print:hidden">
    <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
      <a href="./" className="flex shrink-0 items-center gap-2 font-black tracking-tight">
        <span>FairEint</span>
        <span className="rounded-full border border-border bg-white px-2 py-0.5 text-[10px] font-black text-ink-muted">Public Lab</span>
      </a>
      <nav className="ml-auto flex max-w-[72vw] items-center gap-1 overflow-x-auto rounded-xl bg-white p-1 shadow-sm sm:max-w-none">
        {links.map((link) => <a key={link.id} href={link.href} className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold transition sm:text-xs ${active === link.id ? 'bg-ink text-white' : 'text-ink-muted hover:bg-bg-alt hover:text-ink'}`}>{link.label}</a>)}
      </nav>
      <a href="https://github.com/mikelninh/faireint" target="_blank" rel="noreferrer" aria-label="FairEint Quellcode" className="hidden shrink-0 items-center gap-1 text-xs font-bold text-ink-muted hover:text-ink lg:inline-flex">Open Source <ExternalLink size={12} /></a>
    </div>
  </header>
}
