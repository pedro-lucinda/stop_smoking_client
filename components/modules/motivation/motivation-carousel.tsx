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
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
          >
            <MotivationCard title={item.title} body={item.body} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 bg-card border-primary" />
      <CarouselNext className="right-2 bg-card border-primary" />
    </Carousel>
  );
}
