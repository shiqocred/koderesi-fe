"use client";

import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { CardPromo } from "./card-promo";
import { toast } from "sonner";
import { ToastError } from "@/components/toast-error";
import { baseUrl, optionToast } from "@/lib/utils";

interface BannerProps {
  id: string;
  banner: string;
}
interface PromoProps {
  id: string;
  title: string;
  total_credits: number;
  before_discount: number;
  after_discount: number;
  date_start: string;
  date_end: string;
  descriptions: string[];
}

const Promotion = () => {
  const bannerRef = useRef<SwiperType>();
  const promoRef = useRef<SwiperType>();
  const progessRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();
  const [bannerList, setBannerList] = useState<BannerProps[]>([]);
  const [promoList, setPromoList] = useState<PromoProps[]>([
    {
      id: "",
      title: "",
      total_credits: 0,
      before_discount: 0,
      after_discount: 0,
      date_start: "",
      date_end: "",
      descriptions: [""],
    },
  ]);

  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    if (progessRef.current) {
      progessRef.current.style.width = `${100 - progress * 100}%`;
    }
  };

  const handleGetPromo = async () => {
    try {
      const res = await axios.get(`${baseUrl}/admin/promo`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPromoList(res.data.data.promo);
      setBannerList(res.data.data.banner);
    } catch (error) {
      console.log("[ERROR_PROMO_GET]:", error);
    }
  };
  const handleCheckout = async (e: MouseEvent, id: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/admin/transaction/payment`,
        {
          package_id: id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(`/checkout/${res.data.data.code_transaction}`);
      toast.promise(
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: "Sonner" }), 2000)
        ),
        {
          loading: (
            <div className="flex items-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              <div className="text-xs font-semibold">
                <p>Paket berhasil dipilih,</p>
                <p>halaman segera dialihkan...</p>
              </div>
            </div>
          ),
          success: (data) => {
            return (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-white fill-green-400" />
                <div className="text-xs font-semibold">
                  <p>Paket berhasil diproses,</p>
                  <p>halaman berhasil dialihkan</p>
                </div>
              </div>
            );
          },
          error: (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-white fill-red-400" />
              <div className="text-xs font-semibold">
                <p>Paket gagal diproses,</p>
                <p>halaman gagal dialihkan</p>
              </div>
            </div>
          ),
        }
      );
    } catch (error) {
      console.log("[ERROR_PROMO_POST]:", error);
      toast.custom(
        (t) => <ToastError label="Paket gagal dipilih" error={error} t={t} />,
        optionToast
      );
    }
  };

  useEffect(() => {
    setIsMounted(true);
    handleGetPromo();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full flex flex-col px-2 sm:px-4 md:px-8">
      <div className="w-full relative space-y-5 md:space-y-10">
        <Swiper
          noSwiping
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
          className="rounded-md w-full overflow-hidden relative"
        >
          <Button
            className="absolute left-0 top-0 -ml-4 md:ml-0 w-1/5 md:w-1/6 z-10 scale-125 h-full p-0 rounded-r-full opacity-0 hover:opacity-100 transition-all dark:hover:bg-black/50 dark:bg-black/50 hover:bg-white/50 bg-white/50 backdrop-blur-sm"
            onClick={() => bannerRef.current?.slidePrev()}
          >
            <ChevronLeft className="w-8 h-8 ml-5 md:w-16 md:h-16 dark:text-white text-black" />
          </Button>
          <Button
            className="absolute right-0 top-0 -mr-4 md:ml-0 w-1/5 md:w-1/6 z-10 scale-125 h-full p-0 rounded-l-full opacity-0 hover:opacity-100 transition-all dark:hover:bg-black/50 dark:bg-black/50 hover:bg-white/50 bg-white/50 backdrop-blur-sm"
            onClick={() => bannerRef.current?.slideNext()}
          >
            <ChevronRight className="w-8 h-8 mr-5 md:w-16 md:h-16 dark:text-white text-black" />
          </Button>
          <div
            ref={progessRef}
            className="h-1 md:h-2 bg-green-500 absolute top-0 z-20 rounded-full scale-110"
          />
          {bannerList.map((item) => (
            <SwiperSlide
              key={item.id}
              className="relative w-full aspect-[3/1] md:aspect-[4/1] rounded-md flex items-center justify-center overflow-hidden"
            >
              <Button
                onClick={(e) => handleCheckout(e, item.id)}
                className="w-full h-full"
              >
                <Card className="flex items-center w-full justify-center shadow-none flex-col h-full bg-transparent">
                  <div className="w-full h-full rounded-md overflow-hidden">
                    <Image
                      src={item.banner}
                      alt={""}
                      fill
                      className="object-cover pointer-events-none"
                    />
                  </div>
                </Card>
              </Button>
            </SwiperSlide>
          ))}
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
                slidesPerView: 2,
                autoplay: {
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                },
              },
              1440: {
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
                  disabled={promoList.length <= 3}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  className="w-8 h-8 md:w-10 md:h-10 p-0"
                  onClick={() => promoRef.current?.slideNext()}
                  disabled={promoList.length <= 3}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {promoList.map((item) => (
              <SwiperSlide
                key={item.id}
                className="relative w-full h-full rounded-md flex items-center justify-center overflow-hidden"
              >
                <button
                  type={"button"}
                  onClick={(e) => handleCheckout(e, item.id)}
                  className="w-full h-full"
                >
                  <CardPromo {...item} />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
