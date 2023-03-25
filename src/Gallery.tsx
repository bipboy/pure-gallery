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

interface GalleryProps {
  images: React.Element[];
  imagesSrc: string[];
  imageRoot?: (str: string) => string;
}

export function Gallery(props: GalleryProps) {
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

  const dotsContainerStyle = classNames(
    'relative mt-2 flex flex-wrap gap-2 items-start justify-start'
  );

  return (
    <>
      <div className="relative flex-grow-0 flex-shrink-0 w-full box-border">
        <Slider className="relative overflow-hidden">{images}</Slider>
        <ButtonBack
          className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-white hover:bg-gray-300 active:bg-gray-400 transition-colors duration-300 border border-solid border-neutral-500"
          style={{height: '3rem', width: '3rem', marginLeft: '-.5rem'}}
        >
          <ArrowLeftIcon width="20px" />
        </ButtonBack>
        <ButtonNext
          disabled={currentSlide === images?.length - 1}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-white hover:bg-gray-300 active:bg-gray-400 transition-colors duration-300 border border-solid border-neutral-500"
          style={{height: '3rem', width: '3rem', marginRight: '-.5rem'}}
        >
          <ArrowRightIcon width="20px" />
        </ButtonNext>
      </div>
      <div className="relative mt-2 box-border">
        <div ref={dotsRef} className={dotsContainerStyle}>
          {imagesSrc?.map((v, idx) => {
            const dotStyle = classNames(
              'cursor-pointer border-0 outline-offset-[-4px] transition-opacity duration-300 bg-primary-50 overflow-hidden',
              currentSlide === idx || currentSlide + 1 === idx
                ? 'opacity-60'
                : 'opacity-100'
            );

            const dotImageStyle = classNames(
              'cursor-pointer transition-opacity duration-500 w-full h-full object-cover object-center',
              currentSlide === idx || currentSlide + 1 === idx
                ? 'opacity-60'
                : 'opacity-100'
            );
            return (
              <Dot
                disabled={false}
                className={dotStyle}
                slide={idx}
                key={idx}
                style={{maxWidth: '64px', maxHeight: '64px'}}
              >
                <img
                  className={dotImageStyle}
                  src={imageRoot ? imageRoot(v) : v}
                  style={{maxWidth: '64px', maxHeight: '64px'}}
                />
              </Dot>
            );
          })}
        </div>
      </div>
    </>
  );
}
