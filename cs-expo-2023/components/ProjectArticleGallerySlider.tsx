"use client";

import {AiOutlineUp,  AiOutlineDown, AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import React, { useState, useEffect, useRef } from 'react';
import Splide, {Options, PaginationItem } from '@splidejs/splide';
// import { Splide, SplideSlide, Options } from '@splidejs/react-splide';


interface GallerySliderProps {
  slides: string[][];
}

const GallerySlider: React.FC<GallerySliderProps> = ({
    slides,
  }) => {
    const [isMaxSlideLeft, setIsMaxSlideLeft] = useState(true);
    const [isMaxSlideRight, setIsMaxSlideRight] = useState(false);
    const [showLargeImage, setShowLargeImage] = useState(false);
    const [largerImagePath, setLargerImagePath] = useState("");
    const [currentSlideName, setCurrentSlideName] = useState("");

    const splideOptions: Options = {
      type: 'slide',
      arrows: false,
      perPage  : 2,
      focus    : 'center',
      trimSpace: false,
      gap: 20,
      pagination:true,
      paginationDirection: 'ltr',
      classes: {
        pagination: 'splide__pagination custompagination',
		    page: 'splide__pagination__page custompage',
      },
      direction: 'ltr',
      mediaQuery: 'max',
      breakpoints: {
        640: {
          perPage  : 1,
        }
      },
    };

    const imgPreviewClickHandler = () => {
      if (showLargeImage) {
        setShowLargeImage(false);
      }
    }

    useEffect(() => {
      const handleImgPreviewKeyDown = (event: { key: string; }) => {
        if (showLargeImage && event.key === 'Escape') {
          setShowLargeImage(false);
        }
      }

      document.addEventListener('keydown', handleImgPreviewKeyDown);

      return() => {
        document.removeEventListener('keydown', handleImgPreviewKeyDown)
      }
    });

    useEffect(() => {
      const splide = new Splide('#splide',splideOptions);
      const slideLeft = document.getElementById('slideup');
      const slideRight = document.getElementById('slidedown');
      
      slideLeft?.addEventListener("click", () => {
        splide.go('-1');
        setCurrentSlideName(slides[splide.index][1]);
      });
  
      slideRight?.addEventListener("click", () => {
        splide.go('+1');
        setCurrentSlideName(slides[splide.index][1]);
      });
  
      splide.on(['pagination:mounted',"mounted", "move"], () => {
        const currentIndex = splide.index;
        
        const slideElements = document.querySelectorAll(
          '#slide-card'
        );

        const paginationButtons = document.querySelectorAll(
          '.custompage'
        );

        slideElements.forEach((slide, index) => {
          slide.classList.remove(
              "border-4",
              "border-coral-pink"
          );
          
          (paginationButtons[index] as HTMLButtonElement).style.border="2px solid var(--coral-pink)";
          (paginationButtons[index] as HTMLButtonElement).style.backgroundColor="";

          if (index === currentIndex) {
            slide.classList.add(
                "border-4",
                "border-coral-pink"
            );
            (paginationButtons[index] as HTMLButtonElement).style.border="";
            (paginationButtons[index] as HTMLButtonElement).style.backgroundColor="var(--coral-pink)";
          }
        });
        
        setIsMaxSlideLeft(currentIndex === 0);
        setIsMaxSlideRight(slideElements.length === currentIndex+1);
        setCurrentSlideName(slides[splide.index][1]);
      });
  
      splide.on(["click"], (slide: { index: any; },e: any) =>{
        const index = slide.index;
        if (splide.index === index) {
          setLargerImagePath(slides[index][0]);
          setShowLargeImage(true);
        } 
        else {
          splide.go(slide.index);
          setCurrentSlideName(slides[slide.index][1]);
        }
      });
  
      splide.mount();
      setCurrentSlideName(slides[splide.index][1]);
      return () => {
        splide.destroy();
      }
    },[]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div id="splide" className="splide flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-center pb-10">
          <div id="slideup" className=" h-[30px] w-[30px] max-[540px]:hidden">
            <button className={`flex items-top justify-center text-coral-pink cursor-pointer text-3xl font-bold ${isMaxSlideLeft && "invisible"}`}>
              <AiOutlineLeft/>
            </button>
          </div>

          <div className="splide__track max-[475px]:w-[300px] max-[365px]:w-[200px]">
            <ul className="splide__list">
              {
                slides.map((slide, index)=>(
                  <li key={index} className="splide__slide flex items-center">
                    <div className="relative flex flex-col items-center py-10">
                      <div id="slide-card"  className="">
                        <img src={slide[0]} className=""></img>
                      </div>
                      <div className="absolute flex items-center -bottom-1 justify-center text-md font-bold text-coral-pink px-3">
                        {slide[1]}
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul> 
          </div>

          <div id="slidedown" className="h-[30px] w-[30px] max-[540px]:hidden">
            <button className={`flex items-top justify-center text-coral-pink cursor-pointer text-3xl font-bold ${isMaxSlideRight && "invisible"}`}>
                <AiOutlineRight/>
            </button>
          </div>
        </div>

        <div className="flex w-full pt-5">
          <ul className="splide__pagination custompagination flex items-center justify-center">
          </ul>
        </div>
      </div>

      {showLargeImage && (
        <div className="fixed w-full h-full flex top-[0] left-[0] z-[666] items-center justify-center bg-slate-950 bg-opacity-90" onClick={imgPreviewClickHandler}>
          <div className="relative flex w-auto h-full justify-center"> 
            <div className="absolute text-coral-pink text-xl font-bold pt-5">
              {currentSlideName}
            </div>
            <img src={largerImagePath} className="object-contain" alt="Selected Image" />
          </div>
        </div>
      )}
    </div>
  );
};


export default GallerySlider;