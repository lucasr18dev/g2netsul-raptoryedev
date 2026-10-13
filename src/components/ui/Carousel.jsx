import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';

// Importe os estilos do Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function Carousel({ slides }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Swiper
        modules={[EffectFade, Pagination, Autoplay]}
        effect={'fade'}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        className="rounded-lg shadow-lg"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index} className="p-6 bg-gray-100 rounded-md text-center">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Exige biblioteca SwiperJs para funcionar corretamente. Certifique-se de instalar o Swiper com `npm install swiper` ou `yarn add swiper`.