import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';
import PlanCardReact from './PlanCard.jsx';

const categoryLabels = {
  residential: 'Residencial',
  business: 'Corporativo',
};

const STAGGER_MS = 110;

// Quantidade de itens que cada card comporta. Todos os cards têm esse mesmo número de linhas:
// quem tem menos itens fica com slots em branco, então o tamanho nunca muda
// (nem ao trocar de categoria). Aumente aqui se algum plano precisar de mais itens
const SLOTS = 6;

export default function PlanSelector({ planCategories, plans }) {
  const [activeCategory, setActiveCategory] = useState('residential');
  const list = plans[activeCategory];

  // Categoria com um plano só (ex.: corporativo, serviço personalizado):
  // sem carrossel nem grid, o card fica sozinho, centralizado e mais largo
  const isSingle = list.length === 1;

  return (
    <>
      {/* SELETOR DE CATEGORIA ESTILIZADO */}
      <div
        className="mx-auto mb-10 flex w-fit items-center rounded-full bg-neutral-100 p-1.5 shadow-inner"
        role="group"
        aria-label="Tipo de plano"
      >
        {planCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`min-w-[120px] rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
              activeCategory === category
                ? 'bg-brand-910 text-white shadow-sm'
                : 'bg-transparent text-neutral-400 hover:text-neutral-700'
            }`}
            aria-pressed={activeCategory === category}
            aria-controls="plans-panel"
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* key remonta tudo ao trocar de categoria: reinicia o stagger e volta o Swiper ao 1º slide */}
      <div
        key={activeCategory}
        id="plans-panel"
        role="region"
        aria-label={`Planos ${categoryLabels[activeCategory].toLowerCase()}`}
      >
        {isSingle ? (
          /* PLANO ÚNICO: mobile first. No mobile ocupa a largura toda (a section já dá o respiro
             lateral); a partir do sm centraliza com largura máxima maior que a de um card do grid.
             Sem concorrentes ao lado, então não precisa de slots em branco: usa só os itens que tem */
          <div className="mx-auto w-full animate-card-in sm:max-w-xl lg:max-w-2xl motion-reduce:animate-none">
            <PlanCardReact {...list[0]} slots={list[0].items.length} />
          </div>
        ) : (
          <>
            {/* MOBILE: carrossel, um card por vez */}
            <div className="sm:hidden animate-card-in motion-reduce:animate-none">
              <Swiper
                modules={[A11y]}
                slidesPerView={1.12}
                spaceBetween={16}
                className="px-1 pt-4 pb-4"
              >
                {list.map((plan, index) => (
                  <SwiperSlide key={plan.id || index} className="h-auto!">
                    <div className="h-full">
                      <PlanCardReact {...plan} slots={SLOTS} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* SM+: grid com cards entrando um de cada vez */}
            <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {list.map((plan, index) => (
                <div
                  key={plan.id || index}
                  className="h-full animate-card-in motion-reduce:animate-none"
                  style={{ animationDelay: `${index * STAGGER_MS}ms` }}
                >
                  <PlanCardReact {...plan} slots={SLOTS} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}