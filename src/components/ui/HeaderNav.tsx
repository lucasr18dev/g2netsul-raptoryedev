import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useState } from 'react';
import { Check, Ellipsis, UserKey } from 'lucide-react';

const contactNumber = '54 9XXXX-XXXX';

export default function HeaderNav() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const copyContactNumber = async () => {
    try {
      await navigator.clipboard.writeText(contactNumber);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('error');
      window.setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full">
      <div className="mx-auto grid max-w-[108rem] grid-cols-[1fr_auto_1fr] items-center px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Brand / Logo */}
        <a
          href="/"
          aria-label="G2 - Início"
          className="flex items-center focus-visible:outline-2 focus-visible:outline-white"
        >
          <img src="/g2.png" alt="G2" className="size-20 object-contain" />
        </a>

        <button
          type="button"
          onClick={copyContactNumber}
          aria-label={`Copiar número de contato ${contactNumber}`}
          className="inline-flex items-center justify-center gap-2 justify-self-center rounded-full px-2 py-2 text-sm font-semibold text-brand-950 transition hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:px-4"
        >
          {copyStatus === 'copied' ? (
            <Check aria-hidden="true" className="size-5 text-green-600" />
          ) : (
            <img src="/whatsapp.svg" alt="" aria-hidden="true" className="size-5" />
          )}
          <span>
            {copyStatus === 'copied'
              ? 'Copiado!'
              : copyStatus === 'error'
                ? 'Não foi possível copiar'
                : contactNumber}
          </span>
        </button>

        {/* Desktop Nav (visível apenas em telas médias/grandes) */}
        <nav className="hidden items-center justify-self-end gap-8 text-base text-brand-950 font-semibold md:flex">
          <a href="#cobertura" className="transition hover:text-brand-600/80">Cobertura</a>
          <a href="#ajuda" className="transition hover:text-brand-600/80">Ajuda</a>
          
          <a
            href="/area-do-cliente"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-brand-600 transition hover:bg-white/90 focus-visible:outline-2 focus-visible:text-orange-600"
          >
            <UserKey className="size-6" />
            {/* <span>Área do cliente</span> */}
          </a>
        </nav>

        {/* Mobile / Dropdown Nav (Mobile-First via Headless UI) */}
        <div className="flex justify-self-end md:hidden">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex items-center justify-center rounded-xl  p-2 text-brand-910 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <span className="sr-only">Abrir menu de navegação</span>
              <Ellipsis className="size-6" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-[#1e293b] p-2 text-slate-800 shadow-2xl ring-1 ring-[#475569] transition duration-150 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              <MenuItem>
                <a
                  href="#services"
                  className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-white transition data-focus:bg-white/10"
                >
                  Cobertura
                </a>
              </MenuItem>

              <MenuItem>
                <a
                  href="#como-chegar"
                  className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-white transition data-focus:bg-white/10"
                >
                  Ajuda
                </a>
              </MenuItem>

              <div className="my-1.5 h-px bg-[#475569]" />

              {/* Destaque principal para a Área do Cliente */}
              <MenuItem>
                <a
                  href="/area-do-cliente"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e5f3fe] px-3 py-2.5 text-sm font-bold text-[#0058e2] transition data-focus:bg-brand-700"
                >
                  <UserKey className="size-4" />
                  Área do cliente
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>

      </div>
    </header>
  );
}