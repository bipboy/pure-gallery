import * as React from 'react';

import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/20/solid';
import {
  ButtonBack,
  ButtonNext,
  CarouselContext,
  Dot,
  Slider
} from 'pure-react-carousel';
import {useContext, useEffect, useRef, useState} from 'react';

import classNames from 'classnames';

export function Gallery(props) {
  const {images, imagesSrc, imageRoot} = props;
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );
  const dotsRef = useRef(null);

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }

    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <>
      <div className="relative flex-grow-0 flex-shrink-0 w-full box-border">
        <Slider className="relative overflow-hidden">{images}</Slider>
        <ButtonBack className="flex items-center justify-center h-10 w-10 rounded-full bg-white/50 hover:bg-white/75 transition-colors duration-300 ease-in-out absolute top-1/2 left-2 transform -translate-y-1/2 focus:outline-none">
          <ArrowLeftIcon width="24px" className="text-primary" />
        </ButtonBack>
        <ButtonNext
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white/50 hover:bg-white/75 transition-colors duration-300 ease-in-out absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
          disabled={currentSlide === images?.length - 1}
        >
          <ArrowRightIcon width="24px" className="text-primary" />
        </ButtonNext>
      </div>
      <div className="relative mt-2 box-border">
        <div
          ref={dotsRef}
          className="relative grid gap-2 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] box-border transition-transform duration-500 ease-in-out overflow-x-hidden overflow-y-auto"
          style={{transform: `translateY(-${currentSlide * 100}%)`}}
        >
          {imagesSrc?.map((v, idx) => {
            const isActive = currentSlide === idx || currentSlide + 1 === idx;
            return (
              <Dot
                key={idx}
                slide={idx}
                className="cursor-pointer border-0 block outline-offset-[-4px] p-0 transition-opacity duration-300 ease-in-out box-border bg-primary-50 hover:opacity-60 max-w-[120px] max-h-[120px]"
              >
                <img
                  className={classNames(
                    'cursor-pointer block transition-opacity duration-500 ease-in-out w-full h-full box-border',
                    {
                      'opacity-40': isActive,
                      'opacity-100': !isActive
                    }
                  )}
                  src={imageRoot ? imageRoot(v) : v}
                />
              </Dot>
            );
          })}
        </div>
      </div>
    </>
  );
}
