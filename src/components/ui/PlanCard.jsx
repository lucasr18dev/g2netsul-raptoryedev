import {
  Check,
  CircleCheck,
  Gamepad2,
  Gauge,
  Headset,
  HouseWifi,
  Rocket,
  Router,
  ShieldCheck,
  Smartphone,
  TvMinimalPlay,
  WifiCog,
  Hd,
  MonitorSmartphone,
  FolderSync,
} from 'lucide-react';

// Ícones disponíveis para os itens da lista. Adicione aqui qualquer novo que quiser usar.
// Se um item vier com um nome que não existe aqui, cai no CircleCheck
const ICONS = {
  wifi: HouseWifi,
  gamepad: Gamepad2,
  tv: TvMinimalPlay,
  router: Router,
  zap: WifiCog,
  gauge: Gauge,
  rocket: Rocket,
  headset: Headset,
  shield: ShieldCheck,
  phone: Smartphone,
  check: Check,
  wificog: WifiCog,
  hd: Hd,
  monitorsmartphone: MonitorSmartphone,
  foldersync: FolderSync,
};

// =====================================================================
//  ESTILO DO CARD POPULAR — é só mexer aqui
// =====================================================================
const POPULAR_DEFAULTS = {
  // Cores do gradiente do stroke, em ordem. Pode ter 2, 3 ou mais.
  // Aceita qualquer cor CSS: '#bce4f5', 'rgb(...)', 'oklch(...)'
  // Para usar um token do tema: 'var(--color-brand-400)'
  colors: ['var(--color-brand-400)', 'var(--color-brand-100)'],

  // Direção do gradiente do stroke, em graus (0 = de baixo pra cima, 90 = esq → dir, 180 = cima → baixo)
  angle: 135,

  // Espessura do stroke, em px
  stroke: 6,

  // Canto onde o stroke aparece forte: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  corner: 'bottom-right',

  // Alcance do stroke a partir do canto, de 0 a 100. Maior = o stroke se estende mais pelas bordas.
  // 100 = a borda inteira fica visível, só esmaecendo
  reach: 60,

  // Cor do brilho de fundo e da sombra. Se omitir, usa a primeira cor de `colors`
  glowColor: 'var(--color-brand-100)',

  // Intensidade do brilho de fundo no canto, de 0 a 100 (0 desliga)
  glow: 40,

  // Posição da luz (x y). Vazio = usa o canto de `corner`. Ex.: '80% 100%', '50% 0%'
  glowPosition: '100% 100%',

  // Largura e altura da elipse de luz. Maior = luz mais larga/alta
  glowSize: '180% 70%',

  // Até onde a luz se espalha, de 0 a 100. Maior = mais difusa
  glowSpread: 60,

  // Intensidade da sombra colorida embaixo do card, de 0 a 100 (0 desliga)
  shadow: 0,
};
// Qualquer plano pode sobrescrever só o que quiser, passando `popularTheme` no plans.ts, ex.:
//   popularTheme: { colors: ['#a855f7', '#f97316'], corner: 'top-right' }

const CORNERS = {
  'top-left': '0% 0%',
  'top-right': '100% 0%',
  'bottom-left': '0% 100%',
  'bottom-right': '100% 100%',
};

// Máscara que recorta só a borda do elemento (anel), escondendo o miolo
const RING_MASK = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)';

// Monta os estilos do card popular a partir da config acima
function buildPopularStyles(theme) {
  const t = { ...POPULAR_DEFAULTS, ...theme };
  const pos = CORNERS[t.corner] ?? CORNERS['bottom-right'];
  const glowColor = t.glowColor ?? t.colors[0];

  // linear-gradient precisa de ao menos 2 cores
  const stops = t.colors.length === 1 ? [t.colors[0], t.colors[0]] : t.colors;

  // Máscara que esmaece o stroke a partir do canto
  const fade = `radial-gradient(90% 75% at ${pos}, #000 0%, transparent ${t.reach}%)`;

  return {
    // Fundo e sombra do <article>
    card: {
      backgroundColor: t.backgroundColor,
      backgroundImage: `radial-gradient(${t.glowSize} at ${t.glowPosition ?? pos}, color-mix(in srgb, ${glowColor} ${t.glow}%, transparent), transparent ${t.glowSpread}%)`,
      boxShadow: `0 20px 40px -20px color-mix(in srgb, ${glowColor} ${t.shadow}%, transparent)`,
    },
    // Camada de fora do stroke (esmaece)
    fade: { WebkitMaskImage: fade, maskImage: fade },
    // Camada de dentro do stroke (gradiente recortado em anel)
    ring: {
      padding: `${t.stroke}px`,
      background: `linear-gradient(${t.angle}deg, ${stops.join(', ')})`,
      WebkitMask: RING_MASK,
      mask: RING_MASK,
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    },
  };
}

