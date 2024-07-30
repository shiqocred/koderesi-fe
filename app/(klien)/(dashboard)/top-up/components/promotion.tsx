"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import { CardPrice } from "./card-price";

const Promotion = () => {
  const bannerRef = useRef<SwiperType>();
  const promoRef = useRef<SwiperType>();
  const progessRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    if (progessRef.current) {
      progessRef.current.style.width = `${100 - progress * 100}%`;
    }
  };

  return (
    <div className="w-full flex flex-col px-2 sm:px-4 md:px-8">
      <div className="w-full relative space-y-5 md:space-y-10">
        <Swiper
          spaceBetween={8}
          centeredSlides={true}
          slidesPerView={"auto"}
          effect={"fade"}
          onSwiper={(swiper) => {
            bannerRef.current = swiper;
          }}
          loop={true}
          modules={[EffectFade, Autoplay]}
          grabCursor={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="rounded-md w-full overflow-hidden"
        >
          <div className="md:flex absolute left-0 top-0 h-full w-full justify-between overflow-hidden rounded-md hidden">
            <Button
              className="-ml-5 md:ml-0 w-1/4 md:w-1/6 z-10 scale-125 h-full p-0 rounded-r-full opacity-0 hover:opacity-100 transition-all dark:hover:bg-black/50 dark:bg-black/50 hover:bg-white/50 bg-white/50 backdrop-blur-sm"
              onClick={() => bannerRef.current?.slidePrev()}
            >
              <ChevronLeft className="w-8 h-8 ml-5 md:w-16 md:h-16 dark:text-white text-black" />
            </Button>
            <Button
              className="-mr-5 md:ml-0 w-1/4 md:w-1/6 z-10 scale-125 h-full p-0 rounded-l-full opacity-0 hover:opacity-100 transition-all dark:hover:bg-black/50 dark:bg-black/50 hover:bg-white/50 bg-white/50 backdrop-blur-sm"
              onClick={() => bannerRef.current?.slideNext()}
            >
              <ChevronRight className="w-8 h-8 mr-5 md:w-16 md:h-16 dark:text-white text-black" />
            </Button>
          </div>
          <div
            ref={progessRef}
            className="h-1 md:h-2 bg-green-500 absolute top-0 z-20 rounded-full scale-110"
          />
          <SwiperSlide className="relative w-full aspect-[2/1] md:aspect-[4/1] rounded-md flex items-center justify-center overflow-hidden">
            <Link href={`/posters`} className="w-full h-full">
              <Card className="flex items-center w-full justify-center shadow-none flex-col h-full bg-transparent">
                <div className="w-full h-full rounded-md overflow-hidden">
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1719937206168-f4c829152b91?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={""}
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
              </Card>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="relative w-full aspect-[2/1] md:aspect-[4/1] rounded-md flex items-center justify-center overflow-hidden">
            <Link href={`/posters`} className="w-full h-full">
              <Card className="flex items-center w-full justify-center shadow-none flex-col h-full bg-transparent">
                <div className="w-full h-full rounded-md overflow-hidden">
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1722232778560-a56742074a31?w=3270&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={""}
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
              </Card>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="relative w-full aspect-[2/1] md:aspect-[4/1] rounded-md flex items-center justify-center overflow-hidden">
            <Link href={`/posters`} className="w-full h-full">
              <Card className="flex items-center w-full justify-center shadow-none flex-col h-full bg-transparent">
                <div className="w-full h-full rounded-md overflow-hidden">
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1721932423849-e9033192b190?w=3270&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={""}
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
              </Card>
            </Link>
          </SwiperSlide>
        </Swiper>
        <div className="flex h-full w-full items-center flex-col lg:flex-row">
          <div className="h-full flex flex-col justify-center w-full lg:w-1/4 lg:mr-[30px] flex-none mb-5 md:mb-10 lg:mb-0">
            <div className="text-center lg:text-start mx-auto w-full">
              <h3 className="text-xl sm:text-3xl font-bold text-green-400">
                LEBIH MURAH
              </h3>
              <h3 className="text-xl sm:text-3xl font-bold">DENGAN PROMO!!</h3>
            </div>
          </div>
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                autoplay: false,
              },
              640: {
                slidesPerView: 2,
                autoplay: {
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                },
              },
              1024: {
                slidesPerView: 3,
                autoplay: {
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                },
              },
            }}
            pagination={{
              el: ".swiper-pagination",
              type: "fraction",
              renderFraction: (currentClass, totalClass) => {
                return `
                  <span class="${currentClass} text-sm text-black"></span>
                  <span class="text-sm text-black"> dari </span>
                  <span class="${totalClass} text-sm text-black"></span>
                `;
              },
            }}
            spaceBetween={30}
            loop={true}
            modules={[Pagination, Autoplay]}
            onSwiper={(swiper) => {
              promoRef.current = swiper;
            }}
            className="rounded-md w-full overflow-hidden"
          >
            <div className="flex justify-between mt-2 md:mt-5 items-center">
              <div className="swiper-pagination" />
              <div className="flex gap-2">
                <Button
                  className="w-8 h-8 md:w-10 md:h-10 p-0"
                  onClick={() => promoRef.current?.slidePrev()}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  className="w-8 h-8 md:w-10 md:h-10 p-0"
                  onClick={() => promoRef.current?.slideNext()}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {Array.from({ length: 6 }, (_, i) => (
              <SwiperSlide
                key={i}
                className="relative w-full rounded-md flex items-center justify-center overflow-hidden"
              >
                <Link href={`/posters/${i}`} className="w-full h-full">
                  <CardPrice
                    kredit={300}
                    perKredit={350}
                    price={35000}
                    keterangan="normal"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
