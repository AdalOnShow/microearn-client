"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

import "swiper/css";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelancer",
    avatar: "",
    content: "MicroEarn has been a great way to earn extra income in my spare time. The tasks are simple and payments are always on time.",
  },
  {
    name: "Michael Chen",
    role: "Student",
    avatar: "",
    content: "As a student, I needed flexible work. MicroEarn lets me earn money between classes without any commitment.",
  },
  {
    name: "Emily Davis",
    role: "Stay-at-home Mom",
    avatar: "",
    content: "I can complete tasks while my kids nap. It's perfect for anyone looking for flexible earning opportunities.",
  },
  {
    name: "James Wilson",
    role: "Part-time Worker",
    avatar: "",
    content: "The platform is easy to use and the support team is responsive. I've been using it for 6 months now.",
  },
];

export function TestimonialsSlider() {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      speed={800}
      loop={true}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="w-full"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <Card className="h-full">
            <CardContent className="p-6">
              <Quote className="h-8 w-8 text-muted-foreground/30" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {testimonial.content}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-muted text-sm font-medium">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
