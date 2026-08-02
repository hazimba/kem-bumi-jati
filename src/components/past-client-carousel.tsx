"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type PastClient = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const pastClients: PastClient[] = [
  {
    id: "1",
    name: "PT Maju Bersama",
    description: "Sent 25 employees through our operator certification program, improving on-site safety compliance by 40%.",
    image: "https://cadtraining.com.my/wp-content/uploads/2026/04/Image-2.jpg",
  },
  {
    id: "2",
    name: "Global Tech Solutions",
    description: "Partnered with us for a 6-month leadership training program covering 12 department heads.",
    image: "https://cdn.hach.com/7FYZVWYB/at/bz2vkbq5g3whm8q4988bwc7/photo1718259689.jpeg?auto=webp&format=png",
  },
  {
    id: "3",
    name: "Sinar Konstruksi",
    description: "Completed heavy equipment training for their entire field crew ahead of a major infrastructure project.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQNBT0-hPzv8_AMMF4OnDYcPZ_rzLgOiNZjiRtieD2hfMc1Trgh0HUnBt&s=10",
  },
  {
    id: "4",
    name: "Bintang Logistik",
    description: "Enrolled 40+ drivers in our defensive driving and logistics safety certification.",
    image: "https://mmcgamudamrt.com.my/wp-content/uploads/2020/01/3.6.1-KVMRT-Training-Centre-KTC-1-1-e1578402112572-768x640.jpg",
  },
  {
    id: "5",
    name: "Nusantara Energy",
    description: "Trained technical staff on updated industrial safety standards and emergency response procedures.",
    image: "https://storage.googleapis.com/origin-awsassets.nst.com.my/images/articles/8658ED1BC6582D3B27FDD678182F04C3_low_0.jpg",
  },
  {
    id: "6",
    name: "Mitra Sejahtera Group",
    description: "Ran a company-wide upskilling program spanning three regional offices.",
    image: "https://www.timetraining.ae/design/images/2.jpg",
  },
];

export default function PastClientsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    setSelectedIndex(api.selectedScrollSnap());

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="w-full pb-16 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full animate-in fade-in duration-1000">
          {/* Header Section */}
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by Companies We&apos;ve Trained</h2>
              <p className="mt-3 text-muted-foreground">
                A look at some of the organizations that have partnered with our training center to develop their teams.
              </p>
            </div>

            {/* Mobile Header Row: View All Button + Navigation Controls on the same row */}
            <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
              <Button variant="outline" className="shrink-0 group">
                View All Clients
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              {/* Mobile Only Carousel Controls */}
              <div className="flex items-center gap-2 md:hidden">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </div>
          </div>

          {/* Carousel Content */}
          <CarouselContent>
            {pastClients.map((client, index) => {
              const isSelected = index === selectedIndex;

              return (
                <CarouselItem key={client.id} className="basis-[100%] sm:basis-1/2 lg:basis-[42%]">
                  <Card
                    className={cn(
                      "overflow-hidden h-full pt-0 gap-0 origin-center transition-all duration-500 ease-out",
                      isSelected ? "scale-100 opacity-100 shadow-xl z-10" : "scale-[0.75] opacity-60 shadow-none"
                    )}>
                    <div className="relative w-full aspect-square">
                      <Image
                        src={client.image}
                        alt={client.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 38vw"
                      />
                    </div>

                    <CardContent className="p-5 flex flex-col gap-2">
                      <h3 className="text-lg font-semibold">{client.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{client.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Desktop Navigation Controls: Centered below carousel */}
          <div className="mt-8 hidden justify-center gap-3 md:flex">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
