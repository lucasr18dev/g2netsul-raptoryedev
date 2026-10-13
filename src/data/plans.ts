export type PlanCategory = 'residential' | 'business';

export interface PlanItem {
  label: string;
  icon: string;           // chave do ICONS no PlanCard.jsx, ex.: 'router', 'headset'
  highlight?: boolean;    // aparece na cor de destaque
}

export interface Plan {
  id: string;
  speed: string;          // "400 Megas"
  description: string;    // descrição do plano
  items: PlanItem[];      // itens do card; o PlanSelector define quantos slots existem
  popular?: boolean;      // faixa "Mais popular" + moldura
  gradientBackground?: boolean;
  gradientTheme?: {
    backgroundColor?: string;
    glowColor?: string;
    glow?: number;
    glowPosition?: string;
    glowSize?: string;
    glowSpread?: number;
    shadow?: number;
  };
  dark?: boolean;         // versão preta
  ctaText?: string;
  ctaLink?: string;
}

export const planCategories: PlanCategory[] = ['residential', 'business'];

export const plans: Record<PlanCategory, Plan[]> = {
  residential: [
    {
      id: 'r400',
      speed: '400 Megas',
      description: 'Ideal para o dia a dia',
      items: [
        { label: 'Instalação Grátis', icon: 'zap' },
        { label: 'Roteador Wi-Fi 6 Incluso', icon: 'router' },
        { label: 'Suporte 24h', icon: 'headset' },
        { label: 'Streaming em Alta Definição', icon: 'hd', },
      ],
    },
    {
      id: 'r600',
      speed: '600 Megas',
      description: 'Para toda a família conectada',
      items: [
        { label: 'Instalação Grátis', icon: 'zap' },
        { label: 'Roteador Wi-Fi 6 Incluso', icon: 'router' },
        { label: 'Suporte 24h', icon: 'headset' },
        { label: 'Streaming em Alta Definição', icon: 'hd', },
        { label: 'Ideal para Múltiplas Conexões', icon: 'monitorsmartphone', },
      ],
    },
    {
      id: 'r1g',
      speed: '1 Giga',
      description: 'Para quem quer o máximo',
      popular: true,
      dark: true,
      items: [
        { label: 'Instalação PREMIUM Grátis', icon: 'zap' },
        { label: '2 Roteadores Wi-Fi 6 Inclusos', icon: 'router' },
        { label: 'Suporte 24h', icon: 'headset' },
        { label: 'Streaming em Alta Definição', icon: 'hd', },
        { label: 'Conexão na Residência Inteira', icon: 'wifi', },
        { label: 'Jogos Online sem Travamentos', icon: 'gamepad', },
      ],
    },
  ],
  business: [
    {
      id: 'b1g',
      speed: 'Sob Demanda',
      description: 'Solução ideal para negócios',
      gradientBackground: true,
      gradientTheme: {
        backgroundColor: 'var(--color-brand-910)',
        glowColor: 'var(--color-brand-50)',
        glow: 20,
      },
      dark: true,
      items: [
        { label: 'Instalação PREMIUM Grátis', icon: 'zap' },
        { label: 'Suporte Prioritário', icon: 'headset' },
        { label: 'IP Fixo', icon: 'shield' },
        { label: 'Simetria entre Download e Upload', icon: 'foldersync' },
        
      ],
    },
  ],
};