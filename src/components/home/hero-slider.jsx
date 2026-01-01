"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import "swiper/css";

const slides = [
  {
    title: "Earn Money Online",
    description: "Complete simple tasks and earn real money from anywhere in the world.",
    cta: { text: "Get Started", href: "/register" },
  },
  {
    title: "Quick & Easy Tasks",
    description: "Surveys, reviews, and micro-tasks that take just minutes to complete.",
    cta: { text: "Browse Tasks", href: "/tasks" },
  },
  {
    title: "Instant Withdrawals",
    description: "Cash out your earnings anytime with multiple payment options.",
    cta: { text: "Learn More", href: "/about" },
  },
];

export function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      speed={800}
      loop={true}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[450px]">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {slide.description}
            </p>
            <div className="mt-8">
              <Link href={slide.cta.href}>
                <Button size="lg">{slide.cta.text}</Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}