"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelancer",
    avatar: "",
    rating: 5,
    content: "MicroEarn has been a game-changer for my income. The tasks are straightforward, and I've never had an issue with payments. Highly recommend!",
  },
  {
    name: "Michael Chen",
    role: "Student",
    avatar: "",
    rating: 5,
    content: "Perfect for students! I earn between classes and the flexibility is unmatched. Already made enough to cover my monthly expenses.",
  },
  {
    name: "Emily Davis",
    role: "Stay-at-home Mom",
    avatar: "",
    rating: 5,
    content: "I complete tasks while my kids nap. It's the perfect side income for anyone with limited time. The platform is so easy to use.",
  },
  {
    name: "James Wilson",
    role: "Part-time Worker",
    avatar: "",
    rating: 4,
    content: "Been using MicroEarn for 6 months now. The support team is responsive and the variety of tasks keeps things interesting.",
  },
];

export function TestimonialsSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      speed={600}
      loop={true}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="w-full pb-12"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <Card className="h-full border-border">
            <CardContent className="flex h-full flex-col p-6">
              {/* Rating stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial content */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content.length > 120 
                  ? testimonial.content.slice(0, 120) + "&hellip;" 
                  : testimonial.content}&rdquo;
              </p>

              {/* Author info */}
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-muted text-sm font-medium">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
