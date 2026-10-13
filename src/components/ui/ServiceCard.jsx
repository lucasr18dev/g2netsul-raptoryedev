// ServiceCard.jsx
import { Cctv, Phone, Router, Smartphone } from 'lucide-react';

const ICONS = {
  mobile: Smartphone,
  router: Router,
  phone: Phone,
  camera: Cctv,
};

export default function ServiceCard({
  title,
  icon,
  imageSrc,
  imageAlt = '',
  href,
  className = '',
}) {
  const Icon = icon ? ICONS[icon] : null;
  const Root = href ? 'a' : 'div';

  // Animação de hover (aumenta levemente a imagem)
  const imageMotion =
    'transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none';

  return (
    <Root
      href={href}
      // bg-white garante o fundo branco. 
      // justify-end empurra o conteúdo (ícone e texto) para baixo.
      className={`group relative flex h-[320px] w-full max-w-[340px] select-none flex-col justify-end overflow-hidden rounded-3xl bg-white p-6 hover:bg-brand-910 transition-colors duration-300 ${className}`}
    >
      {/* Imagem (empurrada para fora do card para criar o efeito cortado) */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          // -right-16 e -top-6 movem a imagem mais para a direita e para cima
          // h-[80%] e w-[95%] aumentam o zoom da imagem
          className={`absolute -right-16 -top-6 h-[80%] w-[95%] pointer-events-none object-contain object-center ${imageMotion}`}
        />
      )}

      {/* Ícone e Título no canto inferior esquerdo */}
      <div className="relative z-10 flex flex-col gap-4">
        {Icon && (
          <div className="text-zinc-950 group-hover:text-brand-50 transition-colors duration-300">
            <Icon size={28} strokeWidth={1.5} />
          </div>
        )}
        <h3 className="whitespace-pre-line font-extrabold text-brand-910 text-2xl tracking-tight leading-[1.15] group-hover:text-brand-50 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </Root>
  );
}