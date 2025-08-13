"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Topic = { title: string; body: string };

export function MotivationCarousel({ items }: { items: Topic[] }) {
  return (
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {items.map((t) => (
            <CarouselItem
              key={t.title}
              className="basis-[85%] sm:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-md">{t.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 whitespace-pre-wrap">
                    {t.body}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
  );
}
