const icons = {
  invoice: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="size-12">
      <path d="M14 7h14l8 8v26H14V7Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M28 7v9h8M20 25h10M20 32h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="size-12">
      <path d="M9 25v-3a15 15 0 0 1 30 0v3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M9 24h5a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-5M39 24h-5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-5M34 38a11 11 0 0 1-10 5h-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 43h3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  account: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="size-12">
      <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M9 41a15 15 0 0 1 30 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
};

/** @param {{ title: string, description: string, icon: keyof typeof icons }} props */
export default function CustomerToolCard({ title, description, icon }) {
  return (
    <article className="flex aspect-square h-full flex-col justify-between rounded-3xl border-2 border-neutral-900 bg-white p-6 text-neutral-900 transition-colors hover:bg-neutral-50 sm:p-8">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-100 text-neutral-900">
        {icons[icon]}
      </span>
      <div>
        <h3 className="text-xl font-bold leading-tight sm:text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">{description}</p>
      </div>
    </article>
  );
}
