import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import ServiceCard from './ServiceCard.jsx';

const AUTOPLAY_DELAY = 3500; // ms entre um card e o próximo

export default function ServicesCarousel({ services }) {
  const wrapperRef = useRef(null);
  const swiperRef = useRef(null);

  // O timer só roda quando o carrossel está visível na tela e o usuário
  // não pediu "reduzir movimento". Em md+ o wrapper fica display:none,
  // então ele nunca "aparece" e o autoplay fica parado.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;

    const sync = () => {
      const autoplay = swiperRef.current?.autoplay;
      if (!autoplay) return;
      if (inView && !mq.matches) autoplay.start();
      else autoplay.stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.4 }
    );

    io.observe(wrapperRef.current);
    mq.addEventListener('change', sync);

    return () => {
      io.disconnect();
      mq.removeEventListener('change', sync);
    };
  }, []);

  return (
    <>
      {/* MOBILE: carrossel, um card por vez, passa sozinho */}
      <div ref={wrapperRef} className="md:hidden">
        <Swiper
          modules={[A11y, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1.12}
          spaceBetween={16}
          speed={600}
          loop
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false, // volta a rodar depois que o usuário arrasta
            pauseOnMouseEnter: true,
          }}
          className="px-1 pb-4"
        >
          {services.map(({ id, ...card }) => (
            <SwiperSlide key={id} className="h-auto!">
              <div className="flex h-full justify-center">
                <ServiceCard {...card} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* MD+: grid, mesma ordem intercalada */}
      <ul className="hidden grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 md:grid">
        {services.map(({ id, ...card }) => (
          <li key={id} className="flex w-full justify-center">
            <ServiceCard {...card} />
          </li>
        ))}
      </ul>
    </>
  );
}