"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MotivationCard } from "./motivation-card";

interface Props {
  items: { title: string; body: string }[];
}

export function MotivationCarousel({ items }: Props) {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 pb-4">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-[95%] sm:basis-2/3 lg:basis-1/2 xl:basis-2/5"
            >
              <MotivationCard title={item.title} body={item.body} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300" />
        <CarouselNext className="right-2 bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300" />
      </Carousel>

      {/* Gradient overlays for better visual effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}
