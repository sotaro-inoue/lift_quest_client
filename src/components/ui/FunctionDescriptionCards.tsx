"use client";

import { useEffect, useState, useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ITEMS = [
    {
    title: "トレーニングの記録を管理する。",
    description: "LiftQuestでは、ご自身のトレーニング記録をグラフで見ることができます。",
    src: "https://doodleipsum.com/500x500/flat?bg=f5f2b0&i=fdd9dc261e18ddc044aab7240951e98f",
    },
    {
    title: "キャラクター育成",
    description: "LiftQuestでは、ご自身のトレーニング記録をグラフで見ることができます。",
    src: "https://doodleipsum.com/500x500/flat?bg=f5f2b0&i=e072e675aa8b4dd16be316de11378208",
    },
    {
    title: "ギルドをつくって、仲間と協力する",
    description: "より大きな目標を達成するには、仲間が欠かせません。",
    src: "https://doodleipsum.com/500x500/flat?bg=f5f2b0&i=3c729e1b51c474e323d6f1d1eea0232d",
    },
];

export function FunctionDescriptionCards() {
    const [isVisible, setIsVisible] = useState<boolean[]>(Array(ITEMS.length).fill(false));
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
    const observers = cardsRef.current.map((element, index) => {
        if (!element) return null;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                    setIsVisible((prev) => {
                        const updated = [...prev];
                        updated[index] = true;
                        return updated;
                        });
                    }, index * 200);
                } else {
                    setTimeout(() => {
                    setIsVisible((prev) => {
                        const updated = [...prev];
                        updated[index] = false;
                        return updated;
                });
                    }, (ITEMS.length - 1 - index) * 200);
                }
            });
        },
        { threshold: 0.2 }
    );

    observer.observe(element);
    return observer;
    });

    return () => {
        observers.forEach((observer) => observer?.disconnect());
    };
    }, []);

    return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-screen-xl mx-auto">
        {ITEMS.map((item, index) => {
        const animationClass = isVisible[index]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10";

        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

        return (
        <div
            key={item.title}
            ref={(el) => {
                if (el) cardsRef.current[index] = el;
            }}
            className={cn(
                "card-item relative flex flex-col h-auto md:h-[600px] transition-all duration-700 ease-in-out transform",
                animationClass
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            >
            <Card
                className={cn(
                "flex flex-col h-full rounded-md space-y-2 transition-all duration-300",
                "md:hover:scale-105",
                isOtherHovered && "md:scale-95 md:blur-sm"
                )}
            >
            <CardHeader className="flex-1">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="h-auto md:h-[400px] flex items-center justify-center p-6">
                <img
                src={item.src}
                alt={`${item.title} image`}
                className="max-h-full w-full object-contain"
                />
            </CardContent>
            <CardFooter className="relative p-6 pb-8">
                <Button className="absolute left-1/2 -translate-x-1/2 -translate-y-3/4 top-1/2 w-full md:w-1/3 max-w-[150px] h-12 bg-hover-color text-foreground hover:bg-hover-color/90 hover:underline">
                Get Started!
                </Button>
            </CardFooter>
            </Card>
        </div>
        );
        })}
    </div>
    );
}

