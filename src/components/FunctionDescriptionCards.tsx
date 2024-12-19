"use client";

import { useEffect, useState, useRef } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrainingProgressChart } from "./training-progress-chart";

const ITEMS = [
    {
    title: "トレーニングの記録を管理する。",
    description: "LiftQuestでは、ご自身のトレーニング記録をグラフで見ることができます。",
    content: TrainingProgressChart,
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
                "card-item relative flex flex-col h-auto md:h-[620px] transition-all duration-700 ease-in-out transform",
                animationClass
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
            <Card
                className={cn(
                "flex flex-col h-full rounded-lg space-y-2 transition-all duration-300 overflow-hidden",
                "md:hover:scale-105",
                isOtherHovered && "md:scale-95 md:blur-sm"
                )}
            >
                <CardHeader className="flex text-center flex-1 p-4">
                    <CardTitle className="text-lg sm:text-xl">{item.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full aspect-square p-3">
                    {item.content ? (
                    <item.content />
                    ) : (
                    <img
                    src={item.src}
                    alt={`${item.title} image`}
                    className="w-full h-full object-contain"
                    />
                    )}
                </div>
                </CardContent>
                <CardFooter className="relative p-4 pt-6 pb-8">
                    <Button className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2  w-full sm:w-2/3 md:w-1/3 max-w-[150px] h-10 sm:h-12 text-sm sm:text-base bg-hover-color text-foreground hover:bg-hover-color/90 hover:underline">
                    詳細はこちら
                    </Button>
                </CardFooter>
            </Card>
        </div>
        );
    })}
    </div>
    );
}