export default function PlanCard({
  speed,
  description = '',
  items = [],               // [{ label, icon, highlight }]
  slots = 6,                // quantos itens o card comporta (igual em todos os cards)
  popular = false,
  gradientBackground = false,
  gradientTheme,
  popularLabel = 'Mais Popular',  // passe '' para não mostrar o selo
  popularTheme,             // sobrescreve POPULAR_DEFAULTS só neste plano
  ctaText = 'Verificar Disponibilidade',
  ctaLink = '#plans',
  dark = false,
}) {
  const divider = dark ? 'border-white/20' : 'border-neutral-200';
  const showBadge = popular && Boolean(popularLabel);

  if (import.meta.env?.DEV && items.length > slots) {
    console.warn(
      `PlanCard "${speed}": ${items.length} itens para ${slots} slots. Os extras não serão exibidos.`
    );
  }

  // Sempre renderiza `slots` linhas. Quem não tem item fica em branco, só ocupando a altura
  const rows = Array.from({ length: slots }, (_, i) => items[i] ?? null);

  const popularStyles = popular ? buildPopularStyles(popularTheme) : null;
  const gradientStyles = gradientBackground
    ? buildPopularStyles(gradientTheme ?? popularTheme)
    : null;

  return (
    <article
      style={popularStyles?.card ?? gradientStyles?.card}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-6 ${
        dark ? 'bg-brand-600 text-brand-50' : 'bg-white text-brand-950'
      }`}
    >
      {/* Stroke em gradiente mascarado no canto.
          Camada de fora: esmaece o stroke até sumir. Camada de dentro: gradiente recortado em anel */}
      {popular && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={popularStyles.fade}
        >
          <div className="size-full rounded-3xl" style={popularStyles.ring} />
        </div>
      )}

      {/* Selo do popular, no canto de cima. Não entra no fluxo, então não desalinha os títulos */}
      {showBadge && (
        <span className="absolute right-5 top-5 rounded-full bg-brand-100/20 px-3 py-1 text-[11px] font-semibold text-brand-100">
          {popularLabel}
        </span>
      )}

      <h3 className={`text-2xl font-black tracking-tight ${dark ? 'text-brand-50' : 'text-brand-910'} ${showBadge ? 'pr-28' : ''}`}>
        {speed}
      </h3>
      <p className={`mt-2 min-h-5 text-sm font-medium ${popular || gradientBackground ? 'text-brand-50/60' : 'text-grey-1'}`}>
        {description}
      </p>
      <hr className={`my-5 ${divider}`} />

      <ul className="flex-1 space-y-3">
        {rows.map((item, index) => {
          // Slot vazio: mesma altura de um item, invisível
          if (!item) {
            return <li key={`empty-${index}`} aria-hidden="true" className="h-10" />;
          }

          const Icon = ICONS[item.icon] ?? CircleCheck;
          const tone = item.highlight
            ? 'text-orange-500'
            : dark
              ? 'text-brand-50'
              : 'text-brand-950';

          return (
            <li
              key={item.label}
              className="flex h-10 items-center gap-3 text-sm font-semibold leading-tight"
            >
              <Icon className={`size-5 shrink-0 ${tone}`} strokeWidth={1.5} aria-hidden="true" />
              <span className={item.highlight ? 'text-orange-500' : ''}>{item.label}</span>
            </li>
          );
        })}
      </ul>

      <a
        href={ctaLink}
        className={`mt-8 block rounded-full px-6 py-4 text-center text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
          dark
            ? 'bg-brand-50 text-brand-910 hover:bg-brand-50/90 focus-visible:outline-white'
            : 'bg-brand-910 text-brand-50 hover:bg-brand-910/85 focus-visible:outline-neutral-900'
        }`}
      >
        {ctaText}
      </a>
    </article>
  );
}