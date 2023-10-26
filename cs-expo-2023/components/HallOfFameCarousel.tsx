"use client";

import React, { useEffect } from "react";
import {
    AiOutlineLeft,
    AiOutlineRight,
    AiOutlineDown,
    AiOutlineUp,
} from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

interface Slide {
    backgroundColor: string;
    ranking: string;
    group: string;
    thesis: string;
    link: string;
}

interface CarouselProps {
    title: string;
    slides: Slide[];
    perView?: number;
    id: string;
    carouselNumber: number;
    carouselUp: string;
    carouselDown: string;
    carouselUpTarget: string;
    carouselDownTarget: string;
}

const Carousel: React.FC<CarouselProps> = ({
    title,
    slides,
    perView,
    id,
    carouselNumber,
    carouselUp,
    carouselDown,
    carouselUpTarget,
    carouselDownTarget,
}) => {
    useEffect(() => {
        // Navigation
        const carouselUp = document.getElementById(`carousel-up-${id}`);
        const carouselDown = document.getElementById(`carousel-down-${id}`);
        const targetDivUp = document.getElementById(carouselUpTarget);
        const targetDivDown = document.getElementById(carouselDownTarget);

        carouselUp.addEventListener("click", () => {
            console.log("up clicked");
            if (targetDivUp) {
                const targetPosition = targetDivUp.offsetTop;
                const headerHeight = 200; // Adjust this value as needed. The more the value, the less the scroll will be.
                const scrollPosition = targetPosition - headerHeight;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: "smooth",
                });
            }
        });

        carouselDown.addEventListener("click", () => {
            console.log("down clicked");
            if (targetDivDown) {
                const targetPosition = targetDivDown.offsetTop;
                const headerHeight = 200; // Adjust this value as needed. The more the value, the less the scroll will be.
                const scrollPosition = targetPosition - headerHeight;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: "smooth",
                });
            }
        });

        // Carousel
        const config = {
            type: "slider",
            startAt: 0,
            perView: perView || 3,
            gap: 0,
            peek: {
                before: 0,
                after: 100,
            },
        };

        const glide = new Glide(`#${id}`, config);

        glide.on(["mount.after", "run"], () => {
            const currentIndex = glide.index;

            // Remove border from all slides
            const slideElements = document.querySelectorAll(
                `#slide-image-${id}`
            );
            slideElements.forEach((slide, index) => {
                slide.classList.remove(
                    "shadow-2xl",
                    "shadow-[var(--coral-pink)]",
                    "border-4",
                    "border-[var(--coral-pink)]"
                );

                if (index === currentIndex) {
                    // Add border to the current slide
                    slide.classList.add(
                        "shadow-2xl",
                        "shadow-[var(--coral-pink)]",
                        "border-4",
                        "border-[var(--coral-pink)]"
                    );
                }
            });
        });

        glide.mount();
    }, []);

    return (
        <div className="w-[1400px] grid grid-cols-12 mt-16 h-[500px]">
            <div className="relative col-span-3 h-3/4 flex flex-col">
                <div className="grid grid-cols-2 h-full">
                    <div className="col-span-1 flex flex-col items-center justify-end">
                        <AiOutlineUp
                            id={`carousel-up-${id}`}
                            className={`text-5xl text-[var(--coral-pink)] cursor-pointer m-2 ${carouselUp}`}
                        />
                        <h1
                            className="font-bold text-3xl"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            {carouselNumber}
                        </h1>
                        <AiOutlineDown
                            id={`carousel-down-${id}`}
                            className={`text-5xl text-[var(--coral-pink)] cursor-pointer m-2 ${carouselDown}`}
                        />
                    </div>
                    <div className=" col-span-1 grid grid-cols-2">
                        <div className="col-span-1 flex flex-col pe-6">
                            <div className="flex justify-start">
                                <h1
                                    className="font-bold text-2xl h-36 text-right"
                                    style={{ writingMode: "vertical-rl" }}
                                >
                                    {title}
                                </h1>
                            </div>
                            <div className="flex-grow relative">
                                <Image
                                    src={"/halftone.png"}
                                    className="mt-4"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="halftone"
                                ></Image>
                            </div>
                        </div>

                        <div className="col-span-1 flex flex-col ms-4">
                            <div className="flex justify-left">
                                <h1
                                    className="font-bold text-xl flex items-end"
                                    style={{ writingMode: "vertical-rl" }}
                                >
                                    EXPO&nbsp;
                                    <span className="text-[var(--coral-pink)]">
                                        2023
                                    </span>
                                    &nbsp;
                                    <span className="font-bold text-sm">
                                        2.0
                                    </span>
                                </h1>
                            </div>
                            <div className="flex-grow mt-4 ms-3">
                                <div className="w-0.5 h-full bg-black"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="relative carousel-${id} glide overflow-hidden col-span-9"
                id={id}
            >
                <div className="glide__track h-full" data-glide-el="track">
                    <ul className="glide__slides flex h-full">
                        {slides.map((slide) => (
                            <li className="glide__slide flex flex-col items-center justify-center">
                                <div
                                    id={`slide-image-${id}`}
                                    className="w-[400px] h-[400px]"
                                    style={{
                                        backgroundColor:
                                            slide.backgroundColor ||
                                            "var(--timberwolf)",
                                    }}
                                ></div>
                                <div className="mt-4">
                                    <div className="font-bold text-2xl">
                                        {slide.ranking}
                                    </div>
                                    <div className="font-bold text-4xl">
                                        {slide.group}
                                    </div>
                                    <p className="">{slide.thesis}</p>

                                    <div className="flex justify-end">
                                        <Link
                                            href={slide.link || "/"}
                                            className="font-medium hover:underline flex items-center"
                                            style={{
                                                color: "var(--coral-pink)",
                                            }}
                                        >
                                            Learn more{" "}
                                            <span className="ms-2 text-sm">
                                                <AiOutlineRight />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    data-glide-el="controls"
                    style={{ color: "var(--coral-pink)" }}
                >
                    <button
                        data-glide-dir="<"
                        className="absolute top-40 text-5xl font-bold"
                    >
                        <span className="flex-auto">
                            <AiOutlineLeft />
                        </span>
                    </button>
                    <button
                        data-glide-dir=">"
                        className="absolute right-0 top-40 text-5xl font-bold"
                    >
                        <span className="flex-auto">
                            <AiOutlineRight />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;