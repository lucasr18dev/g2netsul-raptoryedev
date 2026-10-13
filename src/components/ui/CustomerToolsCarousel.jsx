import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';
import CustomerToolCard from './CustomerToolCard.jsx';

export default function CustomerToolsCarousel({ tools }) {
  return (
    <>
      <div className="md:hidden">
        <Swiper
          modules={[A11y]}
          slidesPerView="auto"
          spaceBetween={16}
          className="px-1 pb-4"
        >
          {tools.map((tool) => (
            <SwiperSlide key={tool.id} className="h-auto! w-[89%]!">
              <CustomerToolCard {...tool} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ul className="mx-auto hidden max-w-4xl grid-cols-3 gap-5 md:grid">
        {tools.map((tool) => (
          <li key={tool.id} className="h-full">
            <CustomerToolCard {...tool} />
          </li>
        ))}
      </ul>
    </>
  );
}
