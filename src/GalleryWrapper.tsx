import * as React from 'react';

import {CarouselProvider, ImageWithZoom, Slide} from 'pure-react-carousel';

import Gallery from './Gallery';
import {isNullOrUndefined} from '@bipboys/ts-utils';
import {useStyletron} from 'baseui';

function GalleryWrapper(props: {
  images: string[] | null;
  // Helper outside fn for resolve path to cdn
  imageRoot?: (str: string) => string;
}) {
  const [css, theme] = useStyletron();
  const {images, imageRoot} = props;

  const imagesArray = images?.map((val, idx) => {
    return (
      <Slide
        className={css({
          backgroundColor:
            idx % 2 ? theme.colors.primary50 : theme.colors.primary100
        })}
        key={idx}
        index={idx}
      >
        <ImageWithZoom
          imageClassName={css({
            backgroundPosition: 'center'
          })}
          src={imageRoot ? imageRoot(val) : val}
        />
      </Slide>
    );
  });

  if (isNullOrUndefined(images) || isNullOrUndefined(imagesArray)) {
    return null;
  }

  return (
    <CarouselProvider
      className={css({
        width: '100%',
        boxSizing: 'border-box'
      })}
      visibleSlides={2}
      totalSlides={imagesArray?.length}
      step={1}
      naturalSlideWidth={400}
      naturalSlideHeight={500}
      touchEnabled
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        })}
      >
        <Gallery
          imageRoot={imageRoot}
          imagesSrc={images}
          images={imagesArray}
        />
      </div>
    </CarouselProvider>
  );
}

export default GalleryWrapper;
