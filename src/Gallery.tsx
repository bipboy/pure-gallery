import * as React from 'react';

import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/20/solid';
import {
  ButtonBack,
  ButtonNext,
  CarouselContext,
  Dot,
  Slider
} from 'pure-react-carousel';
import {ReactElement, useContext, useEffect, useRef, useState} from 'react';

import {useStyletron} from 'baseui';

function Gallery(props: {
  images: ReactElement[];
  imagesSrc: string[];
  // Helper outside fn for resolve path to cdn
  imageRoot?: (str: string) => string;
}) {
  const {images, imagesSrc, imageRoot} = props;
  const [css, theme] = useStyletron();

  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );

  // const [scrollIndex, setScrollIndex] = React.useState(0);

  const [topMove] = useState('0px');

  // Calculate Dots dynamic height
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
      <div
        className={css({
          position: 'relative',
          flex: '0 0 100%',
          boxSizing: 'border-box'
        })}
      >
        <Slider
          classNameTray={css({
            boxSizing: 'border-box'
          })}
          classNameTrayWrap={css({
            boxSizing: 'border-box'
          })}
          className={css({
            overflow: 'hidden',
            position: 'relative'
          })}
        >
          {images}
        </Slider>
        <ButtonBack
          className={css({
            display: 'flex',
            top: '50%',
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            left: '8px',
            justifyContent: 'center',
            height: '42px',
            width: '42px',
            borderRadius: '100%',
            backgroundColor: 'hsla(0,0%,100%,.5)',
            transform: 'translateY(-50%)',
            transition: 'background-color .3s',
            borderStyle: 'none',
            ':hover': {
              backgroundColor: theme.colors.primaryB
            }
          })}
        >
          <ArrowLeftIcon width="24px" fill={theme.colors.primaryA} />
        </ButtonBack>
        <ButtonNext
          disabled={currentSlide === images?.length - 1}
          className={css({
            display: 'flex',
            top: '50%',
            position: 'absolute',
            right: '8px',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '42px',
            width: '42px',
            borderRadius: '100%',
            backgroundColor: 'hsla(0,0%,100%,.5)',
            transform: 'translateY(-50%)',
            transition: 'background-color .3s',
            borderStyle: 'none',
            ':hover': {
              backgroundColor: theme.colors.primaryB
            }
          })}
        >
          <ArrowRightIcon width="24px" fill={theme.colors.primaryA} />
        </ButtonNext>
      </div>
      <div
        className={css({
          position: 'relative',
          marginTop: '8px',
          boxSizing: 'border-box'
        })}
      >
        <div
          ref={dotsRef}
          style={{top: topMove}}
          className={css({
            position: 'relative',
            display: 'grid',
            gap: '8px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
            boxSizing: 'border-box'
          })}
        >
          {imagesSrc?.map((v, idx) => {
            return (
              <Dot
                disabled={false}
                className={css({
                  // margin: '0 .3rem 0.6rem 0',
                  cursor: 'pointer',
                  border: 0,
                  display: 'block',
                  outlineOffset: '-4px',
                  padding: 0,
                  transition: 'opacity .3s',
                  boxSizing: 'border-box',
                  backgroundColor: theme.colors.primary50,
                  ':hover': {
                    opacity:
                      currentSlide === idx || currentSlide + 1 === idx ? 0.6 : 1
                  }
                })}
                slide={idx}
                key={idx}
              >
                <img
                  className={css({
                    cursor: 'pointer',
                    display: 'block',
                    opacity:
                      currentSlide === idx || currentSlide + 1 === idx
                        ? 0.4
                        : 1,
                    height: '100%',
                    width: '100%',
                    transition: 'opacity .5s',
                    boxSizing: 'border-box'
                  })}
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

export default Gallery;
