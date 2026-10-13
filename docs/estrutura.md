Astro, React, Tailwind CSS, Headless UI.

sections/
    CustomerTools.astro     # conteúdo, dados e estrutura da seção
    PricingCards.astro
    Services.astro

ui/
    CustomerToolsCarousel.jsx  # ilha: Swiper/grid e interação
    PlanSelector.jsx           # ilha: abas, Swiper/grid e interação
    ServicesCarousel.jsx       # ilha: Swiper/grid
  
    CustomerToolCard.jsx     # design de cada card de atendimento
    PlanCard.jsx             # design de cada plano
    ServiceCard.jsx          # design de cada serviço

---

Não existe distinção de rota /cliente e /visitante, tudo é renderizado no index, com base no layout definido da audiencia, que guarda as regras do layout entre customer e visitor.

---

Header: Sticky, acesso rápido a tools;
Hero: Padrão F;
Stats: Autoridade;
Planos: cards, sem comparação, sensação de escolha real;
Serviços: extras;
Como chegar;
Fale conosco;

--- 

O plan cards deve ser: plan selector, e a pool dos cards, cada card puxa um template, tipo: card normal, card promo, card popular, etc;s

cardbase > padroniza os dados;
cardtemplate > padroniza o design, varios templates;
