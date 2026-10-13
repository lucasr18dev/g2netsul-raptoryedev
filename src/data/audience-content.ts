// src/data/audience-content.ts
// Aqui vive TUDO que muda entre cliente e não cliente:
// metadados, ordem das sections e textos de cada section.
// Para mudar um texto, esconder ou reordenar uma section: edite só este arquivo.
import type { Audience } from '../lib/audience';

export type SectionId = 'customerTools' | 'hero' | 'pricing' | 'services' | 'howToGetTo';

export interface SectionConfig {
  id: SectionId;
  /** Props repassadas ao componente da section. */
  props?: Record<string, any>;
}

export interface PageContent {
  meta: {
    title: string;
    description: string;
    image?: string;
  };
  /** JSON-LD só faz sentido para quem está "descobrindo" a empresa. */
  structuredData: boolean;
  /** Ordem aqui = ordem na página. Fora da lista = não renderiza. */
  sections: SectionConfig[];
}

const visitor: PageContent = {
  meta: {
    title: 'Planos de Internet Banda Larga',
    description: 'Contrate internet fibra ultra rápida com Wi-Fi grátis. Confira nossas ofertas.',
    image: '/banner-ofertas.jpg',
  },
  structuredData: true,
  sections: [
    { id: 'hero' },
    {
      id: 'pricing',
      props: {
        title: 'Conexão\nsob medida',
        subtitle: 'Compare nossos planos residenciais e encontre a franquia de velocidade perfeita para a rotina da sua casa',
      },
    },
    { id: 'services' },
    { id: 'howToGetTo' },
  ],
};

const customer: PageContent = {
  meta: {
    title: 'Central do Cliente - Suporte e Faturas',
    description: 'Acesse seus serviços, consulte faturas e encontre suporte técnico.',
    image: undefined,
  },
  structuredData: false,
  sections: [
    { id: 'customerTools' },
    {
      id: 'pricing',
      props: {
        title: 'Precisando de um upgrade?',
        // Texto sugerido — ajuste ao tom da marca.
        subtitle: 'Veja planos com mais velocidade e benefícios para quem já é cliente.',
      },
    },
    { id: 'services' },
    { id: 'howToGetTo' },
  ],
};

/** 'unknown' cai no conteúdo de visitante (é o que crawlers e primeira visita enxergam). */
export function getPageContent(audience: Audience): PageContent {
  return audience === 'customer' ? customer : visitor;
}